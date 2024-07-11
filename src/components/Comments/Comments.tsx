import React, {
    Fragment,
    useCallback,
    useEffect,
    useMemo,
    useState,
} from "react";
import Comment from "../Comment/Comment";
import getCommentsRequest from "src/api/comments/getCommentsRequest";
import getAuthorsRequest from "src/api/authors/getAuthorsRequest";
import {CommentsStyled} from "./styled";
import {formatDate} from "src/lib/formatDate";
import CommentsHeader from "../CommentsHeader/CommentsHeader";
import {buildCommentTree} from "src/lib/buildCommentTree";
import {Loader} from "src/components/Loader/Loader";
import {IAuthor, IComment, ICommentsPage} from "src/types/types";
import {getCommentsStats} from "../../lib/getCommentsStats";

interface IStats {
    comments: number;
    likes: number;
}

const Comments = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [commentsByPage, setCommentsByPage] = useState<
        Record<number, IComment[]>
    >({});
    const [authors, setAuthors] = useState<IAuthor[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isLoadingMore, setIsLoadingMore] = useState(false);
    const [totalPages, setTotalPages] = useState(0);
    const [stats, setStats] = useState<IStats>({
        comments: 0,
        likes: 0,
    });
    const [error, setError] = useState(false);
    const [isStatsLoading, setIsStatsLoading] = useState(true);

    const fetchData = useCallback(
        async (page: number) => {
            try {
                const pageData: ICommentsPage = await getCommentsRequest(page);
                setTotalPages(pageData.pagination.total_pages);
                setCommentsByPage((prevCommentsByPage) => ({
                    ...prevCommentsByPage,
                    [page]: pageData.data,
                }));

                if (authors.length === 0) {
                    const authorsData: IAuthor[] = await getAuthorsRequest();
                    setAuthors(authorsData);
                }

                setIsLoading(false);
                setIsLoadingMore(false);
            } catch (error) {
                console.error("Error fetching data: ", error);
                setIsLoading(false);
                setIsLoadingMore(false);
            }
        },
        [authors.length],
    );

    useEffect(() => {
        getCommentsStats(totalPages)
            .then((fullStats) => {
                setIsStatsLoading((prevState) => !prevState);
                setStats({
                    comments: fullStats.comments,
                    likes: fullStats.likes,
                });
            })
            .catch(() => setError(true));

        fetchData(currentPage);
    }, [currentPage, fetchData]);

    const handleUpdateLikes = (increment: boolean) => {
        setStats((state) => ({
            ...state,
            likes: increment ? state.likes + 1 : state.likes - 1,
        }));
    };

    const renderCommentTree = useCallback(
        (
            commentTree: Record<number, IComment[]>,
            parentId: number = 0,
        ): JSX.Element[] => {
            if (!commentTree[parentId]) {
                return [];
            }

            commentTree[parentId].sort(
                (a, b) =>
                    new Date(b.created).getTime() -
                    new Date(a.created).getTime(),
            );

            return commentTree[parentId].map((comment) => (
                <Fragment key={comment.id}>
                    <Comment
                        id={comment.id}
                        created={formatDate(comment.created)}
                        text={comment.text}
                        author={comment.author}
                        parent={comment.parent}
                        likes={comment.likes}
                        authorData={authors[comment.author - 1]}
                        updateLikes={handleUpdateLikes}
                    />

                    {commentTree[comment.id] && (
                        <CommentsStyled>
                            {renderCommentTree(commentTree, comment.id)}
                        </CommentsStyled>
                    )}
                </Fragment>
            ));
        },
        [authors],
    );

    const handleMoreComments = useCallback(() => {
        setIsLoadingMore(true);
        setCurrentPage((prevPage) => prevPage + 1);
    }, []);

    const commentTreesByPage = useMemo(
        () =>
            Object.values(commentsByPage).map((comments) =>
                buildCommentTree(comments),
            ),
        [commentsByPage],
    );

    if (isLoading) {
        return <Loader />;
    }

    return (
        <>
            <CommentsHeader
                stats={stats}
                isLoading={isStatsLoading}
                isError={error}
            />

            {commentTreesByPage.map((commentTree, index) => (
                <CommentsStyled key={index}>
                    {renderCommentTree(commentTree)}
                </CommentsStyled>
            ))}

            {currentPage < totalPages && (
                <button
                    type="button"
                    onClick={handleMoreComments}
                    disabled={isLoadingMore}
                >
                    {isLoadingMore ? "Загрузка..." : "Загрузить еще"}
                </button>
            )}
        </>
    );
};

export default Comments;

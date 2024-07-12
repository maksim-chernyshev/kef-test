import React, {
    Fragment,
    useCallback,
    useEffect,
    useMemo,
    useRef,
    useState,
} from "react";
import Comment from "../Comment/Comment";
import getAuthorsRequest from "src/api/authors/getAuthorsRequest";
import {CommentsStyled} from "./styled";
import {formatDate} from "src/lib/formatDate";
import CommentsHeader from "../CommentsHeader/CommentsHeader";
import {buildCommentTree} from "src/lib/buildCommentTree";
import {Loader} from "src/components/Loader/Loader";
import {IAuthor, IComment} from "src/types/types";
import {getPageData} from "src/lib/getPageData";
import {sortCommentsByTime} from "src/lib/sortCommentsByTime";
import {countLikes} from "src/lib/countLikes";

interface IStats {
    comments: number;
    likes: number;
}

const Comments = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [commentsOnPage, setCommentsOnPage] = useState<IComment[]>([]);
    const [authors, setAuthors] = useState<IAuthor[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isLoadingMore, setIsLoadingMore] = useState(false);
    const [totalPages, setTotalPages] = useState(0);
    const [error, setError] = useState(false);
    const [stats, setStats] = useState<IStats>({
        comments: 0,
        likes: 0,
    });

    const isPageDataFetched = useRef(false);

    useEffect(() => {
        getAuthorsRequest()
            .then((authorsData) => setAuthors(authorsData))
            .catch((error) => {
                setError(true);
                console.error("Ошибка загрузки авторов", error);
            });
    }, []);

    useEffect(() => {
        if (!isPageDataFetched.current) {
            isPageDataFetched.current = true;

            getPageData(currentPage)
                .then((pageData) => {
                    setTotalPages(pageData.pagination.total_pages);

                    const sortedComments = sortCommentsByTime(
                        pageData.comments,
                    );

                    setCommentsOnPage((prevComments) => [
                        ...prevComments,
                        ...sortedComments,
                    ]);

                    const likesOnPage = countLikes(pageData.comments);

                    setStats((prevStats) => ({
                        comments: prevStats.comments + pageData.comments.length,
                        likes: prevStats.likes + likesOnPage,
                    }));
                })
                .catch((error) => {
                    setError(true);
                    console.error("Ошибка загрузки данных страницы", error);
                })
                .finally(() => {
                    setIsLoading(false);
                    setIsLoadingMore(false);
                });
        }
    }, [currentPage]);

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
                        <CommentsStyled key={comment.id + "key"}>
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
        isPageDataFetched.current = false;
        setCurrentPage((prevPage) => prevPage + 1);
    }, []);

    const commentsNestingTree = useMemo(
        () => buildCommentTree(commentsOnPage),
        [commentsOnPage],
    );

    if (isLoading) {
        return <Loader />;
    }

    return (
        <>
            <CommentsHeader stats={stats} isError={error} />

            <CommentsStyled>
                {renderCommentTree(commentsNestingTree)}
            </CommentsStyled>

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

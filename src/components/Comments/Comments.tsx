import React, {
    Fragment,
    useCallback,
    useEffect,
    useMemo,
    useState,
} from "react";
import Comment from "../Comment/Comment";
import {CommentsStyled, CommentsErrorStyled} from "./styled";
import {formatDate} from "src/lib/formatDate";
import CommentsHeader from "../CommentsHeader/CommentsHeader";
import {buildCommentTree} from "src/lib/buildCommentTree";
import {Loader} from "src/components/Loader/Loader";
import {IAuthor, IComment} from "src/types/types";
import {sortCommentsByTime} from "src/lib/sortCommentsByTime";
import {countLikes} from "src/lib/countLikes";
import {usePageDataQuery} from "src/hooks/usePageDataQuery";
import {useAuthorsQuery} from "src/hooks/useAuthorsQuery";

interface IStats {
    comments: number;
    likes: number;
}

const Comments = () => {
    const [authors, setAuthors] = useState<IAuthor[]>([]);
    const [comments, setComments] = useState<IComment[]>([]);
    const [stats, setStats] = useState<IStats>({comments: 0, likes: 0});

    const {
        data: authorsData,
        isPending: isAuthorsLoading,
        isError: isAuthorsError,
    } = useAuthorsQuery();

    const {
        data: pageData,
        isLoading: isPageDataLoading,
        isError: isPageDataError,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
    } = usePageDataQuery();

    useEffect(() => {
        if (authorsData) {
            setAuthors(authorsData);
        }
    }, [authorsData]);

    useEffect(() => {
        if (pageData) {
            const allComments = pageData.pages.flatMap((page) =>
                sortCommentsByTime(page.data),
            );
            setComments(allComments);
            const likesOnPage = countLikes(allComments);
            setStats({
                comments: allComments.length,
                likes: likesOnPage,
            });
        }
    }, [pageData]);

    const handleUpdateLikes = (increment: boolean) => {
        setStats((prevStats) => ({
            ...prevStats,
            likes: increment ? prevStats.likes + 1 : prevStats.likes - 1,
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
                        created={formatDate(comment.created)}
                        text={comment.text}
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

    const commentsNestingTree = useMemo(
        () => buildCommentTree(comments),
        [comments],
    );

    return (
        <>
            <CommentsHeader
                stats={stats}
                isError={isPageDataError}
                isLoading={isPageDataLoading}
            />

            {isPageDataLoading ? (
                <Loader />
            ) : isPageDataError ? (
                <CommentsErrorStyled>
                    Произошла ошибка загрузки.
                    <br />
                    Повторите попытку
                </CommentsErrorStyled>
            ) : (
                <>
                    <CommentsStyled>
                        {renderCommentTree(commentsNestingTree)}
                    </CommentsStyled>
                    {hasNextPage && (
                        <button
                            type="button"
                            onClick={() => fetchNextPage()}
                            disabled={isFetchingNextPage}
                            data-testid="comments-more"
                        >
                            {isFetchingNextPage
                                ? "Загрузка..."
                                : "Загрузить еще"}
                        </button>
                    )}
                </>
            )}
        </>
    );
};

export default Comments;

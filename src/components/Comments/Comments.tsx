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
import {CommentsStyled, CommentsErrorStyled} from "./styled";
import {formatDate} from "src/lib/formatDate";
import CommentsHeader from "../CommentsHeader/CommentsHeader";
import {buildCommentTree} from "src/lib/buildCommentTree";
import {Loader} from "src/components/Loader/Loader";
import {IAuthor, IComment} from "src/types/types";
import {getPageData} from "src/lib/getPageData";
import {sortCommentsByTime} from "src/lib/sortCommentsByTime";
import {countLikes} from "src/lib/countLikes";
import {useQueryClient} from "@tanstack/react-query";
import {usePageDataQuery} from "../../hooks/usePageDataQuery";
import {useAuthorsQuery} from "../../hooks/useAuthorsQuery";

interface IStats {
    comments: number;
    likes: number;
}

const Comments = () => {
    // const [currentPage, setCurrentPage] = useState(1);
    // const [commentsOnPage, setCommentsOnPage] = useState<IComment[]>([]);
    // const [authors, setAuthors] = useState<IAuthor[]>([]);
    // const [isCommentsLoading, setIsCommentsLoading] = useState(true);
    // const [isLoadingMore, setIsLoadingMore] = useState(false);
    // const [isStatsLoading, setIsStatsLoading] = useState(true);
    // const [totalPages, setTotalPages] = useState(0);
    const [error, setError] = useState(false);
    // const [stats, setStats] = useState<IStats>({
    //     comments: 0,
    //     likes: 0,
    // });

    let currentPage: number = 1;
    let totalPages: number = 0;
    let authors: IAuthor[] = [];
    let comments: IComment[] = [];
    let stats: IStats = {
        comments: 0,
        likes: 0,
    };

    const queryClient = useQueryClient();

    const {
        data: authorsData,
        isPending: isAuthorsLoading,
        isError: isAuthorsError
    } = useAuthorsQuery()

    const {
        data: pageData,
        isPending: isPageDataLoading,
        isError: isPageDataError,
        isFetchingNextPage,
        fetchNextPage,
        status,
    } = usePageDataQuery();

    if (authorsData) {
        authors = authorsData;
    }

    if (pageData) {
        currentPage = pageData.pageParams.length;
        console.log(currentPage)


        totalPages = pageData.pages[0].pagination.total_pages;

        if (comments) {
            comments = sortCommentsByTime(pageData.pages[currentPage - 1].data)
            console.log(comments);
        }

        const likesOnPage = countLikes(pageData.pages[currentPage - 1].data);

        stats = {
            comments: comments.length,
            likes: likesOnPage,
        }

        // setStats((prevStats) => {
        //     setIsStatsLoading(false)
        //     return {
        //         comments: prevStats.comments + pageData.pages[currentPage - 1].data.length,
        //         likes: prevStats.likes + likesOnPage,
        //     }
        // })

        // setCommentsOnPage((prevComments) => [
        //     ...prevComments,
        //     ...sortedComments,
        // ]);
    }

    // console.log(pageData?.pages[currentPage].data)

    // useEffect(() => {
    //     if (authorsData) {
    //         setAuthors(authorsData);
    //     }
    //
    //     if (pageData) {
    //         setTotalPages(pageData.pages[0].pagination.total_pages);
    //
    //         const sortedComments = sortCommentsByTime(
    //             pageData.pages[currentPage].data,
    //         );
    //
    //         setCommentsOnPage((prevComments) => [
    //             ...prevComments,
    //             ...sortedComments,
    //         ]);
    //
    //         const likesOnPage = countLikes(pageData.pages[currentPage].data);
    //
    //         setStats((prevStats) => {
    //             setIsStatsLoading(false)
    //             return {
    //                 comments: prevStats.comments + pageData.pages[currentPage].data.length,
    //                 likes: prevStats.likes + likesOnPage,
    //             }
    //         })
    //         setIsCommentsLoading(false)
    //     }
    // }, [])

    // useEffect(() => {
    //     getAuthorsRequest()
    //         .then((authorsData) => setAuthors(authorsData))
    //         .catch((error) => {
    //             setError(true);
    //             console.error("Ошибка загрузки авторов", error);
    //         });
    // }, []);

    // useEffect(() => {
    //     if (!isPageDataFetched.current) {
    //         isPageDataFetched.current = true;
    //
    //         getPageData(currentPage)
    //             .then((pageData) => {
    //                 setTotalPages(pageData.pagination.total_pages);
    //
    //                 const sortedComments = sortCommentsByTime(
    //                     pageData.comments,
    //                 );
    //
    //                 setCommentsOnPage((prevComments) => [
    //                     ...prevComments,
    //                     ...sortedComments,
    //                 ]);
    //
    //                 const likesOnPage = countLikes(pageData.comments);
    //
    //                 setStats((prevStats) => {
    //                     setIsStatsLoading(false);
    //                     return {
    //                         comments:
    //                             prevStats.comments + pageData.comments.length,
    //                         likes: prevStats.likes + likesOnPage,
    //                     };
    //                 });
    //             })
    //             .catch((error) => {
    //                 setError(true);
    //                 console.error("Ошибка загрузки данных страницы", error);
    //             })
    //             .finally(() => {
    //                 setIsCommentsLoading(false);
    //                 setIsLoadingMore(false);
    //             });
    //     }
    // }, [currentPage]);

    const handleUpdateLikes = (increment: boolean) => {
        // setStats((state) => ({
        //     ...state,
        //     likes: increment ? state.likes + 1 : state.likes - 1,
        // }));
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

    const handleMoreComments = useCallback(() => {
        // setIsLoadingMore(true);
        // setIsStatsLoading(true)
        // setCurrentPage((prevPage) => prevPage + 1);
    }, []);

    const commentsNestingTree = useMemo(
        () => buildCommentTree(comments),
        [comments],
    );

    const shouldRenderButton = currentPage < totalPages || isFetchingNextPage;

    return (
        <>
            <CommentsHeader
                stats={stats}
                isError={error}
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

                    {shouldRenderButton && (
                        <button
                            type="button"
                            onClick={() => fetchNextPage()}
                            disabled={isFetchingNextPage}
                            data-testid="comments-more"
                        >
                            {isFetchingNextPage ? "Загрузка..." : "Загрузить еще"}
                        </button>
                    )}
                </>
            )}
        </>
    );
};

export default Comments;

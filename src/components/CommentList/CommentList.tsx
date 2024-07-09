import React, {Fragment, useCallback, useEffect, useMemo, useState} from "react";
import Comment from "../Comment/Comment";
import getCommentsRequest from "src/api/comments/getCommentsRequest";
import getAuthorsRequest from "src/api/authors/getAuthorsRequest";
import {CommentListStyled} from "./styled";
import {formatDate} from "src/lib/formatDate";
import CommentListHeader from "../CommentListHeader/CommentListHeader";
import {buildCommentTree} from "src/lib/buildCommentTree";
import {Loader} from "src/shared/Loader/Loader";
import * as pages from "src/data/comments"
import {IAuthor, IComment} from "src/types/types";

const CommentList = () => {
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [commentsByPage, setCommentsByPage] = useState<Record<number, IComment[]>>({});
    const [authors, setAuthors] = useState<IAuthor[]>([])
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [isLoadingMore, setIsLoadingMore] = useState<boolean>(false)
    const pagesCount = Object.keys(pages).length;

    const fetchData = useCallback( async(page: number) => {
        for (let attempt = 1; attempt <= 3; attempt++) {
            try {
                const commentsData = await getCommentsRequest(page);

                setCommentsByPage(prevCommentsByPage => ({
                    ...prevCommentsByPage,
                    [page]: commentsData.data
                }));

                if (authors.length === 0) {
                    const authorsData = await getAuthorsRequest();
                    setAuthors(authorsData);
                }

                setIsLoading(false);
                setIsLoadingMore(false);
            } catch (error) {
                console.error("Error fetching data: ", error);
                setIsLoading(false);
                setIsLoadingMore(false);
            }
        }
    }, [authors.length]);

    useEffect(() => {
        fetchData(currentPage);
    }, [currentPage, fetchData]);

    const renderCommentTree = useCallback((
        commentTree: Record<number, IComment[]>,
        parentId: number = 0
    ): JSX.Element[] => {
        if (!commentTree[parentId]) {
            return [];
        }

        commentTree[parentId].sort((a, b) => new Date(b.created).getTime() - new Date(a.created).getTime());

        return commentTree[parentId].map(comment => (
            <Fragment key={comment.id}>
                <Comment
                    id={comment.id}
                    created={formatDate(comment.created)}
                    text={comment.text}
                    author={comment.author}
                    parent={comment.parent}
                    likes={comment.likes}
                    authorData={authors[comment.author - 1]}
                />

                {commentTree[comment.id] && (
                    <CommentListStyled>
                        {renderCommentTree(commentTree, comment.id)}
                    </CommentListStyled>
                )}
            </Fragment>
        ));
    }, [authors]);

    const handleMoreComments = useCallback(() => {
        setIsLoadingMore(true);
        setCurrentPage(prevState => prevState + 1);
    },[]);

    const commentTreesByPage = useMemo(() =>
            Object.values(commentsByPage).map(comments => buildCommentTree(comments))
    , [commentsByPage]);

    if (isLoading) {
        return <Loader/>
    }

    return (
        <>
            <CommentListHeader/>
            {commentTreesByPage.map((commentTree, index) => (
                <CommentListStyled key={index}>
                    {renderCommentTree(commentTree)}
                </CommentListStyled>
            ))}


            {(currentPage < pagesCount) && <button
                type='button'
                onClick={handleMoreComments}
            >
                { isLoadingMore ? '...Loading' : 'More comments'}
            </button>}
        </>
    );
}

export default CommentList;

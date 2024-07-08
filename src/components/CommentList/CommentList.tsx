import React, {Fragment, Suspense, useEffect, useState} from "react";
import Comment, {IAuthor, IComment} from "../Comment/Comment";
import getCommentsRequest from "../../api/comments/getCommentsRequest";
import getAuthorsRequest from "../../api/authors/getAuthorsRequest";
import {CommentListStyled} from "./styled";
import {formatDate} from "../../lib/formatDate";
import CommentListHeader from "../CommentListHeader/CommentListHeader";
import {buildCommentTree} from "../../lib/buildCommentTree";
import {Loader} from "../shared/Loader/Loader";

const CommentList = (props: any) => {
    const [comments, setComments] = useState<IComment[]>([])
    const [authors, setAuthors] = useState<IAuthor[]>([])
    const [isLoading, setIsLoading] = useState<boolean>(true)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const commentsData = await getCommentsRequest(1);
                setComments(commentsData.data);

                const authorsData = await getAuthorsRequest();
                setAuthors(authorsData);

                setIsLoading(false);
            } catch (error) {
                console.error("Error fetching data: ", error);
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    const renderCommentTree = (commentTree: Record<number, IComment[]>, parentId: number = 0): JSX.Element[] => {
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
                    authorData={authors[comment.author]}
                />

                {commentTree[comment.id] && (
                    <CommentListStyled>
                        {renderCommentTree(commentTree, comment.id)}
                    </CommentListStyled>
                )}
            </Fragment>
        ));
    };

    const commentTree = buildCommentTree(comments);

    if (isLoading) {
        return <Loader/>
    }

    return (
        <>
            <CommentListHeader/>
            <CommentListStyled>
                {renderCommentTree(commentTree)}
            </CommentListStyled>
        </>
    );
}

export default CommentList;

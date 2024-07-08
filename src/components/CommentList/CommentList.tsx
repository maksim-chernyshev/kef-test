import React, {useEffect, useState} from "react";
import Comment, {IAuthor, IComment} from "../Comment/Comment";
import getCommentsRequest from "../../api/comments/getCommentsRequest";
import getAuthorsRequest from "../../api/authors/getAuthorsRequest";
import {CommentListStyled} from "./styled";
import {formatDate} from "../../lib/formatDate";
import CommentListHeader from "../CommentListHeader/CommentListHeader";
import {buildCommentTree} from "../../lib/buildCommentTree";

const CommentList = (props: any) => {
    const [comments, setComments] = useState<IComment[]>([])
    const [authors, setAuthors] = useState<IAuthor[]>([])

    useEffect(() => {
        getCommentsRequest(1)
            .then(data => setComments(data.data))

        getAuthorsRequest()
            .then(data => setAuthors(data))
    }, [])

    const renderCommentTree = (commentTree: Record<number, IComment[]>, parentId: number = 0): JSX.Element[] => {
        if (!commentTree[parentId]) {
            return [];
        }

        commentTree[parentId].sort((a, b) => new Date(b.created).getTime() - new Date(a.created).getTime());

        return commentTree[parentId].map(comment => (
            <>
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
            </>
        ));
    };

    const commentTree = buildCommentTree(comments);

    return (
        <div>
            <CommentListHeader/>
            <CommentListStyled>
                {renderCommentTree(commentTree)}
            </CommentListStyled>
        </div>
    );
}

export default CommentList;

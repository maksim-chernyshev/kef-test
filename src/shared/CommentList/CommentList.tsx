import React, {useEffect, useState} from "react";
import Comment, {IAuthor, IComment} from "../Comment/Comment";
import getCommentsRequest from "../../api/comments/getCommentsRequest";
import getAuthorsRequest from "../../api/authors/getAuthorsRequest";
import {CommentListStyled} from "./styled";
import {formatDate} from "../../lib/formatDate";
import CommentListHeader from "../CommentListHeader/CommentListHeader";

const CommentList = (props: any) => {
    const [comments, setComments] = useState<IComment[]>([])
    const [authors, setAuthors] = useState<IAuthor[]>([])

    useEffect(() => {
        getCommentsRequest(1)
            .then(data => setComments(data.data))

        getAuthorsRequest()
            .then(data => setAuthors(data))
    }, [])

    return (
        <div>
            <CommentListHeader/>
            <CommentListStyled>
                {
                    comments.map((comment: IComment) =>
                        <Comment
                            id={comment.id}
                            key={comment.id}
                            created={formatDate(comment.created)}
                            text={comment.text}
                            author={comment.author}
                            parent={comment.parent}
                            likes={comment.likes}
                            authorData={authors[comment.author]}
                        />
                    )
                }
            </CommentListStyled>
        </div>
    );
}

export default CommentList;

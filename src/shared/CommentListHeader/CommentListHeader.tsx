import {useEffect, useState} from "react";
import {getFullStats} from "../../lib/getFullStats";
import {declensionComments} from "../../lib/declensionComments";
import {CommentListHeaderStyled} from "./styled";
import allLikesImg from 'src/assets/images/like-gray-filled.png'

const CommentListHeader = (props: any) => {
    const [allComments, setAllComments] = useState<number>(0)
    const [allLikes, setAllLikes] = useState<number>(0)

    useEffect(() => {
        getFullStats()
            .then(amount => {
                setAllComments(amount.allComments)
                setAllLikes(amount.allLikes)
            })
    }, [])

    return (
        <CommentListHeaderStyled>
            <div className='comments'>{declensionComments(allComments)}</div>

            <div className='comment-list-likes'>
                <img src={allLikesImg} alt="Общее количество лайков" />
                <span className='likes-counter'>{allLikes}</span>
            </div>
        </CommentListHeaderStyled>
    )
}

export default CommentListHeader;

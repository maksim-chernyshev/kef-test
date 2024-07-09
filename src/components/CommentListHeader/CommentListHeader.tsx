import {useEffect, useState} from "react";
import {getFullStats} from "src/lib/getFullStats";
import {declensionComments} from "src/lib/declensionComments";
import {CommentListHeaderStyled} from "./styled";
import allLikesImg from 'src/assets/images/like-gray-filled.png'

const CommentListHeader = () => {
    const [allComments, setAllComments] = useState<number>(0)
    const [allLikes, setAllLikes] = useState<number>(0)
    const [isLoading, setIsLoading] = useState<boolean>(true)

    useEffect(() => {
        getFullStats()
            .then(amount => {
                setAllComments(amount.allComments)
                setAllLikes(amount.allLikes)
                setIsLoading(false)
            })
    }, [])

    return (
        <CommentListHeaderStyled>
            <div className='comments'>{!isLoading && declensionComments(allComments)}</div>

            <div className='comment-list-likes'>
                <img src={allLikesImg} alt="Общее количество лайков" />
                <span className='likes-counter'>{!isLoading && allLikes}</span>
            </div>
        </CommentListHeaderStyled>
    )
}

export default CommentListHeader;

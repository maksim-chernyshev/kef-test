import {memo, useEffect, useState} from "react";
import {getCommentsStats} from "src/lib/getFullStats";
import {declensionComments} from "src/lib/declensionComments";
import {CommentHeaderStyled} from "./styled";
import allLikesImg from 'src/assets/images/like-gray-filled.png'

interface IStats {
    comments: number;
    likes: number
}

interface ICommentsHeader {
    pages: number
}

const CommentsHeader = ({pages}: ICommentsHeader) => {
    const [isLoading, setIsLoading] = useState(true)
    const [stats, setStats] = useState<IStats>({comments: 0, likes: 0})

    useEffect(() => {
        getCommentsStats(pages)
            .then(fullStats => {
                setStats({
                    comments: fullStats.comments,
                    likes: fullStats.likes
                })
                setIsLoading(false)
            })
    }, [])

    return (
        <CommentHeaderStyled>
            <div className='comments'>
                {!isLoading ? declensionComments(stats.comments || 0) : 'Загрузка...'}
            </div>

            {!isLoading && <div className='comment-list-likes'>
                <img src={allLikesImg} alt="Общее количество лайков" />
                <span className='likes-counter'>{(stats.likes || 0)}</span>
            </div>}
        </CommentHeaderStyled>
    )
}

export default memo(CommentsHeader);

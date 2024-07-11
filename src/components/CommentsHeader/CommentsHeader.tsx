import {memo, useEffect, useState} from "react";
import {getCommentsStats} from "src/lib/getCommentsStats";
import {declensionComments} from "src/lib/declensionComments";
import {CommentHeaderStyled} from "./styled";
import allLikesImg from "src/assets/images/like-gray-filled.png";

interface IStats {
    comments: number;
    likes: number;
}

interface ICommentsHeader {
    pages: number;
}

const CommentsHeader = ({pages}: ICommentsHeader) => {
    const [isLoading, setIsLoading] = useState(true);
    const [stats, setStats] = useState<IStats>({comments: 0, likes: 0});
    const [error, setError] = useState(false);

    useEffect(() => {
        getCommentsStats(pages)
            .then((fullStats) => {
                setStats({
                    comments: fullStats.comments,
                    likes: fullStats.likes,
                });
                setIsLoading(false);
            })
            .catch((error) => setError(true));
    }, []);

    return (
        <CommentHeaderStyled>
            <div className="comments">
                {error
                    ? "Ошибка загрузки"
                    : isLoading
                    ? "Загрузка..."
                    : declensionComments(stats.comments || 0)}
            </div>

            {!isLoading && !error && (
                <div className="comment-list-likes">
                    <img src={allLikesImg} alt="" aria-hidden="true" />
                    <span
                        className="likes-counter"
                        aria-label="Общее количество лайков"
                    >
                        {stats.likes || 0}
                    </span>
                </div>
            )}
        </CommentHeaderStyled>
    );
};

export default memo(CommentsHeader);

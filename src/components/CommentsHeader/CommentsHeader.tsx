import {memo} from "react";
import {declensionComments} from "src/lib/declensionComments";
import {CommentHeaderStyled} from "./styled";
import allLikesImg from "src/assets/images/like-gray-filled.png";

interface ICommentsHeaderProps {
    stats: {
        comments: number;
        likes: number;
    };
    isLoading: boolean;
    isError: boolean;
}

const CommentsHeader = ({stats, isError, isLoading}: ICommentsHeaderProps) => {
    return (
        <CommentHeaderStyled>
            <div className="comments">
                {isError
                    ? "Ошибка загрузки"
                    : isLoading
                    ? "Загрузка..."
                    : declensionComments(stats.comments || 0)}
            </div>

            {!isLoading && !isError && (
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

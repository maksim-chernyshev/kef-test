import {memo} from "react";
import {declensionComments} from "src/lib/declensionComments";
import {CommentHeaderStyled} from "./styled";
import allLikesImg from "src/assets/images/like-gray-filled.png";

interface ICommentsHeaderProps {
    isLoading: boolean;
    stats: {
        comments: number;
        likes: number;
    };
    isError: boolean;
}

const CommentsHeader = ({stats, isLoading, isError}: ICommentsHeaderProps) => {
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

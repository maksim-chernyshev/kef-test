import {CommentStyled} from "./styled";
import {useCallback, useState} from "react";
import defaultUser from "src/assets/images/default-user.jpg";
import {IComment} from "src/types/types";
import liked from "src/assets/images/like-red-filled.png";
import notLiked from "src/assets/images/like-red-unfilled.png";

type CommentPropsType = Omit<IComment, "id" | "author" | "parent">;

const Comment = (props: CommentPropsType): JSX.Element => {
    const {created, text, likes, authorData, updateLikes} = props;

    const [isLiked, setIsLiked] = useState(false);
    const [commentLikes, setCommentLikes] = useState(likes);

    const handleClick = useCallback((): void => {
        setIsLiked(() => !isLiked);

        if (!isLiked) {
            setCommentLikes((prevState) => prevState + 1);
            updateLikes(true);
        } else {
            setCommentLikes((prevState) => prevState - 1);
            updateLikes(false);
        }
    }, [isLiked, updateLikes]);

    return (
        <CommentStyled>
            <header className="comment-header">
                <img
                    className="comment-avatar"
                    src={authorData.avatar || defaultUser}
                    alt={`Аватар ${
                        authorData.name || "пользователя не найден"
                    }`}
                />

                <div className="author-name">{`${
                    authorData.name || "Пользователь не найден"
                }`}</div>

                <time className="comment-created">{created}</time>

                <div className="comment-likes">
                    <button className="like-button" onClick={handleClick}>
                        <img
                            src={isLiked ? liked : notLiked}
                            alt={isLiked ? "Снять лайк" : "Поставить лайк"}
                        />
                    </button>
                    <span className="likes-counter">{commentLikes}</span>
                </div>
            </header>

            <p>{text}</p>
        </CommentStyled>
    );
};

export default Comment;

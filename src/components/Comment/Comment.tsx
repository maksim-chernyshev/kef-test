import {CommentStyled} from "./styled";
import LikeButton from "src/components/LikeButton/LikeButton";
import {memo, useCallback, useState} from "react";
import defaultUser from "src/assets/images/default-user.jpg";
import {IComment} from "src/types/types";

const Comment = (props: IComment): JSX.Element => {
    const {created, text, likes, authorData} = props;

    const [isLiked, setIsLiked] = useState<boolean>(false);
    const [commentLikes, setCommentLikes] = useState<number>(likes);

    const handleClick = useCallback((): void => {
        setIsLiked(() => !isLiked);

        if (!isLiked) {
            setCommentLikes((prevState) => prevState + 1);
        } else {
            setCommentLikes((prevState) => prevState - 1);
        }
    }, [isLiked]);

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

                <div className="comment-created">{created}</div>

                <div className="comment-likes">
                    <LikeButton onClick={handleClick} isLiked={isLiked} />
                    <span className="likes-counter">{commentLikes}</span>
                </div>
            </header>

            <p>{text}</p>
        </CommentStyled>
    );
};

export default memo(Comment);

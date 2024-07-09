import {CommentStyled} from "./styled";
import LikeButton from "src/components/LikeButton/LikeButton";
import {useCallback, useState} from "react";
import defaultUser from 'src/assets/images/default-user.jpg'
import {IComment} from "src/types/types";

const Comment = (props: IComment): JSX.Element => {
    const {
        id,
        created,
        text,
        likes,
        authorData
    } = props;

    const [isLiked, setIsLiked] = useState(false);

    const handleClick = useCallback((): void => {
        setIsLiked(() => !isLiked);
    }, [isLiked])

    return (
        <CommentStyled>
            <header className="comment-header">
                <img
                    className='comment-avatar'
                    src={authorData.avatar || defaultUser}
                    alt={`Аватар ${authorData.name || 'Avatar not found'}`}
                />

                <div className='author-name'>{`${authorData.name || 'User not found'}`}</div>

                <div className='comment-created'>{created}</div>

                <div className='comment-likes'>
                    <LikeButton onClick={handleClick} isLiked={isLiked} />
                    <span className='likes-counter'>{likes}</span>
                </div>
            </header>

            <p>{text}</p>
        </CommentStyled>
    )
}

export default Comment;

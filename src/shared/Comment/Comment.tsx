import {CommentStyled} from "./styled";
import LikeButton from "../LikeButton/LikeButton";
import {useCallback, useState} from "react";

export interface IComment {
    id: number;
    created: string;
    text: string;
    author: number;
    parent: number | null;
    likes: number;
    authorData: IAuthor;
}

export interface IAuthor {
    id: number;
    name: string;
    avatar: string;
}

const Comment = (props: IComment): JSX.Element => {
    const {
        id,
        created,
        text,
        author,
        parent,
        likes,
        authorData
    } = props;

    const [isLiked, setIsLiked] = useState(false);

    const handleClick = useCallback((): void => {
        setIsLiked(() => !isLiked);
    }, [isLiked])

    return (
        <>
            {!parent &&
                <CommentStyled>
                    <header className="comment-header">
                        <img
                            className='comment-avatar'
                            src={authorData.avatar}
                            alt={`Аватар ${authorData.name}`}
                        />

                        <div className='author-name'>{authorData.name}</div>

                        <div className='comment-created'>{created}</div>

                        <div className='comment-likes'>
                            <LikeButton onClick={handleClick} isLiked={isLiked} />
                            <span className='likes-counter'>{likes}</span>
                        </div>
                    </header>

                    <p>{text}</p>
                </CommentStyled>
            }
        </>
    )
}

export default Comment;

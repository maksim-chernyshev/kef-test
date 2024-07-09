import liked from 'src/assets/images/like-red-filled.png'
import notLiked from 'src/assets/images/like-red-unfilled.png'
import {LikeButtonStyled} from "./styled";

const LikeButton = (props: any) => {
    const {isLiked, onClick} = props;

    return (
        <LikeButtonStyled onClick={onClick}>
            <img src={isLiked ? liked : notLiked} alt={isLiked ? 'Поставить лайк' : 'Снять лайк'}  />
        </LikeButtonStyled>
    )
}

export default LikeButton;

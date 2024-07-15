import {ButtonStyled} from "./styled";

interface ButtonProps {
    type?: string;
    disabled?: boolean;
    isLoading?: boolean;
    onClick: () => void;
    children?: string;
}

const Button = (props: ButtonProps) => {
    const {isLoading, onClick, children} = props;

    return (
        <ButtonStyled
            type="button"
            onClick={onClick}
            disabled={isLoading}
            data-testid="comments-more"
        >
            {children}
        </ButtonStyled>
    );
};

export default Button;

import styled from "styled-components";

export const LikeButtonStyled = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 18px;
    padding: 0;
    border: none;
    background-color: transparent;
    cursor: pointer;

    @media (max-width: 600px) {
        width: 16px;
    }

    img {
        display: block;
        width: 100%;
        pointer-events: none;
    }
`;

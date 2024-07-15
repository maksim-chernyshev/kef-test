import styled from "styled-components";

export const CommentsStyled = styled.ul`
    margin: 0;
    padding-left: 0;
    list-style: none;

    ul ul,
    ul li {
        padding-left: 34px;

        @media (max-width: 600px) {
            padding-left: 0;
        }
    }

    ul > li {
        @media (max-width: 600px) {
            padding-left: 20px;
        }
    }
`;

export const CommentsErrorStyled = styled.div`
    display: flex;
    font-size: 20px;
    color: #f74a4a;
    text-align: center;
`;

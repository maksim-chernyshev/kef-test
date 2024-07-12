import styled from "styled-components";

export const LoaderStyled = styled.div`
    position: relative;
    width: 200px;
    height: 200px;

    .spinner {
        position: absolute;
        top: 50%;
        left: 50%;
        width: 80px;
        height: 80px;
        border: 20px solid #ffffff;
        border-top-color: transparent;
        border-radius: 50%;
        animation: rollin 1s linear infinite;
        box-sizing: content-box;
    }

    @keyframes rollin {
        0% {
            transform: translate(-50%, -50%) rotate(0deg);
        }
        100% {
            transform: translate(-50%, -50%) rotate(360deg);
        }
    }
`;

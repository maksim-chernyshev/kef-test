import styled from "styled-components";

export const LoaderStyled = styled.div`
    position: relative;
    width: 200px;
    height: 200px;
    display: flex;
    overflow: hidden;
    background: transparent;

    .spinner-rollin__inner {
        width: 100%;
        height: 100%;
        position: relative;
        transform: translateZ(0) scale(1);
        backface-visibility: hidden;
        transform-origin: 0 0;
    }

    .spinner-rolling__inner div {
        position: absolute;
        top: 50%;
        left: 50%;
        width: 80px;
        height: 80px;
        border: 20px solid #FFFFFF;
        border-top-color: transparent;
        border-radius: 50%;
        animation: rollin 1s linear infinite;
        box-sizing: content-box;
    }

    @keyframes rollin {
        0% { transform: translate(-50%, -50%) rotate(0deg); }
        100% { transform: translate(-50%, -50%) rotate(360deg); }
    }

`

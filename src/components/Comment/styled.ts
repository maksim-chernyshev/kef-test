import styled from "styled-components";

export const CommentStyled = styled.li`
    padding-bottom: 32px;
    color: #ffffff;

    @media (max-width: 600px) {
        padding-bottom: 24px;
    }

    .comment-header {
        display: grid;
        grid-template-columns: auto 1fr auto;
        grid-template-rows: auto auto;
        align-items: center;
        gap: 4px 20px;

        @media (max-width: 600px) {
            row-gap: 0;
            margin-bottom: 8px;
        }
    }

    .comment-avatar {
        grid-row: 1 / 3;
        align-self: start;
        width: 68px;
        height: 68px;
        border-radius: 50%;
        object-fit: cover;
        pointer-events: none;

        @media (max-width: 600px) {
            width: 40px;
            height: 40px;
        }
    }

    .author-name {
        align-self: end;
        font-size: var(--font-size);
        line-height: 22px;
        font-weight: 700;
    }

    .comment-created {
        grid-column: 2 / 3;
        align-self: start;
        font-size: var(--font-size);
        line-height: 22px;
        font-weight: 400;
        color: #8297ab;
    }

    .comment-likes {
        grid-row: 1 / 3;
        grid-column: 3 / 4;
        display: grid;
        grid-auto-flow: column;
        gap: 8px;
    }

    .likes-counter {
        font-size: 15px;
        line-height: 1.5;
        font-weight: 700;

        @media (max-width: 600px) {
            font-size: var(--font-size);
        }
    }

    p {
        overflow-wrap: break-word;
        margin: 0;
        padding-left: 88px;
        font-size: var(--font-size);

        @media (max-width: 600px) {
            padding-left: 60px;
        }
    }
`;

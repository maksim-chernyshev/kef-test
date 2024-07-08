import styled from 'styled-components'

export const CommentStyled = styled.li`

    padding-bottom: 32px;
    color: #ffffff;
    
    .comment-header {
        display: grid;
        grid-template-columns: auto 1fr auto;
        grid-template-rows: auto auto;
        align-items: center;
        gap: 4px 20px;
    }

    .comment-avatar {
        grid-row: 1 / 3;
        width: 68px;
        height: 68px;
        border-radius: 50%;
        object-fit: cover;
        pointer-events: none;
    }
    
    .author-name {
        align-self: end;
        font-size: 16px;
        line-height: 22px;
        font-weight: 700;
    }
    
    .comment-created {
        grid-column: 2 / 3;
        align-self: start;
        font-size: 16px;
        line-height: 22px;
        font-weight: 400;
        color: #8297AB;
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
    }

    p {
        margin: 0;
        padding-left: 88px;
        font-size: 16px;
    }
`

import styled from 'styled-components'

export const CommentHeaderStyled = styled.header`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    margin: 52px 0 32px;
    padding-bottom: 8px;
    border-bottom: 1px solid #767676;
    color: #ffffff;

    @media(max-width: 600px) {
        margin: 32px 0 24px;
    }

    .comments {
        font-size: var(--font-size);
        line-height: 22px;
        font-weight: 700;
    }
    
    .comment-list-likes {
        display: grid;
        grid-auto-flow: column;
        align-items: center;
        gap: 8px;
        font-size: 15px;
        line-height: 1.5;
        font-weight: 700;

        @media(max-width: 600px) {
            font-size: var(--font-size);
        }

        img {
            display: block;
            width: 18px;
            pointer-events: none;

            @media(max-width: 600px) {
                width: 16px;
            }
        }
    }
`

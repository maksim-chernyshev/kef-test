import styled from 'styled-components'

export const CommentListHeaderStyled = styled.header`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 52px;
    margin-bottom: 32px;
    padding-bottom: 8px;
    border-bottom: 1px solid #767676;
    color: #ffffff;

    .comments {
        font-size: 16px;
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

        img {
            display: block;
            width: 18px;
            pointer-events: none;
        }
    }
`

import styled from 'styled-components'

export const CommentListStyled = styled.ul`
    margin: 0;
    padding-left: 0;
    list-style: none;
    
    ul ul,
    ul li {
        padding-left: 34px;
    }
    
    + button {
        width: max-content;
        margin: 0 auto;
        padding: 8px 31px;
        border: none;
        font-size: 16px;
        line-height: 22px;
        color: #FFFFFF;
        background-color: #313439;
        cursor: pointer;
        
        &:hover {
            background-color: #767676;
        }
    }
`;

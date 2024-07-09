import styled from 'styled-components'

export const CommentListStyled = styled.ul`
    width: 100%;
    margin: 0;
    padding-left: 0;
    list-style: none;
    
    ul ul,
    ul li {
        padding-left: 34px;

        @media(max-width: 600px) {
            padding-left: 0;
        }
    }

    ul > li {
        @media(max-width: 600px) {
            padding-left: 20px;
        }
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

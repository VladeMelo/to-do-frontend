import styled, { css } from 'styled-components';

interface ContainerProps {
  isFocused: boolean;
  type: 'title' | 'description';
}

export const Container = styled.div<ContainerProps>`
  opacity: 0.8;
  border: 1px solid #F2F5F7;
  box-sizing: border-box;
  border-radius: 5px;
  padding: 16px 20px;
  margin-top: 31px;

  & + div {
    margin-top: 8px;
  }
  
  
  ${(props) =>
    props.type === 'description' &&
    css`
      height: 163px;
      margin-top: 10px;
    `
  }

  ${(props) =>
    props.isFocused &&
    css`
      border-color: #1900FF;
    `
  }
  
  ${props =>
    props.type === 'title' &&
    css`
      input {
        width: 100%;
        height: 100%;
        border: 0;
        font-weight: 500;
        font-size: 14px;
        line-height: 18px;
        color: #B3C6D3;
          
        &::placeholder {
          color: #B3C6D3;
        }
      }
    `
  }

${props =>
    props.type === 'description' &&
    css`
      textarea {
        width: 100%;
        height: 100%;
        border: 0;
        font-weight: 500;
        font-size: 14px;
        line-height: 18px;
        color: #B3C6D3;
        resize: none;
          
        &::placeholder {
          color: #B3C6D3;
        }
      }
    `
  }
`;
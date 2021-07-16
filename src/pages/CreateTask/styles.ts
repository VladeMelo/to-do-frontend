import styled from 'styled-components'

interface CategoryElementProps {
    selected?: boolean;
}

export const Container = styled.div`
    width: 100vw;
    height: 100vh;

    padding: 64px 26px 26px;
`

export const CategoryContainer = styled.div`
    margin-top: 12px;
    display: flex;
    flex-direction: row;
    align-items: center;
`

export const CategoryElement = styled.div<CategoryElementProps>`
    background: ${props => props.selected ? '#1900FF' : 'rgba(189, 205, 216, 0.1)'};
    mix-blend-mode: normal;
    border-radius: 5px;
    padding: 11px 17px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;

    h1 {
        font-weight: 600;
        font-size: 16px;
        line-height: 20px;
        color: ${props => props.selected ? '#E2DFFF' : '#BDCDD8'};
    }

    & + div {
        margin-left: 16px;
    }
`

export const DateContainer = styled.div`
    background: #FFFFFF;
    border: 1px solid rgba(242, 245, 247, 0.8);
    box-sizing: border-box;
    border-radius: 5px;
    margin-top: 10px;
    padding: 16px 16px 16px 21px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-direction: row;
    cursor: pointer;

    h1 {
        font-weight: 600;
        font-size: 14px;
        line-height: 18px;
        color: #B3C6D3;
    }
`

export const CreateTaskButton = styled.button`
    background: #1900FF;
    box-shadow: 0px 8px 20px rgba(97, 62, 234, 0.32);
    border-radius: 12px;
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 16px 0;
    width: 100%;
    margin-top: 127px;

    h1 {
        font-weight: 600;
        font-size: 16px;
        line-height: 24px;
        letter-spacing: 0.1px;
        color: #FFFFFF;
    }
`
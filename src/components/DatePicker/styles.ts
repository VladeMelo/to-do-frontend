import styled, { css } from 'styled-components'

interface DateProps {
    isDisable?: boolean;
    isWeekName?: boolean;
    isSelected?: boolean;
}

export const Container = styled.div`
    width: 100vw;
    height: 100vh;
    position: absolute;
    left: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.79);
`

export const Modal = styled.div`
    width: 100%;
    height: 524px;
    position: absolute;
    left: 0;
    bottom: 0;
    border: 1px solid #D0CEE2;
    border-radius: 29px 29px 0 0;
    box-sizing: border-box;
    padding: 42px 31px 0;
    background: #FFFFFF;
    filter: drop-shadow(0px -4px 29px rgba(0, 0, 0, 0.6));
`

export const HeaderContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;

    h1 {
        font-weight: 600;
        font-size: 30px;
        line-height: 37px;
        color: #1B1D28;
    }
`

export const PreviousOrNextContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
`

export const ArrowContainer = styled.div`
    width: 38px;
    height: 38px;
    border: 1px solid rgba(242, 245, 247, 0.8);
    box-sizing: border-box;
    border-radius: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: 0.2s;

    svg {
        color: #CFD3DE;
    }

    &:hover {
        background: #1900FF;
    }

    & + div {
        margin-left: 8px;
    }
`

export const DateMatrix= styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 28px;
`

export const DateColumn = styled.div`
    display: flex;
    align-items: flex-start;
    flex-direction: column;
`

export const DateElement = styled.h1<DateProps>`
    font-weight: 500;
    font-size: 14px;
    line-height: 125%;
    color: ${props => props.isDisable ? 'rgba(34, 39, 48, 0.1)' : '#222730'};
    margin-bottom: 21px;
    cursor: pointer;

    ${props => 
        props.isWeekName &&
        css`
            font-weight: 700;
            font-size: 12px;
            line-height: 15px;
            color: #C0C5D3;
            cursor: auto;
        `
    }

    ${props => 
        props.isDisable &&
        css`
            cursor: auto;
        `
    }

    ${props => 
        props.isSelected &&
        css`
            color: #FFFFFF;
            position: relative;
            display: flex;

            &::after {
                content: '';
                position: absolute;
                width: 30px;
                height: 30px;
                left: 50%;
                top: -7.5px;
                margin-left: -15px;
                background: #1900FF;
                border-radius: 50%;
                z-index: -1;
            }
        `
    }

    & + h1 {
        margin-bottom: 30px;
    }
`

export const SelectDateButton = styled.button`
    background: #1900FF;
    box-shadow: 0px 8px 20px rgba(97, 62, 234, 0.32);
    border-radius: 12px;
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 16px 0;
    width: 100%;
    margin-top: 20px;

    h1 {
        font-weight: 600;
        font-size: 16px;
        line-height: 24px;
        letter-spacing: 0.1px;
        color: #FFFFFF;
    }
`
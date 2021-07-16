import styled, { css, keyframes } from 'styled-components'

interface TaskCompletedProps {
    isCompleted?: boolean;
}

interface TaskTitleProps {
    isCompleted?: boolean;
}

interface TaskContentProps {
    oldIsOptionsClicked?: boolean;
    currentIsOptionsClicked?: boolean;
}

interface EditTaskProps {
    oldIsOptionsClicked?: boolean;
    currentIsOptionsClicked?: boolean;
}

interface RemoveTaskProps {
    oldIsOptionsClicked?: boolean;
    currentIsOptionsClicked?: boolean;
}

const slideOptions = keyframes`
    from {
        margin-right: 0;
    }

    to {
        margin-right: 120px;
    }
`

const slideOptionsBack = keyframes`
    from {
        margin-right: 120px;
    }

    to {
        margin-right: 0;
    }
`

const slideEdit = keyframes`
    from {
        right: -92px;
    }

    to {
        right: 28px;
    }
`

const slideEditBack = keyframes`
    from {
        right: 28px;
    }

    to {
        right: -92px;
    }
`

const slideRemove = keyframes`
    from {
        right: -152px;
    }

    to {
        right: -32px;
    }
`

const slideRemoveBack = keyframes`
    from {
        right: -32px;
    }

    to {
        right: -152px;
    }
`

export const Container = styled.div`
    width: 100vw;
    height: 100vh;

    padding: 70px 0px 45px;
`

export const HeaderContainer = styled.div`
    padding: 0 30px 30px;
    border-bottom: 1px solid #EDEEF2;
`

export const SearchContainer = styled.div`
    position: relative;

    svg {
        position: absolute;
        width: 14px;
        height: 14px;
        color: #B3C6D3;
        top: calc(50% - 3.5px);
        right: 18px;
    }
`

export const SearchInput = styled.input`
    opacity: 0.8;
    border: 1px solid #E7E7EE;
    box-sizing: border-box;
    border-radius: 5px;
    margin-top: 10px;
    width: 100%;
    padding: 16px 40px 16px 20px;
    color: #B3C6D3;
    font-weight: 500;
    font-size: 14px;
    line-height: 18px;

    &::placeholder {
        color: #B3C6D3;
    }
`

export const ListTitle = styled.h1`
    font-weight: 700px;
    font-size: 30px;
    line-height: 170.3%;
`

export const CategoryContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-top: 25px;
`

export const CategoryTitle = styled.h1`
    font-weight: 600;
    font-size: 14px;
    line-height: 150%;
    letter-spacing: -0.5px;
    color: #1B1D28;
`

export const CategorySelected = styled.select`
    font-weight: 600;
    font-size: 14px;
    letter-spacing: -0.5px;
    line-height: 150%;
    color: #7795A9;
    margin-left: 15px;
    border: none;
    appearance: none;
    padding-right: 10px;
    cursor: pointer;
`

export const TaskContainer = styled.div`
    padding: 35px 30px 0;
`

export const TaskContent = styled.div<TaskContentProps>`
    display: flex;
    flex-direction: row;
    align-items: center;
    position: relative;

    ${props => 
        !props.oldIsOptionsClicked && 
        props.currentIsOptionsClicked &&
        css`
            animation: ${slideOptions} 1.8s;
            margin-right: 120px;
        `
    }

    ${props => 
        props.oldIsOptionsClicked && 
        !props.currentIsOptionsClicked &&
        css`
            animation: ${slideOptionsBack} 1.5s;
            margin-right: 0px;
        `
    }

    & + div {
        margin-top: 32px;
    }
`

export const TaskCompleted = styled.div<TaskCompletedProps>`
    border-radius: 2px;
    
    height: 24.3px;
    width: 24.3px;
    
    cursor: pointer;

    ${props => 
        !props.isCompleted &&
        css`
            border: 2px solid #EFF2F5;
        `
    }

    ${props => 
        props.isCompleted &&
        css`
            background: #BDCDD8;
            display: flex;
            align-items: center;
            justify-content: center;
        `
    }
`

export const TaskTitle = styled.h1<TaskTitleProps>`
    font-weight: 500;
    font-size: 16px;
    line-height: 150%;
    letter-spacing: -0.5px;
    color: ${props => props.isCompleted ? '#BDCDD8' : '#1B1D28'};
    margin-left: 15px;

    ${props => 
        props.isCompleted &&
        css`
            text-decoration: line-through;
        `
    }
`

export const EditTask = styled.div<EditTaskProps>`
    background: #1900FF;
    border: 1px solid #EFF2F5;
    box-sizing: border-box;
    border-radius: 8px 0px 0px 8px;
    padding: 16px 50px 16px 21px;
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    right: -92px;
    cursor: pointer;

    ${props => 
        !props.oldIsOptionsClicked && 
        props.currentIsOptionsClicked &&
        css`
            animation: ${slideEdit} 1.8s;
            right: 28px;
        `
    }

    ${props => 
        props.oldIsOptionsClicked && 
        !props.currentIsOptionsClicked &&
        css`
            animation: ${slideEditBack} 1.5s;
            right: -92px;
        `
    }
`

export const RemoveTask = styled.div<RemoveTaskProps>`
    background: #E20020;
    box-sizing: border-box;
    border-radius: 8px 0px 0px 8px;
    padding: 16px 50px 16px 21px;
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    right: -92px;
    cursor: pointer;

    ${props => 
        !props.oldIsOptionsClicked && 
        props.currentIsOptionsClicked &&
        css`
            animation: ${slideRemove} 1.8s;
            right: -32px;
        `
    }

    ${props => 
        props.oldIsOptionsClicked && 
        !props.currentIsOptionsClicked &&
        css`
            animation: ${slideRemoveBack} 1.5s;
            right: -152px;
        `
    }
`

export const FloatIcon = styled.div`
    background: #1900FF;
    box-shadow: 0px 8px 20px rgba(97, 62, 234, 0.32);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 60px;
    height: 60px;
    position: fixed;
    right: 23px;
    bottom: 26px;
    cursor: pointer;
`
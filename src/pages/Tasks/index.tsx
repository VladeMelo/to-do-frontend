import React, { useState, useCallback, useEffect, useRef, useMemo } from 'react'
import { Check, ChevronDown, MoreVertical, Edit2, Plus, Trash2, Search } from 'react-feather'
import { useHistory, useLocation } from 'react-router-dom'

import {
    Container, 
    HeaderContainer,
    ListTitle,
    SearchContainer,
    SearchInput,
    CategoryContainer,
    CategoryTitle,
    CategorySelected,
    TaskContainer,
    TaskContent,
    TaskCompleted,
    TaskTitle,
    EditTask,
    RemoveTask,
    FloatIcon
} from './styles'
import { useTask } from '../../hooks/tasks'

type Category = 'family' | 'house' | 'work';

interface TasksProps {
    id: string;
    title: string;
    description: string;
    category: Category;
    date: Date[];
    isCompleted: boolean;
    oldIsOptionsClicked: boolean;
    currentIsOptionsClicked: boolean;
}

interface StateLocation {
    category: Category;
}

const Tasks = () => {
    const location = useLocation()
    const stateLocation = location.state as StateLocation

    const history = useHistory()

    const { 
        tasks: tasksContext, 
        toggleTaskCompleted,
        removeTask
    } = useTask()

    const [tasks, setTasks] = useState<TasksProps[]>([])
    const [categorySelected, setCategorySelected] = useState<Category>(stateLocation?.category || "family")
    const [taskToSearch, setTaskToSearch] = useState('')

    useEffect(() => {
        setTasks(
            [...tasksContext[categorySelected]].map((elem, index) => ({
                ...elem,
                oldIsOptionsClicked: false,
                currentIsOptionsClicked: false,
            }))
        )
    }, [tasksContext, categorySelected])

    const toggleOptionsClicked = useCallback((taskId: string) => {
        const tasksCopy = [...tasks].map(elem => (
            elem.id === taskId 
                ? { 
                    ...elem, 
                    oldIsOptionsClicked: elem.currentIsOptionsClicked,
                    currentIsOptionsClicked: !elem.currentIsOptionsClicked 
                }
                : elem
        ))
        
        setTasks(tasksCopy)
    }, [tasks])

    const handleEditTask = useCallback((task: TasksProps) => {
        history.push({
            pathname: '/create',
            state: {
                ...task
            }
        })
    }, [history])

    const handleChangeCategory = useCallback((event) => {
        setCategorySelected(event.target.value);
    }, [setCategorySelected])

    const handleTaskToSearch = useCallback((event) => {
        setTaskToSearch(event.target.value);
    }, [setTaskToSearch])

    const tasksSearched = useMemo(() => {
        return taskToSearch.trim()
                ? tasks.filter(task => task.title.toLocaleLowerCase().includes(taskToSearch.toLocaleLowerCase()))
                : tasks
    }, [taskToSearch, tasks])

    return(
        <Container>
            <HeaderContainer>
                <ListTitle>To-Do List</ListTitle>

                <SearchContainer>
                    <SearchInput
                        type='text'
                        placeholder='Search Task'
                        onChange={(event) => handleTaskToSearch(event)}
                    />

                    <Search/>
                </SearchContainer>

                <CategoryContainer>
                    <CategoryTitle>Category</CategoryTitle>

                    <CategorySelected value={categorySelected} onChange={(event) => handleChangeCategory(event)}>
                        <option value='family'>Family</option>
                        <option value='work'>Work</option>
                        <option value='house'>House</option>
                    </CategorySelected>

                    <ChevronDown
                        style={{ 
                            marginLeft: -10, 
                            color: '#1B1D28',
                            pointerEvents: 'none'
                        }}
                    />
                </CategoryContainer>
            </HeaderContainer>

            <TaskContainer>
                {tasksSearched.map(elem => (
                    <TaskContent
                        oldIsOptionsClicked={elem.oldIsOptionsClicked}
                        currentIsOptionsClicked={elem.currentIsOptionsClicked}
                        key={elem.id}
                    >
                        <TaskCompleted 
                            isCompleted={elem.isCompleted} 
                            onClick={() => toggleTaskCompleted(elem)}    
                        >
                            {elem.isCompleted && 
                            <Check 
                                style={{
                                    color: '#EFF2F5',
                                }}
                            />}
                        </TaskCompleted>

                        <TaskTitle
                            isCompleted={elem.isCompleted} 
                        >
                            {elem.title}
                        </TaskTitle>

                        <MoreVertical
                            onClick={() => toggleOptionsClicked(elem.id)} 
                            style={{
                                color: '#EFF2F5',
                                position: 'absolute',
                                right: 0,
                                height: 24,
                                width: 24,
                                cursor: 'pointer'
                            }}
                        />
                        
                        <EditTask
                            oldIsOptionsClicked={elem.oldIsOptionsClicked}
                            currentIsOptionsClicked={elem.currentIsOptionsClicked}
                            onClick={() => handleEditTask(elem)}
                        >
                            <Edit2
                                style={{
                                    color: '#EFF2F5',
                                    height: 20,
                                    width: 20
                                }}
                            />
                        </EditTask>

                        <RemoveTask
                            oldIsOptionsClicked={elem.oldIsOptionsClicked}
                            currentIsOptionsClicked={elem.currentIsOptionsClicked}
                            onClick={() => removeTask(elem)}
                        >
                            <Trash2
                                style={{
                                    color: '#EFF2F5',
                                    height: 20,
                                    width: 20
                                }}
                            />
                        </RemoveTask>
                    </TaskContent>
                ))}
            </TaskContainer>

            <FloatIcon>
                <Plus
                    style={{
                        color: '#FFF',
                        width: 16,
                        height: 16
                    }}
                    onClick={() => history.push('create')}
                />
            </FloatIcon>
        </Container>
    )
}

export default Tasks
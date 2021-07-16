import React, { useCallback, useMemo, useState } from 'react'
import { ChevronLeft, Calendar } from 'react-feather'
import { Form } from '@unform/web';
import { useHistory, useLocation } from 'react-router-dom'

import { useTask } from '../../hooks/tasks'

import Input from '../../components/Input'
import DatePicker from '../../components/DatePicker'

import {
    Container,
    CategoryContainer,
    CategoryElement,
    DateContainer,
    CreateTaskButton,
} from './styles'

type Category = 'family' | 'house' | 'work';

interface TaskFormData {
    title: string;
    description: string;
    category: Category;
}

interface Categories {
    name: string;
    type: Category;
}

const namesAndTypes: Categories[] = [
    {
        name: 'Work',
        type: 'work',
    },
    {
        name: 'House',
        type: 'house',
    },
    {
        name: 'Family',
        type: 'family',
    }
]

interface StateLocation {
    id: string;
    title: string;
    description: string;
    category: Category;
    isCompleted: boolean;
    date: Date[];
}

const NewTask = () => {
    const location = useLocation()
    const stateLocation = location.state as StateLocation

    const history = useHistory()

    const { createTask, updateTask } = useTask()

    const [categories, setCategories] = useState(namesAndTypes.map((elem, index) => ({
        ...elem,
        id: index,
        selected: stateLocation
                    ? elem.type === stateLocation.category 
                        ? true 
                        : false
                    : index === 0
                        ? true 
                        : false
    })))
    const [dateSelected, setDateSelected] = useState<Date[]>([])
    const [openDatePicker, setOpenDatePicker] = useState(false)

    const handleSubmit = useCallback((data: TaskFormData) => {
        const category = categories.filter(category => category.selected)[0].type
        const date = dateSelected.length === 0 ? [new Date()] : dateSelected
        
        if (!data.title.trim() || !data.description.trim()) {
            alert('Title and Description must be filled')
            return
        }

        if (stateLocation) {
            updateTask({
                ...data,
                id: stateLocation.id,
                isCompleted: stateLocation.isCompleted,
                date,
                category
            })
        } else {
            createTask({
                ...data,
                date,
                category
            })
        }

        history.push({
            pathname: '/',
            state: {
                category
            }
        })
    }, [dateSelected, categories, stateLocation, createTask, updateTask, history])

    const handleSelectCategory = useCallback((id: number) => {
        const categoriesCopy = [...categories].map(elem => {
            if (elem.id !== id) {
                return {
                    ...elem,
                    selected: false
                }
            } else {
                return {
                    ...elem,
                    selected: true
                }
            }
        })

        setCategories(categoriesCopy)
    }, [categories])

    const dateToShow = useMemo(() => {
        const formatDate = (date: Date) => {
            const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

            return  monthNames[date.getMonth()] + ', ' + date.getDate() + ', ' + date.getFullYear()
        }

        return stateLocation
                ? stateLocation.date.length !== 0
                    ? formatDate(new Date(stateLocation.date[0]))
                    : formatDate(new Date())
                : dateSelected.length === 0
                        ? formatDate(new Date())
                        : formatDate(dateSelected[0])
    }, [dateSelected, stateLocation])

    const toggleOpenDatePicker = useCallback(() => {
        setOpenDatePicker(!openDatePicker)
    }, [openDatePicker])

    return(
        <Container>
            <ChevronLeft
                onClick={() => history.goBack()}
                style={{
                    color: '#22215B',
                    cursor: 'pointer'
                }}
            />

            <Form onSubmit={handleSubmit} >
                <h1
                    style={{
                        fontWeight: 700,
                        fontSize: 30,
                        lineHeight: '107.3%',
                        color: `#1B1D28`,
                        marginTop: 26
                    }}
                >
                    New task
                </h1>

                <Input 
                    name="title" 
                    type='title' 
                    placeholder="Title"
                    currValue={stateLocation?.title}
                />

                <Input 
                    name="description" 
                    type='description' 
                    placeholder="Write a note"
                    currValue={stateLocation?.description}
                />

                <h1
                    style={{
                        fontWeight: 600,
                        fontSize: 14,
                        lineHeight: '150%',
                        letterSpacing: '-0.5px',
                        color: `#C0C5D3`,
                        marginTop: 38
                    }}
                >
                    Category
                </h1>

                <CategoryContainer>
                    {categories.map(elem => (
                        <CategoryElement 
                            key={elem.id} 
                            selected={elem.selected} 
                            onClick={() => handleSelectCategory(elem.id)}    
                        >
                            <h1>{elem.name}</h1>
                        </CategoryElement>
                    ))}
                </CategoryContainer>

                <h1
                    style={{
                        fontWeight: 600,
                        fontSize: 14,
                        lineHeight: '150%',
                        letterSpacing: '-0.5px',
                        color: `#C0C5D3`,
                        marginTop: 22
                    }}
                >
                    Remind me on a date
                </h1>

                <DateContainer
                    onClick={toggleOpenDatePicker}
                >
                    <h1>{dateToShow}</h1>

                    <Calendar
                        style={{
                            width: 16,
                            height: 16,
                            color: "#B3C6D3"
                        }}
                    />
                </DateContainer>

                <CreateTaskButton type="submit">
                    <h1>{stateLocation ? 'Update' : 'Create'} Task</h1>
                </CreateTaskButton>
            </Form>

            {openDatePicker && 
                <DatePicker
                    setDateSelected={setDateSelected}
                    toggleOpenDatePicker={toggleOpenDatePicker}
                />
            }
        </Container>
    )
}

export default NewTask
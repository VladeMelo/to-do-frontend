import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { ChevronLeft, ChevronRight } from 'react-feather'

import {
    Container,
    Modal,
    HeaderContainer,
    PreviousOrNextContainer,
    ArrowContainer,
    DateMatrix,
    DateColumn,
    DateElement,
    SelectDateButton
} from './styles'

interface Days {
    day: number;
    isDisable: boolean;
    isSelected: boolean;
}

interface DaysSelected {
    start?: number;
    end?: number;
}

interface DatePickerProps {
    setDateSelected(date: Date[]): void;
    toggleOpenDatePicker(): void;
}

const daysOfTheWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"]

const DatePicker = ({ setDateSelected, toggleOpenDatePicker }: DatePickerProps) => {
    const [days, setDays] = useState<Days[]>([])
    const [month, setMonth] = useState(new Date().getMonth())
    const [year, setYear] = useState(new Date().getFullYear())

    const [daysSelected, setDaysSelected] = useState<DaysSelected>({})

    useEffect(() => {
        const firstDayOfWeekCurrMonth = new Date(year, month).getDay()
        const lastDayCurrMonth = new Date(year, month + 1, 0).getDate()
        
        const lastDayLastMonth = new Date(year, month, 0).getDate()

        const daysLastMonth =    new Array(firstDayOfWeekCurrMonth)
                                    .fill(lastDayLastMonth - firstDayOfWeekCurrMonth + 1)
                                    .map((elem, index) => ({
                                      day: elem + index,
                                      isDisable: true,
                                      isSelected: false
                                  }))
        
        const daysCurrMonth = new Array(lastDayCurrMonth)
                                .fill(1)
                                .map((elem, index) => ({
                                    day: elem + index,
                                    isDisable: false,
                                    isSelected: false
                                }))           
            
        const daysNextMonth = new Array((6 * 7) - daysLastMonth.length - daysCurrMonth.length)
                                .fill(1)
                                .map((elem, index) => ({
                                    day: elem + index,
                                    isDisable: true,
                                    isSelected: false
                                }))

        setDays([...daysLastMonth, ...daysCurrMonth, ...daysNextMonth])
    }, [month, year])

    const daysMatrix: any[] = useMemo(() => {
        const buildColumn = (numberOfColumn: number) => {
            const column = [
                daysOfTheWeek[numberOfColumn], 
                ...new Array(6).fill(0).map((_, index) => days[numberOfColumn + (index * 7)])
            ]

            return column
        }

        const matrix = new Array(7)
                        .fill(0)
                        .map((elem, index) => buildColumn(elem + index))

        return matrix
    }, [days])

    const handleSelectDate = useCallback((columnIndex: number, rowIndex: number) => {
        if (rowIndex === 0) return 

        const position = columnIndex + 7 * (rowIndex - 1)

        if (days[position].isDisable) return

        if (daysSelected.start === undefined) {
            setDaysSelected({
                start: position
            })

            let daysCopy = [...days]
            daysCopy[position].isSelected = true
            setDays(daysCopy)
        } else if (position > daysSelected.start) {
            setDaysSelected({
                ...daysSelected,
                end: position
            })

            let daysCopy = [...days].map((elem, index) => 
                daysSelected.start !== undefined && index >= daysSelected.start && index <= position
                ? { ...elem, isSelected: true }
                : { ...elem, isSelected: false }
            )
            setDays(daysCopy)
        } else {
            setDaysSelected({
                ...daysSelected,
                start: position
            })

            let daysCopy = [...days].map((elem, index) => 
                daysSelected.end !== undefined && index >= position && index <= daysSelected.end
                    ? { ...elem, isSelected: true }
                    : { ...elem, isSelected: false }
            )
            setDays(daysCopy)
        }
    }, [days, daysSelected])

    const handleSubmitDate = useCallback(() => {
        const dateSelectedAndOrganized = days.filter(day => day.isSelected).map(day => new Date(year, month, day.day))
        setDateSelected(dateSelectedAndOrganized)

        toggleOpenDatePicker()
    }, [days, setDateSelected, toggleOpenDatePicker, month, year])

    const dateHeaderFormatted = useMemo(() => {
        const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

        return monthNames[month] + ' ' + year
    }, [month, year])

    const handleSubMonth = useCallback(() => {
        if (month === 0){
            setMonth(11)
            setYear(year - 1)
            return
        }
        
        setMonth(month - 1)
    }, [month, year])

    const handleAddMonth = useCallback(() => {
        if (month === 11){
            setMonth(0)
            setYear(year + 1)
            return
        }
        
        setMonth(month + 1)
    }, [month, year])

    return(
        <Container>
            <Modal>
                <HeaderContainer>
                    <h1>{dateHeaderFormatted}</h1>

                    <PreviousOrNextContainer>
                        <ArrowContainer
                            onClick={handleSubMonth}
                        >
                            <ChevronLeft/>
                        </ArrowContainer>

                        <ArrowContainer
                            onClick={handleAddMonth}
                        >
                            <ChevronRight/>
                        </ArrowContainer>
                    </PreviousOrNextContainer>
                </HeaderContainer>

                <DateMatrix>
                    {daysMatrix.map((daysColumn, columnIndex) => (
                        <DateColumn key={columnIndex}>
                            {daysColumn.map((elem, rowIndex) => (
                                <DateElement
                                    key={rowIndex}
                                    isWeekName={rowIndex === 0}
                                    isDisable={rowIndex !== 0 && elem?.isDisable}
                                    isSelected={rowIndex !== 0 && !elem?.isDisable && elem?.isSelected}
                                    onClick={() => handleSelectDate(columnIndex, rowIndex)}
                                >
                                    {rowIndex === 0 ? elem : elem?.day}
                                </DateElement>
                            ))}
                        </DateColumn>
                    ))}
                </DateMatrix>

                <SelectDateButton
                    onClick={handleSubmitDate}
                >
                    <h1>Select a date</h1>
                </SelectDateButton>
            </Modal>
        </Container>
    )
}

export default DatePicker
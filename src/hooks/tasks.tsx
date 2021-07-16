import React, { createContext, useCallback, useState, useContext } from 'react';
//createContext, useCallback, useState, useContext
import { v4 } from 'uuid';

type Category = 'work' | 'house' | 'family'

interface Task {
  id: string;
  title: string;
  description: string;
  category: Category;
  date: Date[]; // vai mostrar só a primeira data, mas essas são todas que a pessoa marcou
  isCompleted: boolean;
}

interface TasksState {
  work: Task[];
  house: Task[];
  family: Task[];
}

interface TasksContextData {
  tasks: TasksState;
  createTask(task: Omit<Task, 'id' | 'isCompleted'>): void;
  removeTask(task: Task): void;
  toggleTaskCompleted(task: Task): void;
  updateTask(task: Task): void;
}

const TasksContext = createContext<TasksContextData>({} as TasksContextData)

export const TasksProvider: React.FC = ({ children }) => {
  const [tasks, setTasks] = useState<TasksState>(() => {
    const workTasks = localStorage.getItem('@ToDo:work');
    const houseTasks = localStorage.getItem('@ToDo:house');
    const familyTasks = localStorage.getItem('@ToDo:family');

    return {
        work: workTasks ? JSON.parse(workTasks) : [] as Task[],
        house: houseTasks ? JSON.parse(houseTasks) : [] as Task[],
        family: familyTasks ? JSON.parse(familyTasks) : [] as Task[]
    }
  });

  const createTask = useCallback((task: Omit<Task, 'id' | 'isCompleted'>) => {
    const { category } = task
    const id = v4()

    let tasksCopy = {...tasks}
    tasksCopy[category].push(
      {
        ...task,
        id,
        isCompleted: false
      }
    )

    setTasks(tasksCopy)

    localStorage.setItem(`@ToDo:${category}`, JSON.stringify(tasksCopy[category]));
  }, [tasks])

  const removeTask = useCallback((task: Task) => {
    const { category } = task

    let tasksCopy = {...tasks}
    const taskIndex = tasksCopy[category].findIndex(elem => elem.id === task.id)
    tasksCopy[category].splice(taskIndex, 1)


    setTasks(tasksCopy)
    localStorage.setItem(`@ToDo:${category}`, JSON.stringify(tasksCopy[category]));
  }, [tasks])

  const toggleTaskCompleted = useCallback((task: Task) => {
    const { 
      category, 
      date, 
      title, 
      isCompleted, 
      description, 
      id 
    } = task

    let tasksCopy = {...tasks}
    const taskIndex = tasksCopy[category].findIndex(elem => elem.id === task.id)
    tasksCopy[category][taskIndex] = { 
      category,
      date,
      id,
      description,
      title,
      isCompleted: !isCompleted
    }
    
    setTasks(tasksCopy)

    localStorage.setItem(`@ToDo:${category}`, JSON.stringify(tasksCopy[category]));
  }, [tasks])

  const updateTask = useCallback((task: Task) => {
    const { 
      category, 
      date, 
      title, 
      isCompleted, 
      description, 
      id
    } = task

    let tasksCopy = {...tasks}
    const taskIndex = tasksCopy[category].findIndex(elem => elem.id === task.id)
    tasksCopy[category][taskIndex] = { 
      category,
      date,
      id,
      description,
      title,
      isCompleted
    }

    setTasks(tasksCopy)

    localStorage.setItem(`@ToDo:${category}`, JSON.stringify(tasksCopy[category]));
  }, [tasks])

  return (
    <TasksContext.Provider
      value={{
        tasks,
        createTask,
        removeTask,
        toggleTaskCompleted,
        updateTask
      }}
    >
      {children}
    </TasksContext.Provider>
  );
};

export function useTask(): TasksContextData {
  const context = useContext(TasksContext);

  if (!context) {
    // se o TasksContext ñ foi criado, ou seja, caso não haja .Provider ao redor
    throw new Error('The context must be used within an .Provider');
  }

  return context;
}
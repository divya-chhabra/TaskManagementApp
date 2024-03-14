import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { TaskInterface } from '../../services/interface';

// Step 1: Define the context interface

interface TaskState {
    tasks: TaskInterface[];
}

export interface TaskContextType extends TaskState {
    addTask: (item: TaskInterface) => void;
    updateTask: (item: TaskInterface) => void;
    removeTask: (id: number) => void;
}

interface TaskProviderProps {
    children: React.ReactNode;
}

// Step 2: Define action types and interfaces
enum ActionType {
    SET_TASKS = 'SET_TASKS',
    ADD_TASK = 'ADD_TASK',
    REMOVE_TASK = 'REMOVE_TASK',
    UPDATE_TASK = 'UPDATE_TASK'
}

interface SetTasksAction {
    type: ActionType.SET_TASKS;
    payload: TaskInterface[];
}

interface addTaskAction {
    type: ActionType.ADD_TASK;
    payload: TaskInterface;
}

interface updateTaskAction {
    type: ActionType.UPDATE_TASK;
    payload: TaskInterface;
}

interface removeTaskAction {
    type: ActionType.REMOVE_TASK;
    payload: number;
}

type Action = addTaskAction | removeTaskAction | SetTasksAction | updateTaskAction;

// Step 3: Create the reducer function
const reducer = (state: TaskState, action: Action): TaskState => {
    switch (action.type) {
        case ActionType.SET_TASKS:
            return {
                ...state,
                tasks: [...state.tasks, ...action.payload],
            };
        case ActionType.ADD_TASK:
            let task = action.payload;
            task.id  = Math.floor(Math.random() * 1000000) + 1; // generate ID (primary key)
            task.status = 'pending';
            return {
                ...state,
                tasks: [...state.tasks, task],
            };

        case ActionType.REMOVE_TASK:
            return {
                ...state,
                tasks: state.tasks.filter(item => item.id !== action.payload),
            };
        
        case ActionType.UPDATE_TASK:
            let taskIndex = state.tasks.findIndex((task : TaskInterface)  => task.id == action.payload.id);
            let tasks = state.tasks;
            tasks[taskIndex] = action.payload;
            return {
                ...state,
                tasks
            };

        default:
            return state;
    }
};

// Step 4: Create the context
export const TaskContext = createContext<TaskContextType | undefined>(undefined);

// Step 5: Create a provider component
export default function TaskProvider({ children}: TaskProviderProps){
    const [state, dispatch] = useReducer(reducer, { tasks: [] });

    // Handle persistance using localStorage
    useEffect(() => {
        const persistedTasks = localStorage.getItem('tasks');
         if (persistedTasks) {
            const tasks = JSON.parse(persistedTasks);
            if (tasks.length) {
                dispatch({ type: ActionType.SET_TASKS, payload: tasks });
            } 
        }
    }, []);

    useEffect(() => {
        // Update localStorage when state changes
        localStorage.setItem('tasks', JSON.stringify(state.tasks));
    }, [state.tasks]);

    const addTask = (item: TaskInterface) => {
        dispatch({ type: ActionType.ADD_TASK, payload: item });
    };

    const removeTask = (id: number) => {
        dispatch({ type: ActionType.REMOVE_TASK, payload: id });
    };

    const updateTask = (item: TaskInterface) => {
        dispatch({ type: ActionType.UPDATE_TASK, payload: item });
    };
    

    return (
        <TaskContext.Provider value={{ tasks: state.tasks, addTask, removeTask, updateTask }}>
            {children}
        </TaskContext.Provider>
    );
}

export const useTaskContext = () => {
    const context = useContext(TaskContext);
    if (!context) {
        throw new Error('Something went wrong!');
    }
    return context;
};
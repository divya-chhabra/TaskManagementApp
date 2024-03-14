import React from 'react';
import { Link } from "react-router-dom";
import { useTaskContext } from '../../contexts/TaskContext/taskcontext';
import moment from 'moment';
import { TaskInterface } from "./../../services/interface"

interface MyTaskInterface {
    task: TaskInterface,
    index: number
}
const Task = ({ task, index }: MyTaskInterface) => {

    const {removeTask, updateTask} = useTaskContext();

    const handleDeleteTask = (id: number) => {
        removeTask(id); 
    }

    return (
        <tr>
            <td>{index + 1}.</td>
            <td>
                {task.title}
                {
                    task.due_date && moment(task.due_date).isBefore(moment(), 'day') ? (
                        <div style={{marginTop: '0.5rem'}}>
                            <button className='bg-danger button'>
                                Overdue
                            </button>
                        </div>
                    )
                    : ""
                }
            </td>
            <td>{task.description}</td>
            <td>{task.status}</td>
            <td>
                <div className="btn-group">
                    <Link to={`/tasks/edit/${task.id}`}>
                        Edit
                    </Link>
                    {
                        task.status == 'pending'  && (
                            <button className="bg-success" onClick={() => updateTask({...task, status: 'completed' })}>
                                Mark as completed
                            </button>
                        )
                    }
                    
                    <button className="bg-danger" onClick={() => handleDeleteTask(task.id || 0)}>
                        Delete
                    </button>
                </div>
            </td>
        </tr>
    )
}

export default Task;
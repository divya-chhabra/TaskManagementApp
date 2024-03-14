import React, {useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import TextInput from "../../components/Form/TextInput";
import Textarea from "../../components/Form/Textarea";
import Button from "../../components/ui/Button/index";
// import { updateTask, getTask } from "../../services/helpers.ts";
import { TaskInterface } from "../../services/interface";
import { useParams } from 'react-router-dom';
import { useTaskContext } from "../../contexts/TaskContext/taskcontext";
import Layout from "./layout";

const EditTask = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [due_date, setDueDate] = useState('');
    const [task, setTask] = useState<TaskInterface>();
    const navigate = useNavigate();
    const { id } = useParams();
    const {updateTask, tasks} = useTaskContext();


    const handleSubmit = () => {
        if(!title.length) {
            alert('Please enter a title');
            return;
        }
        if(!description.length) {
            alert('Please enter a description');
            return;
        }


        // if all is good 
        const taskID:number = typeof id === 'string' ? parseInt(id) : 0;
        updateTask(
            {
                id: taskID,
                title,
                description,
                due_date,
                status: task?.status
            }
        );

        alert('Task has been updated successfully'); // success message
        navigate('/tasks');
    }

    

    useEffect(() => {
        if(id) {
            let taskData:TaskInterface | any = tasks.find(task => task.id == parseInt(id));
            if(taskData) { 
                setTask(taskData);
                setTitle(taskData.title);
                setDescription(taskData.description);
                setDueDate(taskData.due_date);
            }
        }
    }, [id, tasks]);

    return (
        <Layout>
            {
                !task?.id ? (    
                    <div>Loading...</div>
                ) : 
                <form>
                    <TextInput 
                        type={'text'}
                        value={task?.title}
                        label="Title" 
                        callback={(value:string) => setTitle(value)}
                    />
                    <Textarea 
                        label="Description" 
                        value={task?.description}
                        callback={(value:string) => setDescription(value)}
                    />
                    <Button 
                        text="Update task" 
                        callback={handleSubmit}
                    />
                </form>
            }
        </Layout>
    );
}
export default EditTask;
import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import TextInput from "../../components/Form/TextInput";
import Textarea from "../../components/Form/Textarea";
import Button from "../../components/ui/Button/index";
import { useTaskContext } from "../../contexts/TaskContext/taskcontext";
import Layout from "./layout";

const AddTask = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [due_date, setDueDate] = useState('');
    const navigate = useNavigate();
    const { addTask } = useTaskContext();

    const handleSubmit = () => {
        if(!title.length) {
            alert('Please enter a title');
            return;
        }
        if(!description.length) {
            alert('Please enter a description');
            return;
        }

        // if all good 
        addTask({
            title,
            description,
            due_date
        });

        alert('Task has been created successfully'); // success message
        navigate('/tasks');
    }
    return (
        <Layout>
            <form>
                <TextInput 
                    type={'text'}
                    label="Title" 
                    callback={(value:string) => setTitle(value)}
                />
                <Textarea 
                    label="Description" 
                    callback={(value:string) => setDescription(value)}
                />

                <TextInput 
                    type={'date'}
                    label="Due Date" 
                    callback={(value:string) => setDueDate(value)}
                />
                <Button 
                    text="Add task" 
                    callback={handleSubmit}
                />
            </form>
        </Layout>
    );
}
export default AddTask;
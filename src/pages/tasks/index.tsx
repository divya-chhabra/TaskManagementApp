import './style.css';
import TasksList from '../../components/TasksList/TasksList';
import Layout from './layout';

const TasksPage = () => {
    return (
        <Layout>
            <div className='tasks-container'>
                <TasksList />
            </div>
        </Layout>
    );
}

export default TasksPage;
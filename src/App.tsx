
import './App.css';
import { Routes, Route, Link } from 'react-router-dom';
import TasksPage from './pages/tasks/index';
import AddTask from './pages/tasks/add';
import EditTask from './pages/tasks/edit';
import LoginPage from './pages/Home';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';

function App() {
  return (
    <div className="App">
      <Routes>
          <Route path="/" element={<LoginPage/>}/>
          <Route path="/" element={<ProtectedRoute/>}>
              <Route path="/tasks" element={<TasksPage/>} />
          </Route>
          <Route path="/" element={<ProtectedRoute/>}>
              <Route path="/tasks/edit/:id" element={<EditTask/>} />
          </Route>
          <Route path="/" element={<ProtectedRoute/>}>
              <Route path="/tasks/add" element={<AddTask />} />
          </Route>
      </Routes>
    </div>
  );
}

export default App;

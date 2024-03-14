import React from 'react';
import "./style.css";
import Login from '../../components/Login/Login';
import { getCookie } from '../../services/helpers';
import { Navigate } from 'react-router-dom';

const LoginPage = () => {

  const token = getCookie("token");
  
  return token?(<Navigate to="/tasks" replace/>):(
    <div className='main-wrapper'>
        <div className='app-details'>
            <div className='app-details-inner'>
                
                <h1>To Do Application</h1>
                <img src="todo.png" alt="ToDoApp" /> 
                
            </div>
        </div>
        <div className='login-wrapper'>
            <Login/>
        </div>
    </div>
  )
}

export default LoginPage;
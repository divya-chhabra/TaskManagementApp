import React, { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import Button from '../../components/ui/Button';
import { handleLogout } from '../../services/api';
import { getCookie } from '../../services/helpers';

const Layout = ({children}:{children:ReactNode}) => {

  const user = getCookie("user");

  return (
    <div className='main'>
        
      <nav className='navigation'>
        <h3>Welcome, {user} </h3>
        
        <ul>
          <li>
            <Link to="/tasks" className='link'>All Tasks</Link>
          </li>
          <li>
            <Link to="/tasks/add" className='link'>Add New Task</Link>
          </li>
        </ul>

        <Button text="Logout" callback={()=>handleLogout()} cssclass="btn-logout" type="button"/>
      </nav>
      <div className='component'>
        {children}
        </div>
      </div>
  )
}

export default Layout

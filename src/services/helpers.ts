import { TaskInterface } from "./interface";

export const getTasks = () => {
    let tasks = localStorage.getItem('tasks');
    if(!tasks) return [];
    return JSON.parse(tasks);
}

export const addTask = ( data : TaskInterface ) => {
    let tasks = getTasks();
    try {
        data.id     = tasks.length + 1;
        data.status = 'pending';
        tasks.push(data);
        alert(JSON.stringify(data));
        localStorage.setItem('tasks', JSON.stringify(tasks));
        return true;
    } catch(e) {
        console.log(e);
        return false;
    }
}

export const getTask = (id : number) => {
    let tasks = getTasks();
    let task = tasks.find((task : TaskInterface)  => task.id === id);
    if(task !== undefined) return task;

    return false;
}

export const updateTask = (id : number, data: TaskInterface) => {
    let tasks     = getTasks();
    let taskIndex = tasks.findIndex((task : TaskInterface)  => task.id == id);

    if(taskIndex === -1) return false;
    data.id = tasks[taskIndex].id; 
    tasks[taskIndex] = data;
    localStorage.setItem('tasks', JSON.stringify(tasks));
    return true;
}

export const deleteTask = (id : number) => {
    let confirm = window.confirm("Are you sure you want to delete it?");
    if(confirm) {
        let tasks = getTasks().filter((task:TaskInterface) => task.id != id);
        localStorage.setItem('tasks', JSON.stringify(tasks)); // update
    }
}

export function setCookie(name:string, value:string, days:number) {
    const expires = new Date();
    expires.setTime(expires.getTime() + (days * 24 * 60 * 60 * 1000));
    const cookie = `${name}=${value};expires=${expires.toUTCString()};path=/`;
    document.cookie = cookie;
  }

export function getCookie(name:string) {
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      if (cookie.startsWith(name + '=')) {
        return cookie.substring(name.length + 1);
      }
    }
    return null;
  } 

export function deleteCookie(cookieName:string){
    
    document.cookie = cookieName + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    window.location.reload();
}
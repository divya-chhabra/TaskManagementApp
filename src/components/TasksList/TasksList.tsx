import { useEffect, useState } from "react";
import { TaskInterface } from "../../services/interface";
import TextInput from "../Form/TextInput";
import {
  useTaskContext,
} from "../../contexts/TaskContext/taskcontext";
import Task from "../Tasks/Task";

const TasksList = () => {
  
  const { tasks } = useTaskContext();

  const [filteredTasks, setFilteredTasks] = useState<TaskInterface[]>([]);

  const handleSearch = (value:string) => {
    setFilteredTasks(
        tasks.filter(
          (task: TaskInterface) =>
            task.title.toLowerCase().includes(value.toLowerCase()) ||
            (task.status &&
              task.status.toLowerCase().includes(value.toLowerCase()))
        )
      );
  }        

  useEffect(() => {
    setFilteredTasks(tasks);
  }, [tasks]);

  return (
    <div className="table-wrapper">
      {tasks.length ? (
        <>
          <div className="grid-3">
            <TextInput
              type="text"
              placeholder='Search by title or status'
              label="Search"
              callback={(value: string) => handleSearch(value)}
            />

            <div className="form-group">
              <label>Sort By:</label>
              <select
                onChange={(e: any) => {
                  if (!e.target.value) {
                    setFilteredTasks([...tasks]);
                    return;
                  }
                  setFilteredTasks([
                    ...filteredTasks.sort(
                      (a: any, b: any) => a[e.target.value].localeCompare(b[e.target.value])
                    ),
                  ]);
                }}
              >
                <option value="">Sort by</option>
                <option value="title">Title</option>
                <option value="due_date">Due Date</option>
                <option value="status">Status</option>
              </select>
            </div>
          </div>
          {filteredTasks.length ? (
            <table>
              <thead>
                <tr>
                  <th style={{width: '5rem'}}>S No.</th>
                  <th>Title</th>
                  <th>Description</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredTasks.map((task: TaskInterface, i) => (
                    <Task key={task.id}  task={task} index={i} />
                ))}
              </tbody>
            </table>
          ) : (
            <div>No result found based on your search</div>
          )}
        </>
      ) : (
        <div>No task found</div>
      )}
    </div>
  );
};

export default TasksList;

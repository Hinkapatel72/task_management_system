import React, {useState, useEffect} from "react";
import './Tasks.css';
import SearchTask from './SearchTask.svg';
import CreateTaskBtn from './CreateTaskBtn.svg';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { getToken } from '../Utils/Common';

const TaskTableSearch = () => {
    return (
        <div>
            <form className="row g-3">
            <div className="col-md-3">
                <select className="form-control Tms-input-field" id="taskdepartment">
                    <option selected>Department</option>
                    <option>Admissions</option>
                    <option>ISO</option>
                    <option>Registrar</option>
                    <option>Advising</option>
                </select>
            </div>
            <div className="col-md-3">
                <select className="form-control Tms-input-field" id="taskrole">
                    <option selected>Role</option>
                    <option>Admin</option>
                    <option>Regular</option>
                </select>
            </div>
            <div className="col-md-3">
                <select className="form-control Tms-input-field" id="taskprogram">
                    <option selected>Program</option>
                    <option>Computer</option>
                </select>
            </div>
            <div className="col-md-3">
                <button type="submit" className="btn task-search-apply create-task-text">Apply</button>
            </div>
            </form>
        </div>
    );
}

const TaskTable = () => {

    const [admintask, setAdminTasks] = useState([]);

    const getPriorityID = (task_priority) => {
        if (task_priority === 'LOW'){
            return 'low';
        } else if (task_priority === 'MEDIUM') {
            return 'meduim';
        } else if (task_priority === 'HIGH') {
            return 'high';
        } else if (task_priority === 'URGENT') {
            return 'urgent';
        }
        return task_priority;
    }

    let config = {
        headers : {
            'Authorization': 'Bearer ' + getToken()
        }
    }

    let reqBody = {
        id: 1
    }

    useEffect(() => {
        const url = axios.post('http://localhost:5000/api/v1/student-task-list', reqBody , config).then(res => {
                let resp = res.data;
                setAdminTasks(resp);
                return resp;
            })
            .then(setAdminTasks)
            .catch(console.error)
    }, []);

    return(
        <div>
            <table className="table table-hover">
                <thead>
                    <tr>
                    {/* <th scope="col">#</th> */}
                    <th scope="col">Task</th>
                    <th scope="col">Priority</th>
                    <th scope="col">Status</th>
                    </tr>
                </thead>
                <tbody>
                    {admintask?.map((task, index) => {
                        return <tr key={index}>
                                {/* <th scope="row">
                                    {task.department_id}
                                </th> */}
                                <td>
                                    {task.task_title}
                                </td>
                                <td>
                                    <span className="badge status_low rounded rectangle" id={getPriorityID(task.task_priority)} value={getPriorityID(task.task_priority)}>{task.task_priority}</span>
                                </td>
                                <td className="table-text-other">{task.task_state}</td>
                            </tr>
                    })}
                
                </tbody>
            </table>

            <br/>
            <div>
                <ul className="pagination pagination-sm justify-content-center">
                    <li className="page-item disabled">
                        <a className="page-link" href="#">&laquo;</a>
                    </li>
                    <li className="page-item active">
                        <a className="page-link pagination-text" href="#">1</a>
                    </li>
                    <li className="page-item">
                        <a className="page-link pagination-text" href="#">2</a>
                    </li>
                    <li className="page-item">
                        <a className="page-link pagination-text" href="#">3</a>
                    </li>
                    <li className="page-item">
                        <a className="page-link pagination-text" href="#">4</a>
                    </li>
                    <li className="page-item">
                        <a className="page-link pagination-text" href="#">5</a>
                    </li>
                    <li className="page-item">
                        <a className="page-link pagination-text" href="#">&raquo;</a>
                    </li>
                </ul>
            </div>
        </div>
    );
}

function Tasks(){
    const history = useHistory();
    const adminTask = () => history.push('/task');
    const adminTeams = () => history.push('/teams');

    return(
        <div className="container-fluid Tms-page-bg">
            <br/> <br />
            <div className="row">
                <div className="col col-md-7 offset-md-2">
                <a href="#" className="card-link text-decoration-none Tms-para4" onClick={adminTeams}> &lt; Go to teams</a>
                <div className="card student-task-detail">
                    <div className="card-body">
                        <div className="row">
                            <div className="col-md-6">
                                <h4 className="card-title Tms-h3">Tasks</h4>
                            </div>
                            <div className="col-md-2">
                            </div>
                            <div className="col-md-4">
                                <div className="btn-group">
                                    <button className="btn"><img src={SearchTask} alt="SearchTask" /></button>
                                    <button className="btn" onClick={adminTask} ><img src={CreateTaskBtn} alt="CreateTask" /></button>
                                    {/* <button className="btn btn-md create-task-btn create-task-text">Create a Task</button> */}
                                </div>
                            </div>
                        </div>
                        <br/> <br/> <br/>
                        <div className="row">
                            <div className="col-md-12">
                                <TaskTableSearch></TaskTableSearch>
                                <br/>
                                <TaskTable></TaskTable>
                            </div>
                        </div>
                    </div>
                </div>
                </div>
            </div>
        </div>
    );
}

export default Tasks;
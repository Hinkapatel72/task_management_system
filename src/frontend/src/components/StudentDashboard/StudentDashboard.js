import React, {useState, useEffect} from "react";
import './StudentDashboard.css';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { getToken } from '../Utils/Common';


const StudentTaskTable = () => {
    const [tasks, setTasks] = useState([]);

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
        id: 8
    }

    useEffect(() => {
        const url = axios.post('http://localhost:5000/api/v1/student-task-list', reqBody , config).then(res => {
                let resp = res.data;
                setTasks(resp);
                return resp;
            })
            .then(setTasks)
            .catch(console.error)
    }, []);


    return(
        <div>
            <table className="table table-hover">
                <thead>
                    <tr>
                    <th scope="col">Task</th>
                    <th scope="col">Priority</th>
                    <th scope="col">Status</th>
                    </tr>
                </thead>
                <tbody>
                    {tasks?.map((task, index) => {
                    return <tr key={index}>
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

function StudentDashboard(){
    const history = useHistory();
    const studentInquiry = () => history.push('/inquiry');
    return(
        <div className="container-fluid Tms-page-bg">
            <br/> <br />
            <div className="row">
                <div className="col col-md-7 offset-md-2">
                <div className="card student-task-detail">
                    <div className="card-body">
                        <div className="row">
                            <div className="col-md-4">
                                <h4 className="card-title Tms-h4">My Tasks</h4>
                            </div>
                            <div className="col-md-8">
                                <button type="submit" className="btn btn-md student-dashboard-create-btn Tms-btn-secondary" onClick={studentInquiry} >Create an Inquiry</button>
                            </div>
                        </div>
                        <br/> <br/> <br/>
                        <div className="row">
                            <div className="col-md-12">
                                <StudentTaskTable></StudentTaskTable>
                            </div>
                        </div>
                    </div>
                </div>
                </div>
            </div>
        </div>
    );
}

export default StudentDashboard;


import React, { Component, useState, useEffect } from "react";
import './StaffDashBoard.css';
import { Doughnut } from "react-chartjs-2";
import { MDBContainer } from "mdbreact";
import StaffCalendarimg from './StaffCalendar.svg';
import { useHistory } from 'react-router-dom';
import axios from "axios";
import { getToken } from '../Utils/Common';

class DepartmentOverview extends React.Component {
    state = {
      dataDoughnut: {
        labels: ["UNASSIGNED", "BACKLOG", "In PROGRESS", "CLOSED"],
        datasets: [
          {
            data: [16, 25, 51, 8],
            backgroundColor: ["#F7F5F5", "#ABF089", "#767676", "#FF8A00"],
            hoverBackgroundColor: [
              "#F7F5F5",
              "#ABF089",
              "#767676",
              "#FF8A00"
            ]
          }
        ]
      }
    }
    
    render() {
        return (
        <MDBContainer>
          <h4 className="Tms-h5">DEPARTMENT OVERVIEW</h4>
          <Doughnut data={this.state.dataDoughnut} options={{ responsive: true }} />
        </MDBContainer>
        );
      }
}

const StaffCalendar = () => {
    return (
        <div>
           <img src={StaffCalendarimg} alt="StaffCalendar" />
        </div>
    );
}

const StaffNewTask = () => {
    const history = useHistory();
    const taskHistory = () => history.push('/taskdetail');

    const [staffTasks, setStaffTasks] = useState([]);

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
        id: 9
    }

    useEffect(() => {
        const url = axios.post('http://localhost:5000/api/v1/student-task-list', reqBody , config).then(res => {
                let resp = res.data;
                setStaffTasks(resp);
                return resp;
            })
            .then(setStaffTasks)
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
                    <th scope="col">History</th>
                    </tr>
                </thead>
                <tbody>
                    {staffTasks?.map((task, index) => {
                        return <tr key={index}>
                                <td>
                                    {task.task_title}
                                </td>
                                <td>
                                    <span className="badge status_low rounded rectangle" id={getPriorityID(task.task_priority)} value={getPriorityID(task.task_priority)}>{task.task_priority}</span>
                                </td>
                                <td className="table-text-other">{task.task_state}</td>
                                <td><i className="fa fa-history" onClick={taskHistory}></i></td>
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
    const newTask = () => history.push('/task');
    const viewAll = () => history.push('/taskdetail');

    return(
        <div className="container-fluid Tms-page-bg">
            <br/> <br />
            <div className="row">
                <div className="col col-md-9 offset-md-2">
                    <h4 className="card-title Tms-h3">ISO Department</h4>
                    <br /> <br/>
                    <div className="row">
                        <div className="col-md-6">
                            <div className="card staff-department-overview">
                                <div className="card-body">
                                    <DepartmentOverview></DepartmentOverview>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="card staff-calender">
                                <div className="card-body">
                                    <StaffCalendar></StaffCalendar>
                                </div>
                            </div>
                        </div>
                    </div>
                    <br/>
                    <div className="row">
                        <div className="col-md-12">
                            <div className="card staff-recent-tasks">
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-md-6">
                                            <h4 className="card-title Tms-h5">Recently Updated Tasks</h4>
                                        </div>
                                        <div className="col-md-6">
                                            <button className="btn view-task-btn view-task-text " onClick={newTask}>New Task</button>
                                            {/* <button className="btn view-task-btn view-task-text " onClick={viewAll}>View All</button> */}
                                        </div>
                                    </div>
                                    <br/> <br/>
                                    <StaffNewTask></StaffNewTask>
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
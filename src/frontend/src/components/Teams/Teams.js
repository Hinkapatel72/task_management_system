import React, {useEffect, useState} from "react";
import "./Teams.css";
import EmailIcon from "./EmailIcon.svg";
import { useHistory } from 'react-router-dom';
import axios from "axios";
import { getToken } from '../Utils/Common';

const DepartmentList = () => {
    const history = useHistory();
    const addDepartment = () => history.push('/department');

    let config = {
        headers : {
            'Authorization': 'Bearer ' + getToken()
        }
    }
    
    let [departmentList, setDepartmentList] = useState([]);
    useEffect(() => {
        axios.get('http://localhost:5000/api/v1/department-list', config).then(response=>{
            let deptList = response.data;
            setDepartmentList(deptList); 
            console.log(departmentList);     
        });
    }, []);

  function getRandomInt(max) {
    return Math.floor(Math.random() * max);
 }
  const colorCodes = ["border-color-iso", "border-color-admisions", "border-color-reg", "border-color-advising",
                      "border-color-acc"]

    return(
        <div className="card-body">
            {departmentList?.map((department, index) => {
                return (
                <div className={"p-3 mb-3 bg-white rounded border-left-department-list " +  colorCodes[getRandomInt(colorCodes.length)]}>
                    <div className="text mb-2">
                <h6 className="Tms-h6">{department["department_name"]}</h6>
                        <small className="department-side-text float-right">{5 + getRandomInt(20)} USERS</small>
                    </div>
                </div>)})}
            <br/><br/>
            <div >
                <div>
                    <button type="submit" className="btn apply-search-btn apply-serach-text" onClick={() => addDepartment()}>Add Department</button>
                </div>
            </div>
        </div>
    );
}

const UserTabkeSearch = () => {
    const history = useHistory();
    const addUser = () => history.push('/user');
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
                <button type="submit" className="btn apply-search-btn apply-serach-text">Apply</button>
            </div>
            <br/><br/><br/>
            <div className="col-md-3">
                <button type="submit" className="btn apply-search-btn apply-serach-text" onClick={() => addUser()}>Add User</button>
            </div>
            </form>
        </div>
    );
}

const UserTable = () => {

    let config = {
        headers : {
            'Authorization': 'Bearer ' + getToken()
        }
    }
    
    let [userList, setUserList] = useState([]);
    useEffect(() => {
        axios.get('http://localhost:5000/api/v1/user-list', config).then(response=>{
            let userList = response.data;
            console.log(userList);
            setUserList(userList);    
        });
    }, []);
    return(
        <div>
            <table className="table table-hover">
                <thead>
                    <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Role</th>
                    <th scope="col">Student/Employee</th>
                    <th scope="col">Email</th>
                    </tr>
                </thead>
                <tbody>
                {userList?.map((user, index) => {
                return (
                    <tr key={"user" + index}>
                        <td className="Tms-h6"> {user["first_name"] + " " + user["last_name"]} </td>
                        <td className="Tms-para4"> {user["role"]} </td>
                        <td className="Tms-para4"> {user["user_type"]} </td>
                        <td> <img src={EmailIcon} alt="EmailIcon" /> </td>
                    </tr>
                )})}
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

function Teams(){
    const history = useHistory();
    const adminDashboard = () => history.push('/admintasks');
    return(
        <div className="container-fluid Tms-page-bg">
            <br/> <br />
            <a href="#" className="card-link text-decoration-none Tms-para4" onClick={adminDashboard}> &lt; Go to Dashboard</a>        
            <div className="row">
                <div className="col-md-3">
                <div className="card team-department-detail">
                        <div className="card-body">
                            <h4 className="card-title Tms-h3">Departments</h4>
                            <br/>
                            <DepartmentList></DepartmentList>
                        </div>
                    </div>
                </div>
                <div className="col-md-2"></div>
                <div className="col-md-7">
                    <div className="card team-users-detail">
                        <div className="card-body">
                            <h4 className="card-title Tms-h3">Users</h4>
                            <br />
                            <UserTabkeSearch></UserTabkeSearch>
                            <br /> <br />
                            <UserTable></UserTable>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Teams;
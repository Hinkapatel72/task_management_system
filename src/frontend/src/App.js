import React, { useState, useEffect } from 'react';
import { BrowserRouter, Switch, Route, NavLink } from 'react-router-dom';
import axios from 'axios';

import Navbar from "./components/Navbar/Navbar";
import Login from "./components/Login/Login";
import AddNewUser from "./components/AddNewUser/AddNewUser";
import CreateTaskStudent from "./components/CreateTask/CreateTaskStudent";
import CreateTaskFaculty from './components/CreateTask/CreateTaskFaculty';
import StudentDashboard from "./components/StudentDashboard/StudentDashboard";
import StaffDashBoard from "./components/StaffDashBoard/StaffDashBoard";
import Tasks from "./components/Tasks/Tasks";
import EditTask from "./components/EditTask/EditTask";
import TaskDetail from "./components/TaskDetail/TaskDetail";
import Teams from "./components/Teams/Teams";
import NewDepartment from './components/AddDepartment/AddDepartment';
import './App.css';

import { getToken, removeUserSession, setUserSession } from './components/Utils/Common';


function App() {

  useEffect(() => {
    const token = getToken();
    if (!token) {
      return;
    }
  }, []);
  
  return (
    <div>
      <BrowserRouter>
        <div>
            <Navbar></Navbar>
            {/* <NavLink exact activeClassName="active" to="/">Home</NavLink>
            <NavLink activeClassName="active" to="/login">Login</NavLink>
            <NavLink activeClassName="active" to="/dashboard">Dashboard</NavLink> */}
            <Switch>
              <Route exact path="/" component={Login} />
              <Route path="/user" component={AddNewUser} />
              <Route path="/inquiry" component={CreateTaskStudent} />
              <Route path="/task" component={CreateTaskFaculty} />
              <Route path="/student" component={StudentDashboard} />
              <Route path="/edittask" component={EditTask} />
              <Route path="/staff" component={StaffDashBoard} />
              <Route path="/admintasks" component={Tasks} />
              <Route path="/taskdetail" component={TaskDetail} />
              <Route path="/teams" component={Teams} />
              <Route path="/department" component={NewDepartment} />
            </Switch>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;

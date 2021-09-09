import React, {useState, useEffect} from "react";
import './AddNewUser.css';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { getToken } from '../Utils/Common';

function selectForm(sectionType) {
    let addFacultyBtn = document.getElementById("add-faculty-btn");
    let addStudentBtn = document.getElementById("add-student-btn");
    
    let addFacultyTab = document.getElementById("add-faculty-form");
    let addStudentTab = document.getElementById("add-student-form");

    console.log("changeState Called");
    let toAddBtn = addStudentBtn;
    let toAddTab = addStudentTab;
    let toRemoveBtn = addFacultyBtn;
    let toRemoveTab = addFacultyTab;

    if (sectionType == "FACULTY") {
        toAddBtn = addFacultyBtn;
        toAddTab = addFacultyTab;
        toRemoveBtn = addStudentBtn;
        toRemoveTab = addStudentTab;
    } else {
        
    }
    toAddBtn?.classList.add("active-tab");
    toAddTab?.classList.add("show");
    toAddTab?.classList.add("active");
     
    toRemoveBtn?.classList.remove("active-tab");
    toRemoveTab?.classList.remove("show");
    toRemoveTab?.classList.remove("active");

}

function AddNewUser(props) {
    const history = useHistory();
    const adminTeams= () => history.push('/teams');

    const staffEmail = useFormInput('');
    const staffPassword = useFormInput('');
    const staffFname = useFormInput('');
    const staffLname = useFormInput('');
    const staffId = useFormInput('');
    const staffRoleselection = useFormInput('');
    const staffDepartmentselection = useFormInput(1);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [options, setOptions] = useState(null);

    const studentEmail = useFormInput('');
    const studentPassword = useFormInput('');
    const studentId = useFormInput('');
    const studentFname = useFormInput('');
    const studentLname = useFormInput('');

    let config = {
        headers : {
            'Authorization': 'Bearer ' + getToken()
        }
    }

    useEffect(() => {
        axios.get('http://localhost:5000/api/v1/department-list', config).then(response=>{
        console.log(response);
        setOptions(response.data);      
    })
    }, []);



    const createNewStaff = () => {
        let config = {
            headers : {
                'Authorization': 'Bearer ' + getToken()
            }
        }

        console.log(config);
        let reqBody = { email: staffEmail.value,
                        password: staffPassword.value, 
                        first_name: staffFname.value, 
                        last_name: staffLname.value, 
                        role: 'REGULAR', 
                        user_type: 'EMPLOYEE',
                        student_id: -1,
                        employee_id: staffId.value,
                        department: staffDepartmentselection.value
                    }
        axios.post('http://localhost:5000/api/v1/register', reqBody, config).then(response => {
            setLoading(false);
            props.history.push('/teams');
        }).catch(error => {
            setLoading(false);
            if (error.response && error.response.status === 401) setError(error.response.data.message);
            else if (error.response && error.response.status === 500) setError(error.message);
            else setError("Something went wrong. Please try again later.");
        });
    }

    const createNewStudent = () => {
        let reqBody = { email: studentEmail.value,
                        password: studentPassword.value, 
                        first_name: studentFname.value, 
                        last_name: studentLname.value, 
                        role: 'REGULAR', 
                        user_type: 'STUDENT',
                        student_id: -1,
                        employee_id: studentId.value
        }
        axios.post('http://localhost:5000/api/v1/register', reqBody, config).then(response => {
            setLoading(false);
            props.history.push('/teams');
        }).catch(error => {
            setLoading(false);
            if (error.response && error.response.status === 401) setError(error.response.data.message);
            else if (error.response && error.response.status === 500) setError(error.message);
            else setError("Something went wrong. Please try again later.");
        });
    }

return (

    <div className="container-fluid Tms-page-bg">
        <br/>
        <br/>
        <br/>
        <a href="#" className="card-link text-decoration-none Tms-para4" onClick={adminTeams}> &lt; Back to Teams</a>  
        <div className="row justify-content-center text-center">
            <div className="col-md-6">
            <div className="card card-main-add-new-user">
                    <div className="card-body">
                        <br/>
                        <div className="card-title"> 
                            <h4 className="text-3 Tms-h4"> Assign a new user to allow access</h4> 
                        </div>
                        <br/>
                        <div className="card-title"> 
                        <div className="btn-group" role="group" aria-label="Basic example" role="tablist">
                            <button type="button" onClick={() => selectForm("FACULTY")} id="add-faculty-btn"  className="btn form-button active-tab" data-bs-toggle="tab" data-bs-target="#add-faculty-form">STAFF</button>
                            <button type="button" onClick={() => selectForm("STUDENT")} id="add-student-btn" className="btn form-button" data-bs-toggle="tab" data-bs-target="#add-student-form">STUDENT</button>
                        </div>

                        <br/>
                        <br/>
                        <br/>
                        <div className="tab-content">
                            <div className="tab-pane fade show active" id="add-faculty-form" aria-labelledby="add-faculty-btn" role="tabpanel">
                                <div className="row">
                                        <div className="col-md-11 offset-md-1">
                                            <form>
                                                <div className="form-group">
                                                    <input 
                                                        {...staffEmail}
                                                        type="email" 
                                                        className="form-control Tms-input-field" 
                                                        id="staffEmail" 
                                                        placeholder="ITU Email Address"
                                                    />
                                                </div>
                                                <div className="form-group">
                                                    <input 
                                                        {...staffPassword}
                                                        type="password" 
                                                        className="form-control Tms-input-field" 
                                                        id="staffPassword" 
                                                        placeholder="Password"
                                                    />
                                                </div>
                                                <div className="form-group">
                                                    <input 
                                                        {...staffFname}
                                                        className="form-control Tms-input-field" 
                                                        id="staffFname" 
                                                        placeholder="First Name"  
                                                    />
                                                </div>
                                                <div className="form-group">
                                                    <input 
                                                        {...staffLname}
                                                        className="form-control Tms-input-field" 
                                                        id="staffLname" 
                                                        placeholder="Last Name"  
                                                    />
                                                </div>
                                                <div className="form-group">
                                                    <input 
                                                        {...staffId}
                                                        className="form-control Tms-input-field" 
                                                        id="staffId" 
                                                        placeholder="Employee id"  
                                                    />
                                                </div>
                                                {/* <div className="form-group">
                                                    <select {...staffRoleselection} className="form-control Tms-input-field" id="staffRoleselection">
                                                        <option>Role</option>
                                                        <option>Student</option>
                                                        <option>Employee</option>
                                                        <option>Admin</option>
                                                        <option>Intern</option>
                                                    </select>
                                                </div> */}
                                                                                                
                                                <div className="form-group">
                                                    <select {...staffDepartmentselection} className="form-control Tms-input-field" id="staffDepartmentselection" >
                                                        {/* <option>Department</option>
                                                        <option>Admissions</option>
                                                        <option>ISO</option>
                                                        <option>Registrar</option>
                                                        <option>Advising</option>
                                                        <option>Accounting</option> */}
                                                        {options?.map(({ id, department_name }, index) => <option value={id} >{department_name}</option>)}
                                                    </select>
                                                </div>
                                                <div className="form-check text-left">
                                                    <input className="form-check-input" type="checkbox" id="emailupdate" />
                                                    <label className="form-check-label" htmlFor="demailupdatecheck">Send email updates to the new user</label>
                                                </div>
                                                <div className="form-check text-left">
                                                    <input className="form-check-input" type="checkbox" id="temppasswordgenerate" />
                                                    <label className="form-check-label" htmlFor="temppasswordcheck">Generate a temporary password for the new user</label>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                {error && <><small style={{ color: 'red' }}>{error}</small><br /></>}<br />
                                <br /> <br />
                                <div className="row">
                                    <div className="col-md-12 offset-md-3">
                                        <button type="submit" className="btn btn-md Tms-btn-primary" onClick={createNewStaff}>Add New User</button>
                                    </div>
                                </div>
                            </div>
                            <div className="tab-pane fade" id="add-student-form" aria-labelledby="add-student-btn" role="tabpanel">
                                <div className="row">
                                        <div className="col-md-11 offset-md-1">
                                            <form>
                                                <div className="form-group">
                                                    <input 
                                                        {...studentEmail}
                                                        type="email" 
                                                        className="form-control Tms-input-field" 
                                                        id="studentEmail" 
                                                        placeholder="ITU Email Address" 
                                                    />
                                                </div>
                                                <div className="form-group">
                                                    <input 
                                                        {...studentPassword}
                                                        type="password" 
                                                        className="form-control Tms-input-field" 
                                                        id="studentPassword" 
                                                        placeholder="Password" 
                                                    />
                                                </div>
                                                <div className="form-group">
                                                    <input 
                                                        {...studentFname}
                                                        className="form-control Tms-input-field" 
                                                        id="studentFname" 
                                                        placeholder="First Name" 
                                                    />
                                                </div>
                                                <div className="form-group">
                                                    <input 
                                                        {...studentLname}
                                                        className="form-control Tms-input-field" 
                                                        id="studentLname" 
                                                        placeholder="Last Name" 
                                                    />
                                                </div>
                                                <div className="form-group">
                                                    <input 
                                                        {...studentId}
                                                        className="form-control Tms-input-field" 
                                                        id="studentId" 
                                                        placeholder="Student id"  
                                                    />
                                                </div>
                                                <div className="form-check text-left">
                                                    <input className="form-check-input" type="checkbox" value="" id="emailupdate" />
                                                    <label className="form-check-label" htmlFor="demailupdatecheck">Send email updates to the new user</label>
                                                </div>
                                                <div className="form-check text-left">
                                                    <input className="form-check-input" type="checkbox" value="" id="temppasswordgenerate" />
                                                    <label className="form-check-label" htmlFor="temppasswordcheck">Generate a temporary password for the new user</label>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                {error && <><small style={{ color: 'red' }}>{error}</small><br /></>}<br />
                                <br /> <br />
                                <div className="row">
                                    <div className="col-md-12 offset-md-3">
                                        <button type="submit" className="btn btn-md Tms-btn-primary" onClick={createNewStudent}>Add New User</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>         
                    </div>
                </div>
            </div>
        </div>
    
    <br/>
    <br/>
    <br/>
    <br/>
</div>
)
}

const useFormInput = initialValue => {
    const [value, setValue] = useState(initialValue);
   
    const handleChange = e => {
      setValue(e.target.value);
    }
    return {
      value,
      onChange: handleChange
    }
  }

export default AddNewUser;
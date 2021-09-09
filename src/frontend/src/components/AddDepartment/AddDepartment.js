import React, {useEffect, useState} from "react";
import './AddDepartment.css';
import EmailIcon from '../Teams/EmailIcon.svg';
import { useHistory } from 'react-router-dom';
import axios from "axios";
import { getToken } from '../Utils/Common';

const DepartmentForm = (props) => {
    
    const deptName = useFormInput('');
    const deptItuEmail = useFormInput('');
    const deptDescription = useFormInput(''); 

    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const history = useHistory();
    const adminTeams= () => history.push('/teams');

    let config = {
        headers : {
            'Authorization': 'Bearer ' + getToken()
        }
    }

    const createNewDepartment = () => {
        let reqBody = { 
            department_name: deptName.value,
            department_email: deptItuEmail.value,
            department_description: deptDescription.value
        }
        //event.preventDefault();
        axios.post('http://localhost:5000/api/v1/create-department', reqBody, config).then(response => {
            setLoading(false);
            adminTeams();
        }).catch(error => {
            setLoading(false);
            if (error.response && error.response.status === 401) setError(error.response.data.message);
            else if (error.response && error.response.status === 500) setError(error.message);
            else setError("Something went wrong. Please try again later.");
        });
    }

    return (
        <div>
            <form>
                <fieldset>
                <div className="form-group">
                    <label className="form-label mt-4 form-title-green">DEPARTMENT NAME</label>
                    <input 
                        {...deptName}
                        type="text" 
                        className="form-control Tms-input-field" 
                        id="deptName" 
                        placeholder="Type Something" 
                    />
                </div>
                <div className="form-group">
                    <label className="form-label mt-4 form-title-green">ITU EMAIL ADDRESS</label>
                    <input 
                        {...deptItuEmail}
                        type="email" 
                        className="form-control Tms-input-field" 
                        id="deptItuEmail" 
                        aria-describedby="emailHelp" 
                        placeholder="Type Something" 
                    />
                </div>
                <div className="form-group">
                    <label className="form-label mt-4 form-title-green">DESCRIPTION</label>
                    <textarea 
                        {...deptDescription}
                        className="form-control Tms-input-field" 
                        id="deptDescription" 
                        rows="9" 
                        placeholder="Type Something" >
                    </textarea>
                </div>
                {/* {error && <><small style={{ color: 'red' }}>{error}</small><br /></>}<br /> */}
                <br />
                </fieldset>
            </form>
            <button className="btn btn-md green-btn add-btn-text" onClick={createNewDepartment}> Submit </button>
            <button className="btn btn-md grey-btn add-btn-text"> Save a Draft </button>
        <br /><br/><br />
        </div>
    );
}

const SearchDepartment = () => {
    return (
        <div>
            <form>
                <fieldset>
                <div className="form-group row">
                <label className="form-label mt-4 form-title-green">ASSIGN STAFF</label>
                    <div className="col-md-2"></div>
                    <div className="col-md-5">
                        <input className="form-control Tms-input-field search-field" type="text" placeholder="Search staff" aria-label="Search" /> 
                    </div>
                    <div className="col-md-3">
                       <button className="btn green-btn add-btn-text"> ADD </button>
                    </div>
                </div>
                </fieldset>
            </form>
        </div>
    );
}

const DepartmentTable = () => {

    return (
        <div>
            <table className="table table-hover">
                <tbody>
                    <tr>
                        <td className="Tms-h6"> Alex Kim </td>
                        <td className="Tms-para4"> Staff </td>
                        <td className="Tms-para4"> ISO </td>
                        <td> <img src={EmailIcon} alt="EmailIcon" /> </td>
                    </tr>
                    <tr>
                        <td className="Tms-h6"> Dave Lo </td>
                        <td className="Tms-para4"> Staff </td>
                        <td className="Tms-para4"> Admissions </td>
                        <td> <img src={EmailIcon} alt="EmailIcon" /> </td>
                    </tr>
                    <tr>
                        <td className="Tms-h6"> David Schaefer </td>
                        <td className="Tms-para4"> Student </td>
                        <td className="Tms-para4"> Student </td>
                        <td> <img src={EmailIcon} alt="EmailIcon" /> </td>
                    </tr>
                    <tr>
                        <td className="Tms-h6"> Steve Wang </td>
                        <td className="Tms-para4"> Admin </td>
                        <td className="Tms-para4"> Registrar </td>
                        <td> <img src={EmailIcon} alt="EmailIcon" /> </td>
                    </tr>
                    <tr>
                        <td className="Tms-h6"> Lorraine Pakravan </td>
                        <td className="Tms-para4"> Student </td>
                        <td className="Tms-para4"> Student </td>
                        <td> <img src={EmailIcon} alt="EmailIcon" /> </td>
                    </tr>
                    <tr>
                        <td className="Tms-h6"> Daniel Kim </td>
                        <td className="Tms-para4"> Staff </td>
                        <td className="Tms-para4"> Advising </td>
                        <td> <img src={EmailIcon} alt="EmailIcon" /> </td>
                    </tr>
                    <tr>
                        <td className="Tms-h6"> Alex Stone </td>
                        <td className="Tms-para4"> Student </td>
                        <td className="Tms-para4"> Student </td>
                        <td> <img src={EmailIcon} alt="EmailIcon" /> </td>
                    </tr>
                    <tr>
                        <td className="Tms-h6"> Henry Watson </td>
                        <td className="Tms-para4"> Staff </td>
                        <td className="Tms-para4"> Accounting </td>
                        <td> <img src={EmailIcon} alt="EmailIcon" /> </td>
                    </tr>
                </tbody>
            </table>

            <br/>
        </div>
    );
}

function AddDepartment() {
    const history = useHistory();
    const adminTeams= () => history.push('/teams');

    return (
        <div className="container-fluid Tms-page-bg">
            <br/><br/><br/>
            <div className="row">
                <div className="col col-md-7 offset-md-2">
                    <a href="#" className="card-link text-decoration-none Tms-para4" onClick={adminTeams}> &lt; Back to Teams</a>
                    <div className="card department-detail">
                        <div className="card-body">
                            <h4 className="card-title Tms-h4">Create a Department</h4>
                            <br />
                            <DepartmentForm></DepartmentForm>
                            <br />
                            <SearchDepartment></SearchDepartment>
                            <br />
                            <DepartmentTable></DepartmentTable>
                        </div>
                    </div>
                </div>
            </div>
            <br/><br/><br/>
            
        </div>
    );
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

export default AddDepartment;
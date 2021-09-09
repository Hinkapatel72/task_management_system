import React, {useRef, useState, useEffect} from "react";
import { FileDrop } from 'react-file-drop';
import './CreateTaskBase.css';
import axios from 'axios';
import {Button, Modal} from "react-bootstrap";
import { useHistory } from 'react-router-dom';
import ituCongrats from './Congrats.svg';
import { getToken } from '../Utils/Common';
//https://www.npmjs.com/package/react-file-drop

const NewTaskForm = () => {
    const history = useHistory();
    const staffDashboard = () => history.push('/staff');

    const [draftState, setDraftState] = useState(false);

    const [submitState, setSubmitState] = useState(false);

    const fileInputRef = useRef(null);

    const onFileInputChange = (event) => {
        const { files } = event.target;
        console.log(files);
    }

    const onTargetClick = () => {
        fileInputRef.current.click()
    }

    const taskTitle = useFormInput('');
    const departmentSelection = useFormInput('');
    const taskDescription = useFormInput('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [options, setOptions] = useState(null);

    let config = {
        headers : {
            'Authorization': 'Bearer ' + getToken()
        }
    }

    useEffect(() => {
        axios.get('http://localhost:5000/api/v1/department-list', config).then(response=>{
        setOptions(response.data);      
    })
    }, []);

    const createTask = () => {
        let config = {
            headers : {
                'Authorization': 'Bearer ' + getToken()
            }
        }

        const reqBody = {
                            title: taskTitle.value,
                            department: "ADMISSIONS",
                            description :taskDescription.value,
                            taskType: "QUESTION",
                            task_state: "ASSIGNED",
                            task_priority: "MEDIUM",
                            studentId: 98736 //98736-Staff, 12345-Admin
                        }

        axios.post('http://localhost:5000/api/v1/create-task-student', reqBody, config).then(response => {
            setLoading(false);
            setSubmitState(!submitState);
        }).catch(error => {
            setLoading(false);
            if (error.response && error.response.status === 401) setError(error.response.data.message);
            else if (error.response && error.response.status === 500) setError(error.message);
            else setError("Something went wrong. Please try again later.");
        });
    }

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col col-md-8">
                    <form>
                        <fieldset>
                            <div className="form-group">
                                <label htmlFor="newtask-title" className="form-label mt-4 Tms-input-label">TITLE</label>
                                <input 
                                    {...taskTitle}
                                    type="text" 
                                    className="form-control Tms-input-field Tms-imput-field-text" 
                                    id="newtask-title" 
                                    placeholder="Type something"
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="inquiry-title" className="form-label mt-4 Tms-input-label">DEPARTMENT</label>
                                <select {...departmentSelection} className="form-control Tms-input-field" id="departmentSelection">
                                {options?.map(({ id, department_name }, index) => <option value={id} >{department_name}</option>)}
                            </select>
                            </div>

                            <div className="form-group">
                                <label htmlFor="newtask-description" className="form-label mt-4 Tms-input-label">DESCRIPTION</label>
                                <textarea 
                                    {...taskDescription}
                                    className="form-control Tms-input-field Tms-imput-field-text" 
                                    id="newtask-description" 
                                    placeholder="Type something" 
                                    rows="10"
                                />
                            </div>
                            
                            <div className="form-group">
                                <label htmlFor="newtask-attachment" className="form-label mt-4 Tms-input-label">ATTACHMENT</label>
                                    <div className="card">
                                        <div className="card-body">
                                        <div className="dropzone-wrapper">
                                            <div className="dropzone-desc">
                                            <div>
                                                <i className="glyphicon glyphicon-download-alt"></i>
                                                <label className="label" for="fileElem">Drag and drop files here OR </label>
                                            </div>
                                            <label className="btn btn-md Tms-btn-primary">
                                                Browse <input type="file" multiple hidden />
                                            </label>
                                            </div>
                                        </div>
                                        </div>
                                        <div className="card-body">
                                            <p className="Tms-para3" style={{color: "#767676"}}>Uploaded Files</p>
                                            <h4 className="small font-weight-bold">New Student Orientation.docx<span className="float-right"></span></h4>
                                            <div className="progress mb-4">
                                                <div className="progress-bar green" role="progressbar" style={{width: "100%"}} aria-valuenow="50" aria-valuemin="0" aria-valuemax="100"></div>
                                            </div>
                                            <h4 className="small font-weight-bold">New Student Orientation.docx<span className="float-right"></span></h4>
                                            <div className="progress mb-4">
                                                <div className="progress-bar green" role="progressbar" style={{width: "100%"}} aria-valuenow="100" aria-valuemin="0" aria-valuemax="100"></div>
                                            </div>
                                        </div>
                                    </div>
                            </div>
                        </fieldset>
                    </form>
                </div>
                
                <div className="col col-md-4">
                    <form>
                        <fieldset>
                            <div className="form-group w-100">
                                <label htmlFor="newtask-title" className="form-label mt-4 Tms-input-label w-100">
                                    <div className="row">
                                        <div className="col col-md-8">Assign</div>
                                        <div className="col col-md-4">
                                            <button className="btn btn-sm Tms-btn-rounded Tms-btn-secondary btn-circle-btn-sm" style={{fontSize: "0.8rem"}}> + </button> 
                                        </div>
                                    </div>
                                    
                                 </label>            
                                 <div className="row">
                                    <p className="col col-md-12" style={{color: "#333333"}}> No one</p>
                                </div>
                            </div>

                            <div className="form-group w-100">
                                <label htmlFor="newtask-title" className="form-label mt-4 Tms-input-label w-100">
                                    <div className="row">
                                        <div className="col col-md-8">TYPE</div>
                                        <div className="col col-md-4">
                                            <button className="btn btn-sm Tms-btn-rounded Tms-btn-secondary btn-circle-btn-sm" style={{fontSize: "0.8rem"}}> + </button> 
                                        </div>
                                    </div>
                                    
                                 </label>            
                                 {/* <div className="row">
                                    <p className="col col-md-12" style={{color: "#333333"}}> No department</p>
                                </div> */}
                            </div>

                            <div className="form-group w-100">
                                <label htmlFor="newtask-title" className="form-label mt-4 Tms-input-label w-100">
                                    <div className="row">
                                        <div className="col col-md-8">TASK PRIORITY</div>
                                        
                                    </div>
                                    
                                 </label>            
                                 <div className="row">
                                 
                                    <select class="col col-md-8 form-select" size="4">
                                        <option className="status_low rounded rectangle" id="low" value="Low">Low</option>
                                        <option className="status_low rounded rectangle" id="meduim" value="Medium">Medium</option>
                                        <option className="status_low rounded text rectangle" id="high" value="High">High</option>
                                        <option className="status_low rounded border border-dark text rectangle" id="urgent" value="Urgent">Urgent</option>
                                    </select>
                                </div>
                            </div>

                            <div className="form-group w-100">
                                <label htmlFor="newtask-title" className="form-label mt-4 Tms-input-label w-100">
                                    <div className="row">
                                        <div className="col col-md-8">ATTACHMENT</div>
                                        <div className="col col-md-4">
                                            <button className="btn btn-sm Tms-btn-rounded Tms-btn-secondary btn-circle-btn-sm" style={{fontSize: "0.8rem"}}> + </button> 
                                        </div>
                                    </div>
                                    
                                 </label>            
                                 <div className="row">
                                    <p className="col col-md-12" style={{color: "#333333"}}> No attachment yet</p>
                                </div>
                            </div>
                            
                        </fieldset>
                    </form>
                </div>
            </div>
            <br/><br/><br/><br/>
            <div className="row">
                <div className="col col-md-12">
                    <div className="form-group">
                    <Button className="btn btn-md Tms-btn-primary inquiry-submit-btn trigger" onClick={() => createTask()}> Submit </Button>
                    <Modal dialogClassName="my-modal" show={submitState}>
                        <Modal.Body className="justify-content-center">
                            <br/><br/>
                            <img src={ituCongrats} alt="ituCongrats" className="img-center"/>
                            <br />
                            <p className="Tms-h3" style={{textAlign: "center"}}> Congrats! </p>
                            <p className="Tms-para3 text-center">You have successfully submitted an inquiry.</p>
                        </Modal.Body>
                        <Modal.Footer className="custom-modal-footer">
                            <div class="align-self-center mx-auto">
                                <Button className="btn btn-md Tms-btn-primary" onClick={() => staffDashboard()} >Go to Dashboard</Button>
                            </div>
                        </Modal.Footer>
                        <br/><br/>
                    </Modal>
                    <Button className="btn btn-md inquiry-submit-btn Tms-btn-secondary trigger" onClick={() => setDraftState(!draftState)}> Save a Draft </Button>
                    <Modal dialogClassName="my-modal" show={draftState}>
                        <Modal.Body className="justify-content-center">
                            <br/><br/>
                            <p className="Tms-para3 text-center">You have not submitted your inquiry yet.</p>
                            <p className="Tms-para3 text-center">Do you want to save a draft?</p>
                        </Modal.Body>
                        <Modal.Footer className="custom-modal-footer">
                        <Button className="btn btn-md inquiry-submit-btn Tms-btn-secondary trigger" onClick={() => setDraftState(false)}>Exit Anyway</Button>
                        <Button className="btn btn-md Tms-btn-primary inquiry-submit-btn trigger" onClick={() => setDraftState(false)}>Save a Draft</Button>
                        </Modal.Footer>
                        <br/><br/>
                    </Modal>
                </div>
                </div>
                
            </div>
            
        </div>
    );
                        
}


function CreateTaskFaculty() {
    const history = useHistory();
    const staffDashboard = () => history.push('/staff');

    return (
        <div className="container-fluid Tms-page-bg">
            <br/><br/><br/>
            <div className="row">
                <div className="col col-md-6 offset-md-3">
                    <a href="#" className="card-link text-decoration-none Tms-para4" onClick={staffDashboard}> &lt; Back to Listings</a>
                    <div className="card newtask-form">
                        <div className="card-body">
                            <h4 className="card-title Tms-h4">Create a New Task</h4>
                            <NewTaskForm></NewTaskForm>
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

export default CreateTaskFaculty;
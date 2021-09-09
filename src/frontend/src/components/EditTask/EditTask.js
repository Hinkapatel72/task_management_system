import React, {useRef} from "react";
import './EditTask.css';

function EditTaskForm() {
    const fileInputRef = useRef(null);

    const onFileInputChange = (event) => {
        const { files } = event.target;
        console.log(files);
        // do something with your files...
    }

    const onTargetClick = () => {
        fileInputRef.current.click()
    }
    
    return(
        <div className="container-fluid">
            <div className="row">
                <div className="col col-md-8">
                    <form>
                        <fieldset>
                            <div className="form-group">
                                <label htmlFor="newtask-title" className="form-label mt-4 Tms-input-label">TITLE</label>
                                <input type="text" className="form-control Tms-input-field Tms-imput-field-text" id="newtask-title" placeholder="Type something"/>
                            </div>

                            <div className="form-group">
                                <label htmlFor="inquiry-title" className="form-label mt-4 Tms-input-label">TYPE</label>
                                <select className="form-control Tms-input-field" id="departmentselection">
                                    <option>Select</option>
                                    <option>Question</option>
                                    <option>Incident</option>
                                    <option>Problem</option>
                                    <option>Feature Request</option>
                                    <option>Refund</option>
                                </select>
                            </div>

                            <div className="form-group">
                                <label htmlFor="newtask-description" className="form-label mt-4 Tms-input-label">DESCRIPTION</label>
                                <textarea className="form-control Tms-input-field Tms-imput-field-text" id="newtask-description" placeholder="Type something" rows="10"/>
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
                                                <div className="progress-bar green" role="progressbar" style={{width: "50%"}} aria-valuenow="50" aria-valuemin="0" aria-valuemax="100"></div>
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
                                        <div className="col col-md-8">ASIGNEE</div>
                                        <div className="col col-md-4">
                                            <button className="btn btn-sm Tms-btn-rounded Tms-btn-secondary btn-circle-btn-sm" style={{fontSize: "0.8rem"}}> + </button> 
                                        </div>
                                    </div>
                                    
                                 </label>            
                                 <div className="row">
                                    <p className="col col-md-12"> No one</p>
                                </div>
                            </div>

                            <div className="form-group w-100">
                                <label htmlFor="newtask-title" className="form-label mt-4 Tms-input-label w-100">
                                    <div className="row">
                                        <div className="col col-md-8">DEPARTMENT</div>
                                        <div className="col col-md-4">
                                            <button className="btn btn-sm Tms-btn-rounded Tms-btn-secondary btn-circle-btn-sm" style={{fontSize: "0.8rem"}}> + </button> 
                                        </div>
                                    </div>
                                    
                                 </label>            
                                 <div className="row">
                                    <p className="col col-md-12"> No department</p>
                                </div>
                            </div>

                            <div className="form-group w-100">
                                <label htmlFor="newtask-title" className="form-label mt-4 Tms-input-label w-100">
                                    <div className="row">
                                        <div className="col col-md-8">TASK PRIORITY</div>
                                        
                                    </div>
                                    
                                 </label>            
                                 <div className="row">
                                 
                                    <select className="col col-md-8 form-select" size="4">
                                        <option className="status_low rounded rectangle" id="low" value="Low">Low</option>
                                        <option className="status_low rounded rectangle" id="meduim" value="Medium">Medium</option>
                                        <option className="status_low rounded text rectangle" id="high" value="High">High</option>
                                        <option className="status_low rounded border border-dark text rectangle" id="urgent" value="Urgent">Urgent</option>
                                    </select>
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
                        <button type="submit" className="btn btn-md Tms-btn-primary newtask-submit-btn">Submit</button>
                        <button type="submit" className="btn btn-md newtask-submit-btn Tms-btn-secondary">Save a Draft</button>
                    </div>
                </div>
                
            </div>
            
        </div>
    );
}

function EditTask() {

    return (
        <div className="container-fluid Tms-page-bg">
            <br/><br/><br/>
            <div className="row">
                <div className="col col-md-6 offset-md-3">
                    <a href="#" className="card-link text-decoration-none Tms-para4"> &lt; Back to Listings</a>
                    <div className="card newtask-form">
                        <div className="card-body">
                            <h4 className="card-title Tms-h4">Edit Task</h4>
                            <EditTaskForm></EditTaskForm>
                        </div>
                    </div>
                </div>
            </div>
            <br/><br/><br/>
            
        </div>
    );
}

export default EditTask;
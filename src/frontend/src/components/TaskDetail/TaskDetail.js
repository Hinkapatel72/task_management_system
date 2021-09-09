import React from 'react';
import './TaskDetail.css';
import taskElements from './TaskHistory';
import { VerticalTimeline, VerticalTimelineElement }  from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import { useHistory } from 'react-router-dom';

const TaskInfo = () => {
    return(
        <div className="d-flex flex-column taskdetail-form">
            <div className="p-2">
                <p className="card-title taskdetail-title">STATUS</p>
                <p className="card-subtitle mb-2 taskdetail-subtitle">Assigned</p>
            </div> <br />
            <div className="p-2">
                <p className="card-title taskdetail-title ">DEPARTMENT</p>
                <span className="card-subtitle mb-2 taskdetail-subtitle">
                    Finance <span class="badge finance-box"> </span>
                </span>
                <br />
                <span className="card-subtitle mb-2 taskdetail-subtitle">
                        ISO <span class="badge iso-box"> </span>
                </span>
                <br />
            </div> <br />
            <div className="p-2">
                <p className="card-title taskdetail-title ">ASSIGNEE</p>
                <p className="card-subtitle mb-2 taskdetail-subtitle">John Kim</p>
            </div> <br />
            <div className="p-2">
                <p className="card-title taskdetail-title ">ATTACHMENTS</p>
                <p className="card-text mb-2 taskdetail-subtitle"><small className="text-muted">Student_profile.jpg</small></p>
                <p className="card-text mb-2 taskdetail-subtitle text-muted"><small className="text-muted">Student_profile.jpg</small></p>
            </div>
        </div> 
    );
}

const TaskHistory = () => {
    return (
        <div>
            <VerticalTimeline
                layout="1-column-left">
                <VerticalTimelineElement
                    className="vertical-timeline-element--work"
                    contentArrowStyle={{ visibility: 'hidden'}}
                    date="08/15/2021"
                    iconStyle={{ background: '#334c60', color: '#fff'}}
                    icon={<div className="icon-text-center">HP</div>}
                >
                    <h3 className="vertical-timeline-element-title"> <span className="task-title-name-text"> Hinka Patel </span> created the task</h3>
                    <br/>
                    <h4 className="vertical-timeline-element-subtitle">Overview</h4>
                    <p className="task-history-para-text">
                        I have applied for the OPT last week. I have not received any response yet. I would like to do a follow-up on the same as I need to apply for the OPT as soon as possible. Let me know if there are any documents are missing from the application. 
                    </p>
                </VerticalTimelineElement>

                <VerticalTimelineElement
                    className="vertical-timeline-element--work"
                    contentArrowStyle={{ visibility: 'hidden'}}
                    date="08/15/2021"
                    iconStyle={{ background: '#334c60', color: '#fff'}}
                    icon={<div className="icon-text-center">HP</div>}
                >
                    <h3 className="vertical-timeline-element-title"> <span className="task-title-name-text"> Hinka Patel </span> commented on the task</h3>
                    <br/>
                    <p className="task-history-para-text">
                        I also wanted to ask one more question related to OPT. I have few questions related to the process as I am new to it. It would be great if anyone from the ISO team could connect with me and help me out. I am available anytime after 4 pm. Let me know if anything else is needed.
                    </p>
                </VerticalTimelineElement>

                <VerticalTimelineElement
                    className="vertical-timeline-element--work"
                    contentArrowStyle={{ visibility: 'hidden'}}
                    date="08/15/2021"
                    iconStyle={{ background: '#FF7E36', color: '#fff'}}
                    icon={<div className="icon-text-center">FJ</div>}
                >
                    <h3 className="vertical-timeline-element-title"> <span className="task-title-name-text"> Farhat Jahan </span> commented on the task</h3>
                    <br/>
                    <p className="task-history-para-text">
                        Thank you Hinka for uploading your documents and provide us all documents as needed. We are still reviewing the documents and waiting for few more documents from the Advisor such as Pre graduation checklist. We will keep update you here and if there is anything else we will let you know. In order to answer your questions related to OPT, you can book an available slot from the calendar, We will be happy to answer those questions.
                    </p>
                </VerticalTimelineElement>

                <VerticalTimelineElement
                    className="vertical-timeline-element--work"
                    contentArrowStyle={{ visibility: 'hidden'}}
                    date="08/15/2021"
                    iconStyle={{ background: '#A5A6F6', color: '#fff'}}
                    icon={<div className="icon-text-center">EN</div>}
                >
                    <h3 className="vertical-timeline-element-title"> <span className="task-title-name-text"> Erwin Nieva </span> added two attachments</h3>
                    <br/>
                </VerticalTimelineElement>

                <VerticalTimelineElement
                    className="vertical-timeline-element--work"
                    contentArrowStyle={{ visibility: 'hidden'}}
                    date="08/16/2021"
                    iconStyle={{ background: '#FFB4B4', color: '#fff'}}
                    icon={<div className="icon-text-center">AK</div>}
                >
                    <h3 className="vertical-timeline-element-title"> <span className="task-title-name-text"> Alex Kim </span> changed the project status to <strong> ASSIGNED </strong> </h3>
                    <br/>
                </VerticalTimelineElement>

                <VerticalTimelineElement
                    className="vertical-timeline-element--work"
                    contentArrowStyle={{ visibility: 'hidden'}}
                    date="08/17/2021"
                    iconStyle={{ background: '#334c60', color: '#fff'}}
                    icon={<div className="icon-text-center">HP</div>}
                >
                    <h3 className="vertical-timeline-element-title"> <span className="task-title-name-text"> Hinka Patel </span> changed the priority from HIGH to <strong> URGENT </strong> </h3>
                    <br/>
                </VerticalTimelineElement>

                <VerticalTimelineElement
                    className="vertical-timeline-element--work"
                    contentArrowStyle={{ visibility: 'hidden'}}
                    iconStyle={{ background: '#00A3FF', color: '#fff'}}
                    icon={<div className="icon-text-center">CJ</div>}
                >
                    <h3 className="vertical-timeline-element-title"> <strong> Cherri Jeong </strong> </h3>
                    <br/>
                    <textarea 
                        className="form-control Tms-input-field Tms-imput-field-text" 
                        id="comment" 
                        placeholder="Leave a Comment" 
                        rows="5" cols="65"
                    />
                    <br/>
                    <button className="btn btn-md comment-btn Tms-btn-secondary "> Comment </button>
                </VerticalTimelineElement>
            </VerticalTimeline>
        </div>
    );
}


function TaskDetail() {
    const history = useHistory();
    const staffDashboard = () => history.push('/staff');
    return (
        <div className="container-fluid Tms-page-bg">
            <br/>
            <div className="row">
                <div className="col col-md-7 offset-md-3">
                    <div className="row">
                        <div className="col-md-12">
                            <a href="#" className="card-link text-decoration-none Tms-para4" onClick={staffDashboard}> &lt; Back to Listings</a>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-12">
                            <p className="Tms-h2">Inter-Department Task Title</p>
                        </div>
                    </div>
        
                    <div className="row">
                        <div className="col-md-2">
                            <p className="status_low rounded border text rectangle" id="urgent" value="Urgent">Urgent</p>
                        </div>
                        <div className="col-md-5">
                            <label className="Tms-para5">Created by Hinka Patel 6 days ago</label>
                        </div>
                        {/* <div className="col-md-3">
                            <button type="submit" className="btn btn-md Tms-btn-primary newtask-submit-btn" onClick={staffTask}>New Task</button>
                        </div> */}
                        <div className="col-md-2">
                            <button type="submit" className="btn btn-md newtask-submit-btn Tms-btn-secondary">Edit</button>
                        </div>
                    </div>
                    <br />

                    <div className="row">
                        <div className="col-md-10">
                            <TaskHistory></TaskHistory>
                        </div>
                        <div className="col-md-2">
                            <TaskInfo></TaskInfo>
                        </div>
                    </div>
                </div>
            </div>
            <br/><br/><br/>
            
        </div>
    );
}

export default TaskDetail;
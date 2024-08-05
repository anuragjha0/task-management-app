//Open this page when Get Users is clicked
import { useParams } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import { useState, useEffect } from "react";
import axios from "axios";
import AssignModal from "../modals/AssignModal";
import CompleteModal from "../modals/CompleteModal";
import CreateModal from "../modals/CreateModal";
import TaskViewModal from "../modals/TaskViewModal";
import FilterModal from "../modals/FilterModal";
import moment from "moment";

function GetUserTasks(){

    let {userId} = useParams();
    const [userTaskList, setUserTaskList] = useState([]);
    const [delegateShow, setDelegateShow] = useState(false);
    const [completeShow, setCompleteShow] = useState(false);
    const [createShow, SetCreateShow] = useState(false);
    const [createSubTaskShow, setCreateSubTaskShow] = useState(false);
    const [viewShow, setViewShow] = useState(false);
    const[taskId, setTaskId] = useState();
    const[parentId, setParentId] = useState();
    const[pageNo,setPageNo] = useState(0);
    const[pageNos,setPageNos] = useState([]);
    const[filterShow, setFilterShow] = useState(false);
    
    function handleDelegateShow(taskId){
        setTaskId(taskId);
        setDelegateShow(true);
    }

    function CreateSubTask(taskId){
        setParentId(taskId);
        setCreateSubTaskShow(true);
    }

    const handleClose = () => {
        setCompleteShow(false);
        setViewShow(false);
        setCreateSubTaskShow(false);
        setFilterShow(false);
    }
    
    const handleTaskClose = () => {
        setCreateSubTaskShow(false);
        SetCreateShow(false);
    }

    function CompleteTask(taskId){
        setTaskId(taskId);
        setCompleteShow(true);
    }

    function ViewTask(taskId){
        setTaskId(taskId);
        setViewShow(true);
    }

    function ParseDate(date){
        var now = new Date();
        now = moment.utc(now).format('YYYY/MM/DD HH:MM:SS');
        var d = moment.utc(date).format('YYYY/MM/DD HH:MM:SS');
        if(d < now)
            return d+" (EXPIRED)";
        else
            return d;
    }

    async function HandleGetTask(){
        
        const url = 'http://localhost:8080/users/task?userId='+userId+'&pageNo='+pageNo;
        try {
          let users = await axios.get(url);  
          users=users.data; 
          setUserTaskList(users);
          setPageNos([])
          if(users.total){
            for(let i=0;i<(users.total)/users.size;i++){
                setPageNos(pageNos=> [...pageNos,i] )
            }
          }
        } catch (error) {
          console.log(error);
        }
    }

    useEffect(() => {   
        HandleGetTask();
     }, [pageNo])  

    function handlePageChange(){
        setPageNo(document.getElementById('page-no').value);
    }

    return (
        <>
         <div className="row">
            <div className="col mt-3">
             <nav aria-label="breadcrumb">
                <h5><ol className="breadcrumb">
                    <li className="breadcrumb-item"><a href="/">Process</a></li>
                    <li className="breadcrumb-item"><a href="/Users">Users</a></li>
                    <li className="breadcrumb-item active" aria-current="page">Tasks</li>
                </ol></h5>  {/* This is bread crumb implementation, to access other pages easily*/}
             </nav>
            </div>
            <div className="col mt-2 mb-2"></div>
            <div className="col mt-2 mb-2">
                <button className="create-button" onClick={() => SetCreateShow(true)}>Create Task</button>
                {/* When create Task button is clicked, we set the create show to true, such that Create Modal is rendered */}
            </div>
            <div className="col mt-3">
                <h3><i className="fa fa-duotone fa-filter" onClick={() => setFilterShow(true)}>Filter</i></h3>
            </div>
            {userTaskList && userTaskList.total && userTaskList.size ?
            <div style={{textAlign: 'right'}} className="col mt-3">
            <h5 > Select Page No: 
            <select  id='page-no' onChange={() => handlePageChange()}>
                {pageNos && pageNos.map((pg) => (
                    <option value={pg} selected={pg == pageNo}>{pg+1}</option>
                ))}
            {/* Basically select Page number */}
            </select> </h5> 
            </div> : ''}
        </div>
        <table>
            <thead >
            <tr>
                <th>#</th>
                <th>Task Name</th>
                <th>Details</th>
                <th>Due</th>
                <th></th><th></th><th></th><th></th>
            </tr>
            </thead>
            {userTaskList && userTaskList.data && userTaskList.data.map((task,index) => (
            <tr key={task.id}>
                <td>{index+1}</td>
                <td>{task.name}</td>
                <td>{task.description}</td>
                <td>{task.dueDate && ParseDate(task.dueDate)}</td>
                <td><Button variant="primary" onClick={() => ViewTask(task.id)}>View</Button></td> {/* To Render Task view Modal, [Go to TaskViewModal.js]*/}
                <td><Button variant="primary" onClick={() => CreateSubTask(task.id)}>Sub-Task</Button></td> {/* To Set parent Id and Render Create Task Modal*/}
                <td><Button variant="primary" onClick={() => handleDelegateShow(task.id)}>Delegate</Button></td>    {/* To Render Assign Modal*/}
                <td><Button variant="primary" onClick={() => CompleteTask(task.id)}>Complete / Resolve</Button></td>    {/* To Render Complete Modal*/}
            </tr>
            ))}
            </table>
            {delegateShow?
                <AssignModal
                    show = {delegateShow}
                    handleClose={() => setDelegateShow(false)}
                    taskId = {taskId}
                    action = {'delegate'}
                /> : ''
            }
            {completeShow?
                <CompleteModal
                    show = {completeShow}
                    handleClose={handleClose}
                    taskId = {taskId}
                /> : ''
            }
            {createShow?
                <CreateModal
                    show = {createShow}
                    handleClose={handleTaskClose}
                /> : ''
            }
            {createSubTaskShow?
                <CreateModal
                    show = {createSubTaskShow}
                    handleClose={handleTaskClose}
                    parentId={parentId}
                /> : ''
            }
            {filterShow?
                <FilterModal
                show = {filterShow}
                handleClose={handleClose}
                userId = {userId}
                userTaskList = {userTaskList}
                setUserTaskList = {setUserTaskList}
                /> : ''
            }
            {viewShow?
                <TaskViewModal 
                show = {viewShow}
                handleClose={handleClose}
                taskId = {taskId}
                setViewShow = {setViewShow}
                /> : ''
            }
            
            </>
    );
}

export default GetUserTasks;
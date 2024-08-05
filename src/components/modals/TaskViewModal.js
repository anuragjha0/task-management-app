import Button from 'react-bootstrap/Button';
import { useState, useEffect } from "react";
import axios from "axios";
import Modal from 'react-bootstrap/Modal';
import { FetchUsers } from '../FetchUsers.js';
import CompleteModal from './CompleteModal.js';
import { TimeSince } from '../TimeSince.js';
import CreateModal from "../modals/CreateModal";

export function TaskViewModal(props) {
  const {
      show,
      handleClose,
      taskId,
      setViewShow
  } = props;

  const [taskDetail, setTaskDetail] = useState([]);
  const [comments, setComments] = useState([]);
  const [subTasks, setSubTasks] = useState([]);
  const [userShow, setUserShow] = useState(false);
  const [groupShow, setGroupShow] = useState(false);
  const [createCommentToggle, setCreateCommentToggle] = useState(false);
  const [assigneeShow, setAssigneeShow] = useState(false);
  const [userList, setUserList] = useState([]);
  const [completeShow, setCompleteShow] = useState(false);
  const [dueBy, setDueBy] = useState();
  const [subTaskId, setSubTaskId] = useState();
  const [viewSubTaskShow, setViewSubTaskShow] = useState(false);
  const [createSubTaskShow, setCreateSubTaskShow] = useState(false);
  const [parentId, setParentId] = useState();
  const [showParent, setShowParent] = useState(false);
  const [groupList, setGroupList] = useState([]);
  const [groupAssignList, setGroupAssignList] = useState([]);

  //Display the details of the sub-task, by rendering ViewModal and passing the sub-task id as task-id
  function ViewSubTaskDetail(taskId){
    setSubTaskId(taskId);
    setViewSubTaskShow(true);
  }

  //Function to get the details of given task by making an API call
  async function TaskDetail(){
      const url = 'http://localhost:8080/task/details?id='+taskId;
      try {
        const task = await axios.get(url);
        setTaskDetail(task.data);
        setDueBy(task.data.dueDate.slice(0,-6));
      } catch (error) {
        console.log(error);
      }
  }

  //Function to display sub-tasks of given task by making an API call
  async function handleShowSubtasks(){
      const url = 'http://localhost:8080/subtasks?id='+taskId;
      try {
        const task = await axios.get(url);
        setSubTasks(task.data);
      } catch (error) {
        console.log(error);
      }
  }

  //Function to display comments of given task by making an API call
  async function handleShowComments(){
      const url = 'http://localhost:8080/comments?id='+taskId;
      try {
        const task = await axios.get(url);
        setComments(task.data.data);
      } catch (error) {
        console.log(error);
      }
  }

  //Function to post comment by making an API call, and storing the new comment
  async function postComment(){
      const message = document.getElementById("comment-text").value;
      const url = 'http://localhost:8080/comments?id='+taskId;
      const requestBody = {
          "message": message
        };
      try {
        const response = await axios.post(url, requestBody); 
        setComments(comments => [...comments,response.data]);
        toggleComment();
      } catch (error) {
        console.log(error);
      }
  };

  // This function makes a PUT request to set the due date for a task based on the date and time selected
  async function setDueDate(){
    const dueDate = document.getElementById('due-date').value;
    const url = 'http://localhost:8080/duedate?id='+taskId;
      const requestBody = {
          "dueDate": dueDate
        };
      try {
        await axios.put(url, requestBody);
        setDueBy(dueDate);
      } catch (error) {
        console.log(error);
      }
  }

  // This function makes a POST request to change the assignee 
  async function setAssignPeople(){
    const url = 'http://localhost:8080/perform/actions';
    const action = 'claim';

    const assigneeUser = document.getElementById("assign-user-id").value;

    const requestBody = {
      "action": action,
      "assignee": assigneeUser
    };

    const params = {
      "id": taskId,
      "value": "5463",
      "headers": {
        "token": "auth_1234",
        "http-headers": "1"
      }
    }

    try {
      const response = await axios.post(url, requestBody, { params });
      if(response && response.data.status === 409 && action === "claim"){
        alert(`action cannot be performed due to a conflict. Either the task was updates simultaneously or the task was claimed by another user.`);
      } else {
        alert(`${action} Successfully`);
      }
      toggleAssignee();
    } catch (error) {
      console.log(error);
    }
  }

  // This function makes a PUT request to involve people in a given task based on the user selected from the option dropdown
  async function setInvolvePeople(){
    const userId = document.getElementById('user-id').value;
    const url = 'http://localhost:8080/involve?id='+taskId;
      const requestBody = {
          "userId": userId
      };
      try {
        await axios.put(url, requestBody);
        window.location.reload();
      } catch (error) {
        console.log(error);
      }
  }

  //PUT request to remove seleted involved user
  async function RemoveInvolved(userId){
    const url = 'http://localhost:8080/involve/remove?id='+taskId;
      const requestBody = {
          "userId": userId
      };
      try {
        await axios.put(url, requestBody);
        window.location.reload();
      } catch (error) {
        console.log(error);
      }
  }

  function toggleComment(){
    setCreateCommentToggle(!createCommentToggle);
  }

  function toggleAssignee(){
    setAssigneeShow(!assigneeShow);
  }

  function CompleteTask(taskId){
    setCompleteShow(true);
  }
  /* handle Parent Task will set the parent Id and it will set showParent hooke to true so that Parent task can be rendered */
  function handleParentTask(parentId){
    setParentId(parentId);
    setShowParent(true);
  }

  //Function to fetch the list of groups
  async function FetchGroups(){
    const url = 'http://localhost:8080/groups';
    try {
      const users = await axios.get(url);   
      setGroupList(users.data.data)
    } catch (error) {
      console.log(error);
      return error;
    }
  };

  //Fucntion to assign assign task to a group
  const AssignGroup = async () => {
    const url = 'http://localhost:8080/identitylink?id='+taskId;

    const group = document.getElementById('group-id').value;
    console.log(group)

    let requestBody= {
        "group": group,
        "type": "assignment"
    };

    try {
      await axios.post(url, requestBody);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  }

  async function ShowAssignedGroup(){
    const url = 'http://localhost:8080/identitylink/groups?id='+taskId;
    try {
      const users = await axios.get(url);
      setGroupAssignList(users.data)
    } catch (error) {
      console.log(error);
      return error;
    }
  }
    
  useEffect(() => { /* Render Task detail, and display comments andd subtasks and fetch users on page load */   
      TaskDetail();
      handleShowComments();
      handleShowSubtasks();
      FetchGroups();
      ShowAssignedGroup();
      let users = FetchUsers();
      users.then((userList) => setUserList(userList));
  }, [])  
    
  return (
    <>
      <Modal contentClassName ='task-modal' show={show} onHide={handleClose} >
        <Modal.Header closeButton>
          <Modal.Title>{taskDetail.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>

          {taskDetail && taskDetail.parentTaskName ?
          <>
            <b>Part Of Task: <button className='parent-button' onClick={() => handleParentTask(taskDetail.parentTaskId)}> {taskDetail.parentTaskName} </button></b><br/><br/>
            {/* Show Parent Task only if  parentTaskName exist */}
          </>:''
          }
          {taskDetail ? 
          <>

          <div>{/* Display Assignee name and allow user to select a different assignee from the user list */}
          <b> Assignee : </b><a href='#assign' onClick={() => toggleAssignee()} id='task-assignee'> {taskDetail.assignee ? taskDetail.assignee.fullName + " " : ''}
          <i className="fa fa-edit fa-solid" ></i> </a>
          </div>
          {assigneeShow?
          <>
          <select id='assign-user-id' className='form-control' onChange={() => setAssignPeople()}>
          <option value=''> - Select User to Assign -</option>
          {userList && userList.map((user) => (
            <option value={user.id}  >{user.fullName + ' : (' + user.email +')'}</option>
          ))}
          </select>
          </>
          :''
          }
          <br/>

          <h5>Due : <input className='' type='datetime-local' id="due-date" 
            value={dueBy} 
            onChange={() => setDueDate()}>
          </input></h5>
          </> : '' }
          <br/>
          
          <h5>People <i className=" fa fa-solid fa-user"></i> :  <i className="fa fa-plus fa-solid"  onClick={() => setUserShow(!userShow)}></i></h5>
          {userShow?
          <>
          <select id='user-id' className='form-control' onChange={() => setInvolvePeople()}>
          <option value=''> - Select User to involve -</option>
          {userList && userList.map((user) => (
            <option value={user.id}  >{user.fullName + ' : (' + user.email +')'}</option>
          ))}
          </select>
          </>
          :''
          }
          {taskDetail && taskDetail.involvedPeople && taskDetail.involvedPeople.map((people, index) => (
            <>
            <div className="people">
              {index+1 + ") " + people.fullName+"  ("+people.id+")"} 
              <button class="text-right" style={{ marginLeft: '0.5rem'}} className="removeInvolved" onClick={() => RemoveInvolved(people.id)}>X</button>
            </div>
            </>
          ))}
          <br/>
          
          {/* Create sub-task on button press by calling ceate modal, pass the prentId as current task Id */}
          <h5>Sub Tasks <i className="fa fa-brands fa-stack-exchange"></i> : <i className="fa fa-plus fa-solid" onClick={() => setCreateSubTaskShow(true)}></i></h5>
          {subTasks && subTasks.map(subTask => (
            <div className="subtask"><h5>{subTask.name}</h5> {/* Display sub-tasks bsed on task-detail API response */}
              <p>{subTask.description}</p>
              <h6>Created By: {subTask.assignee.fullName}, {TimeSince(subTask.created)}<br/></h6>
              <button className='subtask-button' onClick={() => ViewSubTaskDetail(subTask.id)}>View</button></div>
          ))}
          <br/>

          <h5>Comments <i className="fa fa-solid fa-comments"></i>:  <i className="fa fa-plus fa-solid" onClick={() => toggleComment()}></i></h5>
          {createCommentToggle? /* Display a Text area to enter comment and a submit button, then calling postComment() to post a comment */
            <>
            <textarea className='form-control' id='comment-text' placeholder='Enter Comment'/>
            <Button variant="info"  onClick={() => postComment()}>Post Comment </Button><br/><br/>
            </> :''
          }
          {comments && comments.map(comment => ( /* Display comments */
              <div className="comment">
                  <p>{comment.message}</p>
                  <h7>Created By: {comment.createdBy} </h7>
                  <h6>{TimeSince(comment.created)}</h6>
              </div>
          ))}<br/>
          <h5>Group <i className=" fa fa-solid fa-user"></i> :  <i className="fa fa-plus fa-solid"  onClick={() => setGroupShow(!groupShow)}></i></h5>
          {groupShow?
          <>
            <select id='group-id' className='form-control' onChange={() => AssignGroup()}>
              <option value=''> - Select Group to involve -</option>
              {groupList && groupList.map((user) => (
                <option value={user.id}  >{user.name}</option>
              ))}
            </select><br/>
          </>
          :''
          }
          {groupAssignList && groupAssignList.map((people, index) => (
            <>
            <div className="comment">
              {index+1 + ") " + people.group} 
            </div>
            </>
          ))}

          {completeShow?
              <CompleteModal
                  show = {completeShow}
                  handleClose={handleClose}
                  taskId = {taskId}
              /> : ''
          }
          {viewSubTaskShow?
              <TaskViewModal 
              show = {show}
              handleClose={() => setViewSubTaskShow(false)}
              taskId = {subTaskId}
              setViewShow = {setViewShow}
              /> : ''
          }
          {createSubTaskShow?
              <CreateModal
                  show = {createSubTaskShow}
                  handleClose={() => setCreateSubTaskShow(false)}
                  parentId = {taskId}
              /> : ''
          }
          {showParent?
            <TaskViewModal
              show = {show}
              handleClose={() => setShowParent(false)}
              taskId = {parentId}
            /> : ''
          }

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={CompleteTask}>
            Complete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default TaskViewModal;
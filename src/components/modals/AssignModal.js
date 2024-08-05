import Button from 'react-bootstrap/Button';
import { useState, useEffect } from "react";
import axios from "axios";
import Modal from 'react-bootstrap/Modal';
import { FetchUsers } from '../FetchUsers.js';

export function AssignModal(props) {
    const {
        show,
        handleClose,
        taskId,
        action
    } = props;

    const [userList, setUserList] = useState([]);

    const handleAssign = async (action) => {
      const url = 'http://localhost:8080/perform/actions';

      const assigneeUser = document.getElementById("selectedUser").value;

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
        window.location.reload()
      } catch (error) {
        console.log(error);
      }

    }

    useEffect(() => {   
      let users = FetchUsers();
      users.then((userList) => setUserList(userList));
    }, [])  
    
  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Select User to {action}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        {/* <button className="btn-custom" onClick={fetchUsers}>Create Process</button> */}
          <select className='form-control' id='selectedUser'>
            {userList && userList.map((user) => (
              <option value={user.id}>{user.fullName + ' : (' + user.email +')'}</option>
            ))}
          </select>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={() => handleAssign(action)}>
            {action}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default AssignModal;
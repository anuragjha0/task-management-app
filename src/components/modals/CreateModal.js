import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState, useEffect } from "react";
import axios from "axios";
import Modal from 'react-bootstrap/Modal';
import { FetchUsers } from '../FetchUsers.js';

export function CreateModal(props) {
    const {
        show,
        handleClose,
        parentId
    } = props;

    const [userList, setUserList] = useState([]);

    useEffect(() => {   
      let users = FetchUsers();
      users.then((userList) => setUserList(userList));
    }, [])  

    const handleCreate = async () => {
        const url = 'http://localhost:8080/task/create';
  
        const taskName = document.getElementById('task-name').value;
        const desc = document.getElementById('task-desc').value;
        const assignee = document.getElementById('task-assignee').value;

        let requestBody= {
            "name": taskName,
            "description": desc,
            "assignee": assignee
        };

        if(parentId){
           requestBody["parentTaskId"]= parentId;
        }
  
        try {
          await axios.post(url, requestBody);
          if(parentId)
            alert(`Sub-Task Created Successfully`);
          else
            alert(`Task Created Successfully`);
          handleClose();
          window.location.reload(false);
        } catch (error) {
          console.log(error);
        }
    }
    
  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>New Task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form>
                <Form.Group className="mb-3" controlId="formName">
                    <Form.Label>Name</Form.Label>
                    <Form.Control id="task-name" type="text" />  
                </Form.Group>

                <Form.Group className="mb-3" controlId="formDesc">
                    <Form.Label>Description</Form.Label>
                    <Form.Control id="task-desc" as="textarea" rows={3} />
                    
                    
                </Form.Group>
                <Form.Group className="mb-3" controlId="formAssignee">
                    <Form.Label>Assignee</Form.Label>
                    <select className='form-control' id='task-assignee'>
                    {userList && userList.map((user) => (
                    <option value={user.id}>{user.fullName + ' : (' + user.email +')'}</option>
                    ))}
                    </select>
                </Form.Group>
            </Form>
        {/* <button className="btn-custom" onClick={fetchUsers}>Create Process</button> */}
          
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={() => handleCreate()}>
            Create
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default CreateModal;
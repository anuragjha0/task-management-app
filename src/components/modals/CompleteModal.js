import Button from 'react-bootstrap/Button';
import { useState } from "react";
import axios from "axios";
import Modal from 'react-bootstrap/Modal';
import React from 'react'

export function CompleteModal(props) {
    const {
        show,
        handleClose,
        taskId,
    } = props;

    const handleComplete = async (action) => {
      const url = 'http://localhost:8080/task/complete?id='+taskId;

      const nameVariables = document.getElementsByClassName("name");
      const valueVariables =  document.getElementsByClassName("value");

      let variables=[];
      if(nameVariables){

        const length = nameVariables.length;

        for(let i=0;i<length;i++){
          let variable = {
            "name" : nameVariables[i].value,
            "value" : valueVariables[i].value
          }
          variables.push(variable);
        }
      }

      const requestBody = {
        "action": action,
        "variables": variables
      };

      try {
        await axios.post(url, requestBody);
          alert(`Task Completed Successfully`);
          handleClose();
          window.location.reload(false);
      } catch (error) {
        console.log(error);
        alert(`Task Cannot be Completed`);
      }

    }

    const handleResolve = async () => {
      const url = 'http://localhost:8080/perform/actions?id='+taskId;
      console.log("Resolving");
      const requestBody = {
        "action": "resolve"
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
        await axios.post(url, requestBody, params);
        window.location.reload();
      } catch (error) {
        console.log(error);
      }
    }

    const [inputList, setInputList] = useState([]);

    const Input = () => {
        return ( <>
        <br/>
        <div className='variables'>
        <input className='name' placeholder="Variable Name"/>
        <input className='value' placeholder="Variable Value"/>
        </div>
        </>)
      };

      const addVariable = event => {
        setInputList(inputList.concat(<Input key={inputList.length} />));
      };

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Complete Task</Modal.Title>
        </Modal.Header>
        <Modal.Body >
            <Button onClick={addVariable}> Add Variable </Button>
            <br/>
            {inputList}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={() => handleResolve()}>
            Resolve
          </Button>
          <Button variant="primary" onClick={() => handleComplete("complete")}>
            Complete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default CompleteModal;
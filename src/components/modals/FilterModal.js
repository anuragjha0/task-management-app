import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState, useEffect } from "react";
import axios from "axios";
import Modal from 'react-bootstrap/Modal';
import BootstrapSwitchButton from 'bootstrap-switch-button-react'

export function FilterModal(props) {
    const {
        show,
        handleClose,
        userId,
        userTaskList,
        setUserTaskList
    } = props; 

    const [isCompleteClicked, setIsCompleteClicked] = useState(false);
    const [isDueClicked, setIsDueClicked] = useState(false);
    const [processDefs, setProcessDefs] = useState([]);

    async function fetchProcessDefination(){
        const url = 'http://localhost:8080/repository/process-definitions'; 
        try {
          const processDefs = await axios.get(url); 
          setProcessDefs(processDefs.data.data);
        } catch (error) {
          console.log(error);
        }
    };

    useEffect(() => {   
        fetchProcessDefination();
      }, []) 

    async function HandleFilter(){
        const type = document.getElementById('filter-type').value;
        const text = document.getElementById('text').value;
        const process = document.getElementById('process').value;

        const url = 'http://localhost:8080/filter';

        let requestBody= {
            "assignee": userId,
            "assignment": "assignee",
            "sort": "created-desc",
            "state": "open"
        };

        if(type!==''){
            requestBody["assignment"]=type;
        }

        if(isCompleteClicked){
            requestBody["state"]="completed";
        }

        if(isDueClicked){
            requestBody["sort"]="due-asc";
        }

        if(text){
            requestBody["text"]=text;
        }

        if(process!==''){
            requestBody["processDefinitionId"]=process;
        }

        try {
            let response = await axios.post(url, requestBody);
            setUserTaskList(response.data)
            console.log(userTaskList);
        } catch (error) {
            console.log(error);
        }

        handleClose();
    }
    
  return (
    <>
      {console.log(processDefs)}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Filter</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form>
            <Form.Group className="mb-3" controlId="formName">
                <Form.Label>Filter</Form.Label>
                <Form.Control id="text" type="text" />  
            </Form.Group>
        </Form>
        Completed: <BootstrapSwitchButton size="sm"
                    onlabel='On'
                    offlabel='Off'
                    onChange={() => {
                        if(isCompleteClicked)
                            setIsCompleteClicked(false)
                        else
                        setIsCompleteClicked(true)
                    }}
                /><br/><br/>
        Sort By Due: <BootstrapSwitchButton size="sm"
                    onlabel='On'
                    offlabel='Off'
                    onChange={() => {
                        if(isDueClicked)
                            setIsDueClicked(false)
                        else
                            setIsDueClicked(true)
                    }}
                /><br/><br/>
        Process Definition:
        <select id='process' className='form-control'>
            <option value=''></option>
            {processDefs && processDefs.map((process) => (
            <option value={process.id}>{process.name}</option>
            ))}  
        </select><br/>
        Assignment:
        <select id='filter-type' className='form-control'>
                    <option value=''> - Select Type of Filter -</option>
                    <option value='involved'>Involved Tasks</option>
                    <option value='candidate'>Candidate Tasks</option>
                    <option value='assignee'>Assignee Tasks</option>
        </select>
          
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={() => HandleFilter()}>
            Apply
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default FilterModal;
import { useState } from "react";
import Modal from 'react-modal';

import ProcessDefinations from "./components/ProcessDefinition";
import CreateProcess from "./components/CreateProcess";
import ProcessInstance from "./components/GetProcessInstance";
import TrackProcess from "./components/TrackProcess";
import ListOfTask from "./components/ListOfTask";
import TaskAction from "./components/TaskAction";
import ModalFunction from "./components/Modal";

function Mains(props){
    
    const {processDefinations, setProcessDefinations} = ProcessDefinations();
    const [processInstance, setProcessInstance] = ProcessInstance(); 
    const [createProcessData, setCreateProcessData] = CreateProcess(); 
    const [tasks, setTasks] = ListOfTask();

    const customStyles = {
        content: {
          top: '50%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          marginRight: '-50%',
          transform: 'translate(-50%, -50%)',
        },
    };

    return (
        <>
            <div className="App">
            <h2>Process Definitions</h2>
            {/* <button type="button" className="btn-custom" onClick={fetchProcessDefination}>Get Process Definations</button> */}
            {processDefinations ? //make table
            <table>
                <tr>
                <th>Name</th>
                <th>Id</th>
                </tr>
                {processDefinations && processDefinations.map((process) => (
                <tr key={process.id}>
                    <td>{process.name}</td>
                    <td>{process.id}</td>
                    {/* <td><button className="btn-custom" onClick={createProcess}>Create Process</button></td> */}
                    <td><button className="btn-custom" onClick={() => props.getProcessInstance(process.name)}>Show</button></td>
                    <td><button className="btn-custom"  //on clicking show we call getprocess instance along with name to get all instances of given process
                    onClick={() => props.createProcess(process.id, process.name)}>
                    Create</button></td>
                </tr>
                ))}

            </table>
            : ' '}

            {processInstance ?
            <>
                <h2>Process Instance</h2>
                <table>
                <tr>
                    <th>Name</th>
                    <th>Start Time</th>
                    <th>ID</th>
                    <th>Url</th>
                </tr>
                {processInstance && processInstance.map((instance) => (
                    <tr key={instance.processDefinitionId}>
                    <td>{instance.processDefinitionName}</td>
                    <td>{instance.startTime}</td>
                    <td>{instance.id}</td>
                    <td>{instance.url}</td>
                    <td><button className="btn-custom"
                        onClick={() => TrackProcess.trackProcess(instance.id)}>
                        Diagram</button></td>
                    <td><button className="btn-custom"
                        onClick={() => ListOfTask.getListOfTask(instance.id)}>
                        Task</button></td>
                    </tr>
                ))}
                </table>
            </>
            : ' '}

            {createProcessData ?
            <>
                <h2>Create Process</h2>
                <table>
                <tr>
                    <th>Name</th>
                    <th>Start Time</th>
                    <th>ID</th>
                    <th>Url</th>
                </tr>
                <tr>
                    <td>{createProcessData.processDefinitionName}</td>
                    <td>{createProcessData.startTime}</td>
                    <td>{createProcessData.id}</td>
                    <td>{createProcessData.url}</td>
                    <td><button className="btn-custom"
                    onClick={() => TrackProcess.trackProcess(createProcessData.id)}>
                    Track</button></td>
                    <td><button className="btn-custom"
                    onClick={() => ListOfTask.getListOfTask(createProcessData.id)}>
                    Task</button></td>
                </tr>
                </table>
            </>
            : ' '}


            {tasks ?
            <>
                <h2>Task</h2>
                <table>
                <tr>
                    <th>Name</th>
                    <th>Created Time</th>
                    <th>ID</th>
                </tr>
                <tr>
                    <td>{tasks.name}</td>
                    <td>{tasks.createTime}</td>
                    <td>{tasks.id}</td>
                    <td><button className="btn-custom"
                    onClick={() => TaskAction.taskAction("claim", tasks.id)}>
                    Claim</button></td>
                    <td><button className="btn-custom"
                    onClick={() => TaskAction.taskAction("delegate", tasks.id)}>
                    Delegate</button></td>
                    {/* <td><button className="btn-custom"
                    onClick={() => completeTask(tasks.id)}>
                    Complete</button></td> */}
                </tr>
                </table>
            </>
            : ' '}

            {/* <img src={graphicRepresentation} /> */}

            <div>
            {/* <button onClick={openModal}>Open Modal</button> */}

            <Modal
                isOpen={ModalFunction.modalIsOpen}
                onAfterOpen={ModalFunction.afterOpenModal}
                onRequestClose={ModalFunction.closeModal}
                style={customStyles}
                contentLabel="Diagram"
            >
                <button onClick={ModalFunction.closeModal}>close</button>
                <img src={TrackProcess.graphicRepresentation} />
            </Modal>
            </div>
        </div>
        </>
    );
}

export default Mains;
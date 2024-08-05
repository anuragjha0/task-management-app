import React, { useState } from 'react';
import AssignModal from '../modals/AssignModal.js';

function Tasks(props){
    const {
        tasks,
    } = props;

  const [action, setAction] = useState(null);

  const [show, setShow] = useState(false);
  function handleShow(action){
    setShow(true);
    setAction(action);
  }
  const handleClose = () => setShow(false);

    return(
        <>
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
                <td>
                  <button className="btn-custom" onClick={() => handleShow("claim")}>claim</button>
                </td>
                <td>
                <button className="btn-custom" onClick={() => handleShow("delegate")}>Delegate</button>
                </td>
                {show?
                  <AssignModal
                    show = {show}
                    handleClose={handleClose}
                    taskId = {tasks.id}
                    action = {action}
                  /> : ''
                }
              </tr>
            </table>
          </>
          : ' '} 
        </>
    )
}

export default Tasks;

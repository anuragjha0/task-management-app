import axios from "axios";
import {getListOfTask} from '../taskComponents/GetListOfTasks'
import {trackProcess} from '../taskComponents/TrackProcess'

export async function createProcess(id, name, setCreateProcessData) {
  setCreateProcessData(null);
  const url = 'http://localhost:8080/runtime/create-process';

  const requestBody = {
    "processDefinitionId": id,
    "name": name,
    "returnVariables": true,
    "variables": [
      {
        "name": "orderno",
        "value": "12345"
      },
      {
        "name": "customerguid",
        "value": "12345@adobe.com"
      },
      {
        "name": "cxlreason",
        "value": "to expensive"
      },
      {
        "name": "changedetails",
        "value": "change details"
      }
    ]
  };
  try {
    const createProcessRes = await axios.post(url, requestBody);
    setCreateProcessData(createProcessRes.data);
  } catch (error) {
    console.log(error);
  }
}

export function CreateProcess(props){
    const {
        createProcessData,
        setTasks,
        setCreateProcessData,
        setGraphicRepresentation,
        setIsOpen
    } = props;

    return(
        <>
            {createProcessData ?
          <>
            <h2>Create Process</h2>
            <table>
              <tr>
                <th>Name</th>
                <th>Start Time</th>
                <th>ID</th>
                <th>Url</th>
                <th></th><th></th>
              </tr>
              <tr>
                <td>{createProcessData.processDefinitionName}</td>
                <td>{createProcessData.startTime}</td>
                <td>{createProcessData.id}</td>
                <td>{createProcessData.url}</td>
                <td><button className="btn-custom"
                  onClick={() => trackProcess(createProcessData.id, setGraphicRepresentation, setIsOpen)}>
                  Track</button></td>
                <td><button className="btn-custom"
                  onClick={() => getListOfTask(createProcessData.id, setTasks, setCreateProcessData)}>
                  Task</button></td>
              </tr>
            </table>
          </>
          : ' '}
        </>  
    );
}

export default CreateProcess;
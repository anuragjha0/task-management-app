import axios from "axios";
import {getListOfTask} from '../taskComponents/GetListOfTasks'
import {trackProcess} from '../taskComponents/TrackProcess'

export async function getProcessInstance(processName, setProcessInstance, setCreateProcessData){
  setProcessInstance(null);
  setCreateProcessData(null);

  const url = 'http://localhost:8080/active/active-process-instances';
  try {
    const processInstance = await axios.get(url);
      //get all instance of process and filter based on name
    let processInstanceData = processInstance.data.data.filter((process) => {
      return process.processDefinitionName === processName;
    })

    setProcessInstance(processInstanceData);
  } catch (error) {
    console.log(error);
  }
}

export function ProcessInstance(props){
    const {
        processInstance,
        setTasks,
        setCreateProcessData,
        setGraphicRepresentation,
        setIsOpen
    } = props;

    return(
        <>
            {processInstance ?
            <>
            <h2>Process Instance</h2>
            <table>
              <tr>
                <th>Name</th>
                <th>Start Time</th>
                <th>ID</th>
                <th>Url</th>
                <th></th><th></th>
              </tr>
              {processInstance && processInstance.map((instance) => (
                <tr key={instance.processDefinitionId}>
                  <td>{instance.processDefinitionName}</td>
                  <td>{instance.startTime}</td>
                  <td>{instance.id}</td>
                  <td>{instance.url}</td>
                  <td><button className="btn-custom"
                    onClick={() => trackProcess(instance.id, setGraphicRepresentation, setIsOpen)}>
                    Diagram</button></td>
                  <td><button className="btn-custom"
                    onClick={() => getListOfTask(instance.id, setTasks, setCreateProcessData)}>
                    Task</button></td>
                </tr>
              ))}
            </table>
          </>
          : ' '}
        </>
    );
}

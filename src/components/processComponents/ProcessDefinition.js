import axios from "axios";
import {getProcessInstance} from './ProcessInstance'
import {createProcess} from './CreateProcess'

export async function fetchProcessDefination(setProcessDefinations){
    const url = 'http://localhost:8080/repository/process-definitions'; //go to server.js & check
    try {
      const processDefs = await axios.get(url);   //we get process definition, goto 194
      setProcessDefinations(processDefs.data.data);
    } catch (error) {
      console.log(error);
    }
  };

export function ProcessDefination(props){
    const {
        processDefinations,
        setProcessInstance,
        setCreateProcessData,
    } = props;

    return(
        <>
            <div className="row">
                <div className="col-md-10">
                <h2>Process Definitions</h2>
                </div>
                <div className="col-md-2">
                <h4><nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item active" aria-current="page"><strong>Process</strong></li>
                        <li className="breadcrumb-item"><a href="/Users">Users</a></li>
                    </ol>
                </nav></h4>
                </div>
            </div>
            {/* <button type="button" className="btn-custom" onClick={fetchProcessDefination}>Get Process Definations</button> */}
            {processDefinations ? //make table
            <table>
                <tr>
                <th>Name</th>
                <th>Id</th>
                <th>Actions</th>
                <th></th>
                
                </tr>
                {processDefinations && processDefinations.map((process) => (
                <tr key={process.id}>
                    <td>{process.name}</td>
                    <td>{process.id}</td>
                    {/* <td><button className="btn-custom" onClick={createProcess}>Create Process</button></td> */}
                    <td><button className="btn-custom" onClick={() => getProcessInstance(process.name, setProcessInstance, setCreateProcessData)}>Show</button></td> 
                    <td><button className="btn-custom"  //on clicking show we call getprocess instance along with name to get all instances of given process
                    onClick={() => createProcess(process.id, process.name, setCreateProcessData)}>
                    Create</button></td>
                </tr>
                ))}

            </table>
            : ' '}
        </>
    )
}

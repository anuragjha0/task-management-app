import { useEffect, useState } from "react";
import {ProcessInstance} from './processComponents/ProcessInstance'
import {CreateProcess}  from './processComponents/CreateProcess'
import {fetchProcessDefination, ProcessDefination} from './processComponents/ProcessDefinition'

function Process(props){
    const {
        setTasks,
        setGraphicRepresentation,
        setIsOpen
    } = props;
  
    const [processDefinations, setProcessDefinations] = useState(null);
    const [processInstance, setProcessInstance] = useState(null);
    const [createProcessData, setCreateProcessData] = useState(null);  

    useEffect(() => {   
        fetchProcessDefination(setProcessDefinations);
      }, [])    
    
    return(
      <>
        <ProcessDefination 
          processDefinations = {processDefinations}
          setProcessInstance = {setProcessInstance}
          setCreateProcessData = {setCreateProcessData}
        />
        <ProcessInstance 
          processInstance = {processInstance}
          setTasks = {setTasks}
          setCreateProcessData = {setCreateProcessData}
          setGraphicRepresentation = {setGraphicRepresentation}
          setIsOpen = {setIsOpen}
        />
        <CreateProcess
          createProcessData = {createProcessData}
          setTasks = {setTasks}
          setCreateProcessData = {setCreateProcessData}
          setGraphicRepresentation = {setGraphicRepresentation}
          setIsOpen = {setIsOpen}
        />
      </>
    );
}

export default Process;
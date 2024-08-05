import { useState } from "react";
import Process from './Process'
import Task from './Task'
// import {createStore} from "redux";
// import allReducers from "./CombineReducers"
// import {Provider} from "react-redux"
function Main() { 

  // const store = createStore(allReducers);

  const [tasks, setTasks] = useState(null);
  const [graphicRepresentation, setGraphicRepresentation] = useState(null);
  const [modalIsOpen, setIsOpen] = useState(false);
  

  return (  
    <>
      <div className="App">
        {/*<Provider store={store}> */}
              <Process 
                setTasks = {setTasks}
                setGraphicRepresentation = {setGraphicRepresentation}
                setIsOpen = {setIsOpen}
              />
              
              <Task
                tasks = {tasks}
                graphicRepresentation = {graphicRepresentation}
                modalIsOpen = {modalIsOpen}
                setIsOpen = {setIsOpen}
              />
        {/* </Provider> */}
      </div>
    </>
  );
}

export default Main;
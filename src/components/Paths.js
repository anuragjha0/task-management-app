import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import Main from "./Main";
import GetUsers from './userTaskComponent/GetUsers'
import GetUserTasks from "./userTaskComponent/GetUserTasks";

function Paths() { 

  return (  
    <>
      <div className="App">
        {/*<Provider store={store}> */}
        <BrowserRouter>
            <Routes>
              <Route path="/" element={<Main/>} />
              <Route path="/users" element={<GetUsers/>} />
              <Route path="/Users/Task/:userId" element={<GetUserTasks/>} />
            </Routes>
          </BrowserRouter>
        {/* </Provider> */}
      </div>
    </>
  );
}

export default Paths;

import Main from "./components/Main";
import Router from "./components/Paths";

function App() {

  /* Initial code
  useEffect(() => {   //By using this Hook, you tell React that your component needs to do something after render. 
    // getting process definitation
    fetchProcessDefination();
  }, [])    //empty array [] : build on run time

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

  // get all the process definition
  const fetchProcessDefination = async () => {
    const url = 'http://localhost:8080/repository/process-definitions'; //go to server.js & check
    try {
      const processDefs = await axios.get(url);   //we get process definition, goto 194
      setProcessDefinations(processDefs.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  // get the process instance
  const getProcessInstance = async (processName) => {
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

  // create the process 
  const createProcess = async (id, name) => {
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


  // graphical representation of process instance
  const trackProcess = async (id) => {
    setGraphicRepresentation(null);
    const img = `http://flowable-poc.corp.adobe.com:8080/flowable-ui/process-api/runtime/process-instances/${id}/diagram`

    setGraphicRepresentation(img);
    openModal();
    // const params = {
    //   "id": "486d51e7-0cc4-11ec-aae3-fa163e99566d",
    // }

    // const headers = {
    //   responseType: "blob",
    //   exposedHeaders: ["Content-Disposition"]
    // }


    // const url = 'http://localhost:8080/process-instances/graphical-representation';

    // try {
    //   const graphicalRepresentation = await axios.get(url, { params }, headers);
    //   console.log(graphicalRepresentation, "graphicalRepresentation");

    //   const img = window.URL.createObjectURL(new Blob(graphicalRepresentation.data));
    //   console.log(img, "see image")

    // } catch (error) {
    //   console.log(error);
    // }
  }



  // get the list of task
  const getListOfTask = async (id) => {
    setTasks(null);
    setCreateProcessData(null);

    const url = `http://localhost:8080/runtime/tasks`;

    const params = {
      "id": id,
    };

    try {
      const tasks = await axios.get(url, { params });
      setTasks(tasks.data.data[0]);
    } catch (error) {
      console.log(error);
    }
  }


  // action on task
  const taskAction = async (action, id) => {
    const url = 'http://localhost:8080/perform/actions';

    const requestBody = {
      "action": action,
      "assignee": "rpuri"
    };

    const params = {
      "id": id,
      "value": "5463",
      "headers": {
        "token": "auth_1234",
        "http-headers": "1"
      }
    }

    try {
      const tasks = await axios.post(url, requestBody, { params });
      // setTasks(tasks.data.data[0]);
      alert(`${action} Successfully`);
    } catch (error) {
      console.log(error);
    }
  }

  // modal funtion
  let subtitle;
  const [modalIsOpen, setIsOpen] = useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = '#f00';
  }

  function closeModal() {
    setIsOpen(false);
  }
  // modal funtion end 

  */
 //Test comment ends here

 return (  
  <>
    <div className="App">
    <Router />
    </div>
  </>
 );
}

export default App;
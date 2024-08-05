const express = require('express'); 
const axios = require("axios");     //axios lib for API calls
const app = express();          // Load express into variable app 
const port = 8080;              //defining port
const cors = require('cors');   //Enable in case of server only,i.e. local env for acessing from different DN 
const constant = require('./constant');
const circularJson = require('circular-json');  //another form of json with no quotes
const bodyParser = require('body-parser');      //to get request body in proper format
//if (process.env.ENVIRONMENT_NAME === 'local') {
    app.use(cors())
//}
//const nodemailer = require("nodemailer");

const authToken = () => {
    return "Basic YWRtaW46dGVzdA==";
}

const cookieToken = () => {
    return "FLOWABLE_REMEMBER_ME=WEN4dk5xZFp4cHVpY1VYUVNJJTJCd0VRJTNEJTNEOkhOeFBEdTFyU09XaTVuRlBIU2s5bUElM0QlM0Q";
}

let token = authToken()     //call function to return token
let cookie = cookieToken()
app.use(bodyParser.json()); //json format for bodyParser
app.use(bodyParser.urlencoded({ extended: true }));

// get all the process definition
app.get('/repository/process-definitions', (req, res) => {  //routes the HTTP GET Requests to the path which is being specified with the specified callback functions
    let axHttpOptions = {       //
        url: `${constant.domainName}${constant.basePath}repository/process-definitions?latest=true`,    //DN & base path
        method: "GET",
        headers: {
            Authorization: token    //to validate interaction between node.js(proxy layer) and backend server, cant expose to UI
        }
    }
    axios(axHttpOptions).then(function (response) {     //API call, if we get response send back to react
        res.send(response.data)
    }).catch(function (error) {
        res.send(error)
    });
})


// get all the active process instance
app.get('/active/active-process-instances', (req, res) => {
    let axHttpOptions = {
        url: `${constant.domainName}${constant.basePath}runtime/process-instances?size=14`,
        method: "GET",
        headers: {
            Authorization: token
        }
    }
    axios(axHttpOptions).then(function (response) {
        res.send(response.data)
    }).catch(function (error) {
        res.send(error)
    });
})



// create process 
app.post('/runtime/create-process', (req, res) => {
    let axHttpOptions = {
        url: `${constant.domainName}${constant.basePath}runtime/process-instances`,
        method: "POST",
        headers: {
            Authorization: token
        },
        data: req.body,
        contentType: "application/octet-stream",
    }
    axios(axHttpOptions).then(function (response) {
        res.status(response.status).send(response.data)
        // res.send(response.data)
    }).catch(function (error) {
        let errorResponse = JSON.parse(circularJson.stringify(error));
        res.send(errorResponse.response)
    });
})


// track the process 
app.get('/process-instances/graphical-representation', (req, res) => {

    let axHttpOptions = {
        url: `${constant.domainName}${constant.basePath}runtime/process-instances/${req.query.id}/diagram`,
        method: "GET",
        responseType: 'stream',
    }

    axios(axHttpOptions).then(function (response) {
        res.setHeader("content-type", response.headers["content-type"]);
        res.setHeader("content-disposition", response.headers["content-disposition"]);
        // response.data.pipe(res);
        res.send(response.data)

    }).catch(function (error) {
        let errorResponse = JSON.parse(circularJson.stringify(error));
        res.send(errorResponse.response)
    });
})

app.listen(port, () => {    //to start the server on port
    console.log(`Example app listening on port ${port}`)
})


// get the list of task
app.get('/runtime/tasks', (req, res) => {

    let axHttpOptions = {
        url: `${constant.domainName}${constant.basePath}runtime/tasks?includeProcessVariables=true&includeTaskLocalVariables=true&processInstanceId=${req.query.id}`,
        method: "GET",
        headers: {
            Authorization: token
        },
    }

    axios(axHttpOptions).then(function (response) {
        res.send(response.data)
    }).catch(function (error) {
        res.send(error)
    });
})


// action on task 
app.post('/perform/actions', (req, res) => {
    let axHttpOptions = {
        url: `${constant.domainName}${constant.basePath}runtime/tasks/${req.query.id}`,
        method: "POST",
        headers: {
            Authorization: token
        },
        data: req.body,
    }
    axios(axHttpOptions).then(function (response) {
        res.send(response.data)
    }).catch(function (error) {
        res.send(error);
    });
})

//Fetch users
app.get('/users', (req, res) => {
    let axHttpOptions = {
        url: `${constant.domainName}/flowable-ui/idm-app/rest/admin/users?sort=idAsc`,
        method: "GET",
        headers: { 
            'Cookie': cookie
        }
    };
    axios(axHttpOptions).then(function (response) {
        res.send(response.data)
    }).catch(function (error) {
        res.send(error);
    });
})

//Fetch groups
app.get('/groups', (req, res) => {
    let axHttpOptions = {
        url: `${constant.domainName}/flowable-ui/process-api/identity/groups`,
        method: "GET",
        headers: { 
            Authorization: token,
            'Cookie': cookie
        }
    };
    axios(axHttpOptions).then(function (response) {
        res.send(response.data)
    }).catch(function (error) {
        res.send(error);
    });
})

//Get all the Task associated to a given user
app.get('/users/task', (req, res) => {
    let axHttpOptions = {
        url: `${constant.domainName}${constant.basePath}runtime/tasks/?assignee=${req.query.userId}&sort=createTime&order=desc&start=${req.query.pageNo}`,
        method: "GET",
        headers: {
            Authorization: token,
            'Cookie': cookie
        },
        data: req.body,
    }
    axios(axHttpOptions).then(function (response) {
        res.send(response.data)
    }).catch(function (error) {
        res.send(error);
    });
})

//Create a Task
app.post('/task/create', (req, res) => {
    let axHttpOptions = {
        url: `${constant.domainName}/flowable-ui/app/rest/tasks`,
        method: "POST",
        headers: {
            'Cookie': cookie
        },
        data: req.body,
    }
    axios(axHttpOptions).then(function (response) {
        res.send(response.data)
    }).catch(function (error) {
        res.send(error);
    });
})

//Complete a Task
app.post('/task/complete', (req, res) => {
    let axHttpOptions = {
        url: `${constant.domainName}${constant.basePath}runtime/tasks/${req.query.id}`,
        method: "POST",
        headers: {
            Authorization: token,
            'Cookie': cookie
        },
        data: req.body,
    }
    axios(axHttpOptions).then(function (response) {
        res.send(response.data)
    }).catch(function (error) {
        res.send(error);
    });
})

//Detils of a task
app.get('/task/details', (req, res) => {
    let axHttpOptions = {
        url: `${constant.domainName}/flowable-ui/app/rest/tasks/${req.query.id}`,
        method: "GET",
        headers: {
            Authorization: token,
            'Cookie': cookie
        },
        data: req.body,
    }
    axios(axHttpOptions).then(function (response) {
        res.send(response.data)
    }).catch(function (error) {
        res.send(error);
    });
})

//Get comments for a Task
app.get('/comments', (req, res) => {
    let axHttpOptions = {
        url: `${constant.domainName}/flowable-ui/app/rest/tasks/${req.query.id}/comments?latestFirst=true`,
        method: "GET",
        headers: {
            Authorization: token,
            'Cookie': cookie
        },
        data: req.body,
    }
    axios(axHttpOptions).then(function (response) {
        res.send(response.data)
    }).catch(function (error) {
        res.send(error);
    });
})

//Get subtasks for a given Task
app.get('/subtasks', (req, res) => {
    let axHttpOptions = {
        url: `${constant.domainName}/flowable-ui/app/rest/tasks/${req.query.id}/subtasks?latestFirst=true`,
        method: "GET",
        headers: {
            Authorization: token,
            'Cookie': cookie
        },
        data: req.body,
    }
    axios(axHttpOptions).then(function (response) {
        res.send(response.data)
    }).catch(function (error) {
        res.send(error);
    });
})

//post comment
app.post('/comments', (req, res) => {
    let axHttpOptions = {
        url: `${constant.domainName}/flowable-ui/app/rest/tasks/${req.query.id}/comments`,
        method: "POST",
        headers: {
            Authorization: token,
            'Cookie': cookie
        },
        data: req.body,
    }
    axios(axHttpOptions).then(function (response) {
        res.send(response.data)
    }).catch(function (error) {
        res.send(error);
    });
})

//involve person in task
app.put('/involve', (req, res) => {
    let axHttpOptions = {
        url: `${constant.domainName}/flowable-ui/app/rest/tasks/${req.query.id}/action/involve`,
        method: "PUT",
        headers: {
            Authorization: token,
            'Cookie': cookie
        },
        data: req.body,
    }
    axios(axHttpOptions).then(function (response) {
        res.send(response.data)
    }).catch(function (error) {
        res.send(error);
    });
})

//Set due Date for a Task
app.put('/duedate',(req,res) => {
    let axHttpOptions = {
        url: `${constant.domainName}/flowable-ui/app/rest/tasks/${req.query.id}`,
        method: "PUT",
        headers: {
            Authorization: token,
            'Cookie': cookie
        },
        data: req.body,
    }
    axios(axHttpOptions).then(function (response) {
        res.send(response.data)
    }).catch(function (error) {
        res.send(error);
    });
})

//Remove involved
app.put('/involve/remove',(req,res) => {
    let axHttpOptions = {
        url: `${constant.domainName}/flowable-ui/app/rest/tasks/${req.query.id}/action/remove-involved`,
        method: "PUT",
        headers: {
            Authorization: token,
            'Cookie': cookie
        },
        data: req.body,
    }
    axios(axHttpOptions).then(function (response) {
        res.send(response.data)
    }).catch(function (error) {
        res.send(error);
    });
})

//Apply filter on task 
app.post('/filter', (req, res) => {
    let axHttpOptions = {
        url: `${constant.domainName}/flowable-ui/app/rest/query/tasks`,
        method: "POST",
        headers: {
            Authorization: token,
            'Cookie': cookie
            //'Cookie': "FLOWABLE_REMEMBER_ME=VVlmd3gzSERaRGJtRzN6b3hZTVFidyUzRCUzRDo4eE9zNjRKdHZNOTJTOUFDeVBOVWFnJTNEJTNE"
        },
        data: req.body,
    }
    axios(axHttpOptions).then(function (response) {
        res.send(response.data)
    }).catch(function (error) {
        res.send(error);
    });
})

//Assign Task to Group
app.post('/identitylink', (req, res) => {
    let axHttpOptions = {
        url: `${constant.domainName}/flowable-ui/process-api/runtime/tasks/${req.query.id}/identitylinks`,
        method: "POST",
        headers: {
            Authorization: token,
            'Cookie': cookie
        },
        data: req.body,
    }
    axios(axHttpOptions).then(function (response) {
        res.send(response.data)
    }).catch(function (error) {
        res.send(error);
    });
})

//show Task assigned groups
app.get('/identitylink/groups', (req, res) => {
    let axHttpOptions = {
        url: `${constant.domainName}/flowable-ui/process-api/runtime/tasks/${req.query.id}/identitylinks/groups`,
        method: "GET",
        headers: {
            Authorization: token,
            'Cookie': cookie
        },
        data: req.body,
    }
    axios(axHttpOptions).then(function (response) {
        res.send(response.data)
    }).catch(function (error) {
        res.send(error);
    });
})
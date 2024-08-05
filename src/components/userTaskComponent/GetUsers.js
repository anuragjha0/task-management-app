//Make API call to fetch user details
//Display user details and implement button functionality to display tasks for given user in new page
import { useState, useEffect } from "react";
import { FetchUsers } from "../FetchUsers";

function GetUsers(props){

    const [userList, setUserList] = useState([]);
    useEffect(() => {   
        let users = FetchUsers(); //Call FetchUsers() to get the list of users and other information
        users.then((userList) => setUserList(userList));  //append users to userList
      }, [])  

    return (
        <>
        <table className>
            <thead bgcolor="DodgerBlue">
            <tr>
                <th>#</th>
                <th>ID</th>
                <th>Email</th>
                <th>Name</th>
                <th></th>
            </tr>
            </thead>
            {userList && userList.map((user,index) => (
            <tr key={user.id}>
                <td>{index+1}</td>
                <td>{user.id}</td>
                <td>{user.email}</td>
                <td>{user.fullName}</td>
                <td>
                  <a className="btn-custom" href={'/Users/Task/'+user.id}>Get Tasks</a> 
                  {/*Open a new page when Get Task is clicked, append userId to url for efficiency, [Go to GetUserTasks.js]*/}
                </td>
            </tr>
            ))}
        </table>
          
        </>
      );
}

export default GetUsers;

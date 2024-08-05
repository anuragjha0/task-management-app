import axios from "axios";

export async function FetchUsers(){
  
  const url = 'http://localhost:8080/users';
  try {
    const users = await axios.get(url);   
    return users.data.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};
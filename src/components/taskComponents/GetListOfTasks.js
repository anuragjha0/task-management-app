import axios from "axios";

export async function getListOfTask(id, setTasks, setCreateProcessData) {
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
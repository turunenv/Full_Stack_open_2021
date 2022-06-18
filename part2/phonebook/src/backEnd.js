import axios from 'axios';
const baseUrl = 'http://localhost:3001/api/persons'

const getAll = () => {
    const request = axios.get(baseUrl);
    return request.then(response => response.data);
}

const create = newObject => {
    const request = axios.post(baseUrl, newObject);
    return request.then(response => response.data);
}

const deleteFromDB = (id, handleFail) => {
        // const request = axios.get(baseUrl);
        // const res = request.then(response => response.data);
        // console.log(res.then(arr => arr.length));
        axios.delete(`${baseUrl}/${id}`)
        .catch(error => {
            console.log(error);
            handleFail();
        })        
}

const update = (updatedPerson) => {
    //console.log(`${baseUrl}/${updatedPerson.id}`)
    const request = axios.put(`${baseUrl}/${updatedPerson.id}`, updatedPerson);
    return request.then(response => response.data);
}

const backEnd = { getAll, create, deleteFromDB, update };


export default backEnd;


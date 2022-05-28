import axios from "axios";
const baseUrl = process.env.REACT_APP_URL + "api/cosmetics";
//const baseUrl = "/api/cosmetics";

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data).catch(error => console.log("get all error"));
};

const getOne = (id) => {
  const request = axios.get(`${baseUrl}/${id}`);
  return request.then((response) => response.data).catch(error => console.log("get one  error"));
};

const create = (newObject) => {
  const config = {
    header: {Authentication: token}
  }
  const request = axios.post(baseUrl, newObject, config);
  return request.then((response) => response.data).catch(error => console.log("create  error"));
};

const update = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject);
  return request.then((response) => response.data).catch(error => console.log("update error"));
};

export default {
  getAll,
  getOne,
  create,
  update,
  setToken
};

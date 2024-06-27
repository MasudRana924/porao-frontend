import axios from "axios";
import { api } from './index';

const config = {
  headers: {
    "Content-Type": "application/json",
  },
};
// const getConfig = (token, contentType = "application/json") => {
//   const config = {
//     headers: {
//       "Content-Type": contentType,
//     },
//   };

//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }

//   console.log("Generated Config:", token); // Debugging: Log the config

//   return config;
// };



const fileConfig = {
  headers: {
    'Content-Type': 'multipart/form-data',
  },
};

export const publicGet = async (endpoint) => {
  // const config = getConfig();
  const response = await axios.get(`${api}${endpoint}`, config);
  return response.data;
};
export const publicGetSingle = async (endpoint, id) => {
  // const config = getConfig();
  const response = await axios.get(`${api}${endpoint}`, config);
  return response.data;
};
export const publicPost = async (endpoint, body) => {
  // const config = getConfig();
  const response = await axios.post(`${api}${endpoint}`, body, config);
  return response.data;
};

export const privateGet = async (endpoint, token) => {

  config.headers.token = `${token}`;
  // const config = getConfig();
  const response = await axios.get(`${api}${endpoint}`, config);
  return response.data;
};

export const privatePost = async (endpoint, token, body) => {
  config.headers.token = `${token}`;
  // const config = getConfig();
  const response = await axios.post(`${api}${endpoint}`, body, config);
  return response.data;
};
export const privatePutFile = async (endpoint, token, body) => {
  fileConfig.headers.token = `${token}`;
  const response = await axios.put(`${api}${endpoint}`, body, fileConfig);
  return response.data;
};

export const privatePut = async (endpoint, token, body) => {
  config.headers.token = `${token}`;
  // const config = getConfig();
  const response = await axios.put(`${api}${endpoint}`, body, config);
  return response.data;
};
export const privatePatch = async (endpoint, token, body) => {
  config.headers.token = `${token}`;
  // const config = getConfig();
  const response = await axios.patch(`${api}${endpoint}`, body, config);
  return response.data;
};

export const publicPatch = async (endpoint, body) => {
  // const config = getConfig();
  const response = await axios.patch(`${api}${endpoint}`, body, config);
  return response.data;
};
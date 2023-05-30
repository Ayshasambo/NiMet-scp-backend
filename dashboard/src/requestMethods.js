import axios from "axios";
//const BASE_URL = "http://localhost:5000/api/";
const BASE_URL = "https://tame-gray-bass-slip.cyclic.app/api/"

export const publicRequest = axios.create({
    baseURL: BASE_URL,
  });
  
  export const userRequest = axios.create({
    baseURL: BASE_URL,
    
  });
   
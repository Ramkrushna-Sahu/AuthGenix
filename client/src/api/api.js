import axios from "axios";
export default axios.create({
    baseURL: 'http://localhost:2000',
    withCredentials: true
})

// import axios from 'axios';

// const api = axios.create({
//     baseURL: 'http://localhost:2000' // Correct backend URL
// });

// export default api;
import axios from "axios";

const apiInstance = axios.create({
  baseURL: `http://localhost:8000/`,
});

apiInstance.interceptors.request.use((req) => {
  return req;
});

apiInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    return Promise.reject(error);
  }
);

export default apiInstance;

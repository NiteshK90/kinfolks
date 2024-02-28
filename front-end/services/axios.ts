import axios from "axios";

const apiInstance = axios.create({
  baseURL: `${process.env.Base_URL}/api/v1`,
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

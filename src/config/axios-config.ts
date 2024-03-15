import axios from "axios";
import { globalConfig } from "./global-config";
import { enqueueSnackbar } from "notistack";

//get token
const token = localStorage.getItem("token-auth");

const clientAxios = axios.create({
  baseURL: globalConfig.BASE_API_URL,
  headers: {
    Authorization: "Bearer" + token,
  },
});

clientAxios.interceptors.response.use(
  (response) => {
    const errorMessage = response.data?.message?.[0];
    const isSuccess = response.data?.isSuccess;

    if (errorMessage && !isSuccess) {
      enqueueSnackbar(errorMessage, {
        variant: "error",
      });
      return Promise.reject(response);
    }

    return response;
  },

  (error: any) => {
    // const statusCode = error?.response?.status;
    const errorMessage = error?.response?.message?.[0];
    const isSuccess = error?.response?.isSuccess;

    if (errorMessage && !isSuccess) {
      enqueueSnackbar(errorMessage, {
        variant: "error",
      });
    }

    return Promise.reject(error)
  }
);


export default clientAxios;

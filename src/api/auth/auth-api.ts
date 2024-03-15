import { BaseApi } from "api/base-api";
import clientAxios from "../../config/axios-config"




export const AuthApi = new ( class extends BaseApi {
     login = async ( formdata : any ) => {
        const response = await clientAxios
     }
})
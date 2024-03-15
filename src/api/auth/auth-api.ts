import { BaseApi } from "api/base-api";
import clientAxios from "../../config/axios-config"
import { BaseApiResponseShape } from "types/base-type";
import { LoginItemShape } from "types/data/auth/login-type";
import { AUTH_URLS } from "config/features/auth/auth-config";




export const AuthApi = new ( class extends BaseApi {
     login = async ( formdata : any ) => {
        const response = await clientAxios.post<BaseApiResponseShape<LoginItemShape>>(AUTH_URLS.login , formdata );
        return response.data;
     }

    userByToken = async ( token : string ) => {
        const response = await clientAxios.post<BaseApiResponseShape<LoginItemShape>>(AUTH_URLS.userByTocken , {tocken : token});
        return response.data;
    }
})
import $api from "../http";
import {AxiosResponse} from 'axios';
import { AuthResponse } from "../models/response/AuthResponse";

export default class AuthService {
    static async login (email: string, password: string): Promise<AxiosResponse<AuthResponse>>{
        return $api.post<AuthResponse>('/login', {email, password});
    }

    static async registration (email: string, password: string, name: string, surName: string): Promise<AxiosResponse<AuthResponse>>{
        return $api.post<AuthResponse>('/registration', {email, password, name, surName});
    }

    static async logout (): Promise<AxiosResponse<void>>{
        return $api.post('/logout');
    }

    static async reValidateMail(email: string, isActivated: boolean): Promise<AxiosResponse<AuthResponse>>{
        return $api.post('/revalidation_mail', {email, isActivated});
    }

}


import $api from "../http";
import { AxiosResponse } from 'axios';
import {
    ActivitesResponse,
    LecrutersResponse,
    UserResponse,
    UsersResponse,
} from '../models/response/AuthResponse'

export default class AdminService {

    static token = localStorage.getItem('token');

    static async getActivites(): Promise<AxiosResponse<ActivitesResponse>> {
        return $api.get<ActivitesResponse>('/get_activites', {
            headers: {
                Authorization: this.token,
            },
        });
    }

    static async getLecruters( requiredFields: string): Promise<AxiosResponse<LecrutersResponse>> {
        return $api.get<LecrutersResponse>('/get_lecturers', {
            headers: {
                Authorization: this.token,
            },
            params: {
                requiredFields
            }
        });
    }

    static async getUsers(
        requiredFields: string,
        skip?: number,
        limit?: number,
        serchQueryName?: string,
    ): Promise<AxiosResponse<UsersResponse>> {
        return $api.get<UsersResponse>('/get_users', {
            headers: {
                Authorization: this.token,
            },
            params: {
                skip,
                limit,
                requiredFields,
                serchQueryName
            }
        });
    }

    static async getUserById( userId: string, requiredFields: string): Promise<AxiosResponse<UserResponse>> {
        return $api.get<UserResponse>('/get_user', {
            headers: {
                Authorization: this.token,
            },
            params: {
                userId,
                requiredFields,
            },
        });
    }

    static async createNewRecordActivities(inputData: string[], dateData: string[]): Promise<AxiosResponse<boolean>> {
        return $api.get<boolean>('/create_new_record_activities', {
            headers: {
                Authorization: this.token,
            },
            params: {
                inputData,
                dateData
            }
        })
    }
}
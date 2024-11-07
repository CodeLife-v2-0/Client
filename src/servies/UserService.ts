import $api from "../http";
import { AxiosResponse } from 'axios';
import { IUser } from "../models/IUser";
import { AuthResponse, CoursesResponse } from "../models/response/AuthResponse";
import { TimeTableData } from "../models/TimeTableData";
import { ILecruter } from "../models/Lecturer";
import { ICourseR } from "../models/Course";


export default class UserService {
    static fetchUsers(): Promise<AxiosResponse<IUser[]>> {
        return $api.get<IUser[]>('/users')
    }
    static async fetchPrivateImage(
        imageName: string,
        token: string | null,
    ) {
        let response: AxiosResponse<ArrayBuffer>
        try {
            response = await $api.get(`/private_images/${imageName}`, {
                headers: {
                    Authorization: String(token),
                },
                responseType: 'arraybuffer',
            });
        } catch (e) {
            return null;
        }
        return new Blob([response.data], { type: response.headers['content-type'] });
    }
    static uploadAvatar(fileUrl: string, tokenData: string) {
        return $api.post('/upload_avatar', { image: fileUrl, tokenData });
    }

    static getLessonsData(token: string): Promise<AxiosResponse<TimeTableData>> {
        return $api.get<TimeTableData>('/get_lessons_for_user', {
            headers: {
                Authorization: String(token)
            }
        });
    }

    static async getCourses(requiredFields: string): Promise<AxiosResponse<CoursesResponse>> {
        return $api.get<CoursesResponse>('/get_courses', {
            params:{
                requiredFields
            } 
        });
    }

    static async getLecturer(userId: string): Promise<AxiosResponse<ILecruter>> {
        return $api.get<ILecruter>('/get_lecturer', {
            params:{
                userId
            } 
        });
    }

    static async getCourse(courseId: string): Promise<AxiosResponse<ICourseR>> {
        return $api.get<ICourseR>('/get_course', {
            params:{
                courseId
            } 
        });
    }

}


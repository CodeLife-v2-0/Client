import { IUser } from "../IUser";
import { IUserR } from "../IUserR";
import {IActivites} from '../Activites'
import {ILecruter} from '../Lecturer'
import { ICourseR } from "../Course";

export interface AuthResponse{
    accessToken: string;
    refreshToken: string;
    user: IUser;
}

export interface ActivitesResponse{
    activites: IActivites[] | null;
}

export interface LecrutersResponse{
    lecruters: ILecruter[] | null;
}

export interface UsersResponse{
    users: IUserR[] | null;
}

export interface UserResponse{
    user: IUserR | null;
}

export interface CoursesResponse{
    courses: ICourseR[] | null;
}
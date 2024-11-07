import { Dispatch, ReactNode, SetStateAction } from 'react';
import { makeAutoObservable } from "mobx";
import { IUser } from "../models/IUser";
import AuthService from "../servies/AuthService";
import AdminService from '../servies/AdminService';
import axios from "axios";
import { API_URL } from "../http";
import { AuthResponse } from "../models/response/AuthResponse";
import UserService from '../servies/UserService';
import { IActivites } from '../models/Activites';
import { loader } from '../localizationData';
import { TimeTableData } from '../models/TimeTableData';
import { ILecruter } from '../models/Lecturer';
import { ICourseR } from '../models/Course';

export default class Store {
    user = {} as IUser;
    isAuth = false;
    errorMes = ''
    isLoading = '';
    isEng = 0;
    isUpldateToken = false;
    lessonIsRequested = false;
    lessons: TimeTableData = {};
    token: string = localStorage.getItem('token') || '';
    lecturers: { [userId: string]: ILecruter } = {}
    courses: { [courseId: string]: ICourseR } = {}
    avatarList: { [userId: string]: string } = {}

    constructor() {
        makeAutoObservable(this);
    }

    setAuth(bool: boolean) {
        this.isAuth = bool;
    }

    async getLessons() {
        if (!this.lessonIsRequested) {
            const response = await UserService.getLessonsData(this.token);
            this.lessons = response.data
            this.lessonIsRequested = true;
        }
        return this.lessons;
    }

    async getPrivateImage(
        imageName: string,
        setImageUrl: Dispatch<SetStateAction<string>>,
        loading: Dispatch<SetStateAction<boolean>>
    ) {
        if (!(imageName in this.avatarList)) {
            try {
                const response = await UserService.fetchPrivateImage(imageName, this.token);
                const blob = await response!;
                this.avatarList.imageName = URL.createObjectURL(blob);
            } catch (error) {
                this.avatarList.imageName = 'img/dafault_image/bad_upload.png';
            } finally {
                setImageUrl(this.avatarList.imageName);
                loading(false);
            }
        }

    }

    async getLecturer(lecruterId: string) {
        if (!(lecruterId in this.lecturers)) {
            const response = await UserService.getLecturer(lecruterId);
            this.lecturers.lecruterId = response.data
        }
        return this.lecturers.lecruterId
    }

    async getCourse(courseId: string) {
        if (!(courseId in this.courses)) {
            const response = await UserService.getCourse(courseId);
            this.courses.courseId = response.data
        }
        return this.courses.courseId
    }

    setUpldateToken(upldateState: boolean) {
        this.isUpldateToken = upldateState;
    }

    setUser(user: IUser) {
        this.user = user;
    }

    setLoading(outMassege: string) {
        this.isLoading = outMassege;
    }

    setError(errorMessage: string) {
        this.errorMes = errorMessage;
    }

    setLang() {
        const newLeng = this.isEng ? 0 : 1;
        this.isEng = newLeng;
        localStorage.setItem('language', newLeng.toString());
    }

    checkExistenceLenguage() {
        const potential = localStorage.getItem('language');
        this.isEng = potential == null ? 1 : Number(potential);
    }

    clearError() {
        this.errorMes = '';
    }

    async login(email: string, password: string, func: () => void) {
        this.setLoading(['Вход', 'Login'][this.isEng]);
        try {
            const response = await AuthService.login(email, password);
            localStorage.setItem('token', response.data.accessToken);
            this.setAuth(true);
            this.setUser(response.data.user);
            func();
            setTimeout(() => this.setLoading(''), 1000);
        } catch (error) {
            this.setLoading('');
            if (typeof error === 'object' && error !== null) {
                const errorMessage = (error as any).response?.data?.message || 'Произошла ошибка';
                this.setError(errorMessage);
            } else {
                this.setError('Произошла ошибка');
            }
            this.clearError();
        }
        finally {
            this.clearError();
        }
    }

    async registration(email: string, password: string, name: string, surName: string, func: () => void) {
        this.setLoading(loader.createAccount[this.isEng]);
        try {
            const response = await AuthService.registration(email, password, name, surName);
            localStorage.setItem('token', response.data.accessToken);
            this.setAuth(true);
            this.setUser(response.data.user);
            func();
        } catch (e) {
            if (typeof e === 'object' && e !== null) {
                console.log((e as any).response?.data?.message);
            } else {
                console.log(e);
            }
            const errorMessage = (e as any).response?.data?.message || 'Произошла ошибка';
            this.setError(errorMessage);
            this.clearError();
        } finally {
            this.setLoading('');
            this.clearError();
        }
    }

    async logout() {
        this.setLoading(loader.cleanCache[this.isEng]);
        try {
            await AuthService.logout();
            localStorage.removeItem('token');
            this.setAuth(false);
            this.setUser({} as IUser);
        } catch (e) {
            if (typeof e === 'object' && e !== null) {
                console.log((e as any).response?.data?.message);
            } else {
                console.log(e);
            }
        } finally {
            this.setLoading('');
        }
    }

    async reValidateMail() {
        this.setLoading(loader.sendMail[this.isEng]);
        try {
            await AuthService.reValidateMail(this.user.email, this.user.isActivated);
        } catch (e) {
            if (typeof e === 'object' && e !== null) {
                console.log((e as any).response?.data?.message);
            } else {
                console.log(e);
            }
        } finally {
            this.setLoading('');
        }
    }

    async checkAuth(reloading: boolean = true, customLoader: Dispatch<SetStateAction<boolean>> | null = null) {
        if (customLoader) {
            customLoader(true)
        }
        if (reloading) this.setLoading(loader.load[this.isEng]);
        try {
            const response = await axios.get<AuthResponse>(`${API_URL}/refresh`, { withCredentials: true })
            localStorage.setItem('token', response.data.accessToken);
            this.setAuth(true);
            this.setUser(response.data.user);
        } catch (e) {
            if (typeof e === 'object' && e !== null) {
                console.log((e as any).response?.data?.message);
            } else {
                console.log(e);
            }
        } finally {
            if (reloading) this.setLoading('');
            if (customLoader) {
                customLoader(false)
            }
        }
    }


    async uploadAvatar(fileUrl: string) {
        try {
            const token = localStorage.getItem('token')
            const tokenData = token ? token : '';
            const imgName = await UserService.uploadAvatar(fileUrl, tokenData);
            this.user.avatar = imgName.data;
        } catch (error) {
            console.log('Ошибка при выполнении запроса на сервер');
        }
    }

    async getActivites(setAccess: Dispatch<SetStateAction<boolean>>) {
        try {
            const responsePromise = await AdminService.getActivites();
            if (responsePromise.status !== 200) {
                setAccess(false);
                return null;
            }
            setAccess(true);
            const response: IActivites[] | null = responsePromise.data.activites;
            if (response) return response;

        } catch (error) {
            setAccess(false)
            console.log('Ошибка при выполнении запроса на сервер');
        }
        return null;
    }

    async createNewRecordActivities(inputData: string[], dateData: string[]) {
        return await AdminService.createNewRecordActivities(inputData, dateData);
    }
}  
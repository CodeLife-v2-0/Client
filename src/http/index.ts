import axios from 'axios';
import { AuthResponse } from '../models/response/AuthResponse';

export const API_URL = `http://localhost:5000/api`;

const $api = axios.create({
    withCredentials: true,
    baseURL: API_URL
})

$api.interceptors.request.use((config)=>{
    config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
    return config;
})

$api.interceptors.response.use((config)=>{
    return config;
},
async (error) => {
    const originalRequest = error.congig;
    if(error.response.status == 401  && error.config && !error.config.__isRetry){
        originalRequest.__isRetry = true;
        try{
            const response = await axios.get<AuthResponse>(`${API_URL}/refresh`, { withCredentials: true });
            localStorage.setItem('token', response.data.accessToken);
            return $api.request(originalRequest);
        } catch(e){
            console.log('Не авторизованный пользователь')
        }
    }
    throw error;
}
)

export default $api;
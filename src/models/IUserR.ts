export interface IUserR{
    email: string;
    name: string;
    surName: string;
    isActivated?: boolean;
    _id: string;
    role: string;
    avatar?: string;
    subjects?: string; 
}
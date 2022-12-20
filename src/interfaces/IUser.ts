import { Request } from "express";
export default interface IUser {
    _id: number;
    firstName: string;
    lastName: string;
    fullName: string;
    email: string; 
}
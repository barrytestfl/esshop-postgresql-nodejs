import { Request } from "express";
export default interface IUser {
    _id: string;
    firstName: string;
    lastName: string;
    fullName: string;
    email: string;
    password: string;
}
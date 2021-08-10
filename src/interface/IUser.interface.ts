import { Request } from 'express';
export interface IUserInformation {
        name: string,
        emailId: string,
        password: string
}


export interface IRequestExtended extends Request{
       user : ILoginInfo
}

export interface ILoginInfo{
        emailId: string,
    password: string
   
}


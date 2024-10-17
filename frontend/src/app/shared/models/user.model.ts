export interface ILogin{
    email:string;
    password:string;
}

export interface IRegister extends ILogin{
    username:string;
}
export interface ILoginReponse extends IUser    {
    accessToken: string;
    userId: string; 
    user: IUser;
  }
  
  export interface IUser {
    id: number;
    email: string;
    username:string;
  }
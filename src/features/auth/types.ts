export interface User{
 id:string,
 name:string,
email:string,
role:string,
token:string,
phone:string
}

export interface AuthState{
    user:User | null;
     token: string | null;
    loading:boolean;
    error:string | null;
}
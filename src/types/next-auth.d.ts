import 'next-auth'

declare module 'next-auth'{
    interface User{
        _id?: string;
        username: string;
        email: string;
        firstname: string;
        lastname: string;
    }
    interface Session{
        user:{
            _id?: string;
            username: string;
            email:string
            firstname: string;
            lastname: string;
        }
    }
}

declare module 'next-auth/jwt'{
    interface JWT{
        _id?:string
        username: string;
        email:string
        firstname: string;
        lastname: string;
    }
}
import 'next-auth'

declare module 'next-auth'{
    interface User{
        _id?: string;
        name: string;
    }
    interface Session{
        user:{
            name: string;
            _id?: string;
        }
    }
}

declare module 'next-auth/jwt'{
    interface JWT{
        _id?:string
        name: string;
    }
}
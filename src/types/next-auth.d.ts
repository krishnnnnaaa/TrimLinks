import 'next-auth'

declare module 'next-auth'{
    interface User{
        _id?: string;
    }
    interface Session{
        user:{
            _id?: string;
        }
    }
}

declare module 'next-auth/jwt'{
    interface JWT{
        _id?:string
    }
}
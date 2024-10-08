import mongoose, {Schema, Document} from 'mongoose';


// Url Interface
 
export interface Url extends Document{
    shortId: string,
    redirectUrl: string,
    createdAt: Date,
    views: number,
}


// Url Schema

const UrlSchema: Schema<Url> = new Schema({
shortId:{
    type: String,
    required: true,
},
redirectUrl:{
    type: String,
    required: true,
},
createdAt:{
    type: Date,
    required: true,
    default: new Date()
},
views: {
    type: Number,
    required: true,
    default: 0
}
})


// User Interface

export interface User extends Document{
    firstname: string,
    lastname: string,
    username: string,
    email: string,
    password: string,
    createdAt: Date,
    urls: Url[],
    verified: boolean
    verificationToken: string | null,
    verificationTokenExpiry: Date | null,
    passwordResetToken: string | null,
    passwordResetTokenExpiry: Date | null,
}


// User Schema

const UserSchema:Schema<User> = new Schema({

    firstname:{
        type: String,
        required: true
    },
    lastname:{
        type: String,
        required: true
    },
    username:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true,
    },
    password:{
        type: String,
        required: true
    },
    createdAt:{
        type: Date,
        required: true,
        default: Date.now
    },
    urls: [UrlSchema],
    verified: {
        type: Boolean,
        default: false,
    },
    verificationToken: {
        type: String,
        required: true,
        default: null,
    },
    verificationTokenExpiry: {
        type: Date,
        required: true,
        default: null,
    },
    passwordResetToken:{
        type: String,
        default: null,
    },
    passwordResetTokenExpiry:{
        type: Date,
        default: null,
    },

})


const UserModel = (mongoose.models.User as mongoose.Model<User>) || mongoose.model<User>("User", UserSchema);

const UrlModel = (mongoose.models.Url as mongoose.Model<Url>) || mongoose.model<Url>("Url", UrlSchema);

export {UserModel, UrlModel}
import mongoose, {Schema, Document, Mongoose} from 'mongoose';


// Url Interface
 
export interface Url extends Document{
    shortId: string,
    redirectUrl: string,
    createdAt: Date,
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
    default: Date.now
},
})


// User Interface

export interface User extends Document{
    name: string,
    email: string,
    password: string,
    createdAt: Date,
    urls: Url[],
    passwordResetToken: string,
    passwordResetTokenExpiry: Date,
}


// User Schema

const UserSchema:Schema<User> = new Schema({
    name:{
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
    passwordResetToken:{
        type: String,
    },
    passwordResetTokenExpiry:{
        type: Date,
    },

})


const UserModel = (mongoose.models.User as mongoose.Model<User>) || mongoose.model<User>("User", UserSchema);

const UelModel = (mongoose.models.Url as mongoose.Model<Url>) || mongoose.model<Url>("Url", UrlSchema);

export {UserModel, UrlSchema}
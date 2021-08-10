import mongoose = require("mongoose");
import * as bcrypt from 'bcrypt'
import { IUserInformation } from '../interface/IUser.interface';


const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    emailId: {
        type: String,
        required: true,
        unique: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    password: {
        type: String,
        required: true
    }
})
UserSchema.pre<IUserInformation>('save', async function(next: (arg0: any) => void){
    try {
        
        const salt = await bcrypt.genSalt(5);
        const hashPassword = await bcrypt.hash(this.password, salt);
    
        console.log('password', hashPassword)
    
        this.password = hashPassword;
    
    
    } catch (error) {
        next(error)
    }
    })
    
    UserSchema.methods.isValidPassword= async function (password: string | Buffer, hashPassword: string) {
        try {
          return await bcrypt.compare(password, hashPassword)
        } catch (error) {
          throw error
        }
      }

export const User = mongoose.model<IUserInformation & mongoose.Document>('users', UserSchema );
import mongoose from "mongoose";
import express from "express"
import UserService from "../controller/user";
import bcrypt, { hash } from "bcrypt"
import { User } from "../model/user.model";
import * as jwt from "jsonwebtoken";


class UserClass{
    public router = express.Router();
    protected service : UserService
    public saltRounds = 10;
    public myPlaintextPassword = 's0/\/\P4$$w0rD';
    userService: any;

    

    constructor() {
        this.router.post('/users/add', this._signUp);
        this.router.post('/signin', this._signIn);
        this.service = new UserService();
    }
    private _signUp = async (req: express.Request, res: express.Response) => {
        User.find({emailId: req.body.emailId })
        .exec()
        .then(async (user: any) =>{
            if(user.length >= 1) {
                return res.status(409).json({
                    message: 'Mail exists'
               });
            } else{
                const salt = await bcrypt.genSalt(this.saltRounds);
        const hash = await bcrypt.hash(this.myPlaintextPassword, salt);
        const name = req.body.name
        const emailId = req.body.emailId
        const hasedPassword =bcrypt.hash(req.body.password, 10, (err, hash) => {
            if (err) {
                return res.status(500).json({
                    error: err
                });
            } else {
                const user = new User({
                    _id: new mongoose.Types.ObjectId(),
                    name: req.body.name,
                    emailId: req.body.emailId,
                    password: hash
                });
                user
                    .save()
                    .then((result: any) => {
                        console.log(result);
                        res.status(201).json({
                            message: 'User created'
                        });
                    })
                    .catch((err: any) => {
                        console.log(err);
                        res.status(500).json({
                            error: err
                        });
                    });
            }
        });
    }
            
        })
    }
        
    private _signIn = async (req: express.Request, res: express.Response) => {
        User.find({ emailId: req.body.emailId})
        .exec()
        .then(async (user: any) =>{
            if(user.length < 1) {
                return res.status(401).json({
                    message: 'Your not a user'
                });
            }
            bcrypt.compare(req.body.password, user[0].password, (err,result)=>{
                if(err) {
                    return res.status(401).json({
                        message: 'You are not a user'
                    });
                }
                if(result) {
                    const token = jwt.sign(
                        {
                        email: user[0].email
                    }, process.env.PORT,
                    {
                        expiresIn: "1h"

                    }
                    );
                    return res.status(200).json({
                        message: 'User signin successful'
                        token : token
                    });
                }
                res.status(401).json({
                    message: 'You are not a user'
                });

            });
        })
        .catch((err: any) => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        })
}
}

export default UserClass


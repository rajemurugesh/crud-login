import * as express from 'express'
import { User } from '../model/user.model';
import AuthService from "../service/Auth.service";

class AuthRoute  {

    public router = express.Router();
    protected authService:AuthService; 
    
    constructor() {
        this.router.post('/signup', this._signup);
        this.router.post('/signin', this._signIn);
        this.authService = new AuthService();
    }
    
    private  _signup = async (req: express.Request, res: express.Response) => {
        User.find({emailId: req.body.emailId})
        .exec()
        .then(async (User: any)=>{
            if(User.length >= 1) {
                return res.status(409).json({
                    message: 'Mail exists'
                })
            }
               });
        try {
            const {name, emailId, password}= req.body

            const result = await this.authService.signUp({name, emailId, password});   


            if(!result && result === undefined){
                throw new Error('unable to save');
            }
            
            res.json({ data :  result });  
        } catch (err) {
 
            console.log("Error occured in _signup");

                res.status(400).json({
                });  
           
        }
       
    }


    private  _signIn = async (req: express.Request, res: express.Response) => {

        try {

            const { emailId, password
                 }= req.body

            const result = await this.authService.signIn({emailId, password
                });   


            if(!result && result === undefined){
                throw new Error('unable to get details');
            }
            
            res.json({ data :  result });  
        } catch (err) {
 
            console.log("Error occured in _signIn",);

                res.status(400).json({
                });  
           
        }
       
    }

    
        }

export default AuthRoute
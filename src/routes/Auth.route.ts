import * as express from 'express'
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

        try {
            const {name, emailId, password}= req.body

            const result = await this.authService.signUp({name, emailId, password});   


            if(!result && result === undefined){
                throw new Error('unable to save');
            }
            
            res.json({ data :  result });  
        } catch (err) {
 
            console.log("Error occured in _signup",err);

                res.status(400).json({
                    message: err.toString()
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
 
            console.log("Error occured in _signIn",err);

                res.status(400).json({
                    message: err.toString()
                });  
           
        }
       
    }

    
        }

export default AuthRoute
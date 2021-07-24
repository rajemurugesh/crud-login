import { User } from './../model/user.model';
import { ILoginInfo, IUserInformation } from "../interface/user.interface";

class UserService{

    public async signUp(userInformation: IUserInformation ): Promise<any> {
        
        try {
            const user = new User({
                name: userInformation.name,
                emailId: userInformation.emailId,
                password: userInformation.password
            });

            return await user.save();
        }catch(err){
            console.debug("Error occured in signup", err);
            throw err;
        }
    }
    public async signIn(userInformation: ILoginInfo): Promise<any> {
        try {
       
            const user : ILoginInfo = {
              name: userInformation.name,  
              emailId: userInformation.emailId,
              password: userInformation.password,
            }
            const userDbInfo = await User.find({'emailId': userInformation.emailId}).exec();
            if(userDbInfo.length){
                return{
                    status: true,
                    message: "Signin Successfully",
                } 
                }else{
                    throw new Error('User Not Found, Please signUp or please check your mail')
            } 
        } catch (err){
            console.log("Exception occured in signIn", err);
            throw err
        }
    }
    }

export default UserService
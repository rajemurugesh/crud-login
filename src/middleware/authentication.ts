// import { Request, Response } from 'express'
// import * as jwt from "jsonwebtoken";
// import { IRequestExtended } from '../interface/IUser.interface';

// const authenticateToken = (req: IRequestExtended, resp: Response, next: () => void) => {

//   try {

//     console.log('came to auth')
//     const authHeader = req.headers['authorization']
//     const token = authHeader && authHeader.split(' ')[1]
//     console.log(token)
//     if (token == null){
//       return resp.sendStatus(401)
//     } 
  
//     jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err: any, user: any) => {
//       console.log(err)

      
//       if (err) {return resp.sendStatus(403)}
    
//       console.log('token verified');
//       req.user = user
//       next()
//     })

//   } catch (error) {
//     console.log('Authentication error  ===', error);

//     throw error
//   }
    

// }

// export default authenticateToken;

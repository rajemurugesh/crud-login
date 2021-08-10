"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv").config();
const user_model_1 = require("../model/user.model");
class AuthService {
    /* function to create new User */
    signUp(userInformation) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = new user_model_1.User({
                    emailId: userInformation.emailId,
                    password: userInformation.password,
                    userType: userInformation.userType,
                });
                return yield user.save();
            }
            catch (err) {
                console.debug("Error occured in signup", err);
                throw err;
            }
        });
    }
    /* function to Login and get accessToken and RefreshToken */
    signIn(userInformation) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = {
                    name: userInformation.name,
                    emailId: userInformation.emailId,
                    password: userInformation.password,
                };
                const userDbInfo = yield user_model_1.User.find({ 'emailId': userInformation.emailId }).exec();
                if (userDbInfo.length) {
                    return {
                        status: true,
                        message: "Signin Successfully",
                    };
                }
                else {
                    throw new Error('User Not Found, Please signUp or please check your mail');
                }
            }
            catch (err) {
                console.log("Exception occured in signIn", err);
                throw err;
            }
        });
    }
}
exports.default = AuthService;

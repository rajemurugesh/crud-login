"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = __importStar(require("express"));
const Auth_service_1 = __importDefault(require("../service/Auth.service"));
class AuthRoute {
    constructor() {
        this.router = express.Router();
        this._signup = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { userName, firstName, lastName, password, emailId, phoneNumber, appUser, userType, documentUrl, socialAuth } = req.body;
                const result = yield this.authService.signUp({ userName, firstName, lastName,
                    password, emailId, phoneNumber, appUser, userType, documentUrl, socialAuth });
                if (!result && result === undefined) {
                    throw new Error('unable to save');
                }
                res.json({ data: result });
            }
            catch (err) {
                console.log("Error occured in _signup", err);
                res.status(400).json({
                    message: err.toString()
                });
            }
        });
        this._signIn = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { emailId, password } = req.body;
                const result = yield this.authService.signIn({ name,
                    password, emailId });
                if (!result && result === undefined) {
                    throw new Error('unable to get details');
                }
                res.json({ data: result });
            }
            catch (err) {
                console.log("Error occured in _signIn", err);
                res.status(400).json({
                    message: err.toString()
                });
            }
        });
        this.router.post('/signup', this._signup);
        this.router.post('/signin', this._signIn);
        this.authService = new Auth_service_1.default();
    }
}
exports.default = AuthRoute;

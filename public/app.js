"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const body_parser_1 = __importDefault(require("body-parser"));
const app = express_1.default();
dotenv_1.default.config();
app.use(body_parser_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json());
app.get('/', (req, res) => {
    res.json({
        message: "APP is running fine"
    });
});
app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});

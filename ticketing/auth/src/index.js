"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var body_parser_1 = require("body-parser");
var current_user_1 = require("./routes/current_user");
var sign_in_1 = require("./routes/sign_in");
var sign_out_1 = require("./routes/sign_out");
var sign_up_1 = require("./routes/sign_up");
var app = express_1.default();
app.use(body_parser_1.json());
app.use(current_user_1.currentUserRouter);
app.use(sign_in_1.signInRouter);
app.use(sign_out_1.signOutRouter);
app.use(sign_up_1.signUpRouter);
app.listen(3000, function () {
    console.log('Listening on port 3000!');
});

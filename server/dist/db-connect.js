"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const DEFAULT_CONNECTION_STRING = 'mongodb://127.0.0.1:27017/studyBuddy';
// Connect to mongoDB with the connection string given as argument
function connectToDatabase(connectionString = DEFAULT_CONNECTION_STRING) {
    return mongoose_1.default.connect(connectionString);
}
exports.default = connectToDatabase;

import mongoose from 'mongoose';

const DEFAULT_CONNECTION_STRING: string = 'mongodb://127.0.0.1:27017/studyBuddy';

// Connect to mongoDB with the connection string given as argument
export default function connectToDatabase(connectionString: string = DEFAULT_CONNECTION_STRING) {
    return mongoose.connect(connectionString);
}
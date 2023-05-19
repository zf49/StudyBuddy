import mongoose from 'mongoose';

const DEFAULT_CONNECTION_STRING: string = 'mongodb+srv://wpan088:pwx970221@cluster0.qkk29vu.mongodb.net/';

// Connect to mongoDB with the connection string given as argument
export default function connectToDatabase(connectionString: string = DEFAULT_CONNECTION_STRING) {
    return mongoose.connect(connectionString);
}
import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

const MONGODB_URI =
	process.env.MONGODB_URI || 'mongodb://localhost:27017/telegram_bot';

export async function connectToDatabase() {
	try {
		await mongoose.connect(MONGODB_URI);
		console.log('Connected to MongoDB');
	} catch (error) {
		console.error('Error connecting to MongoDB:', error);
		process.exit(1);
	}
}

export async function disconnectFromDatabase() {
	if (mongoose.connection.readyState !== 0) {
		await mongoose.disconnect();
		console.log('Disconnected from MongoDB');
	}
}


const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect('mongodb+srv://camgianggg12:363v4A84N8NrPJQG@cluster0.zf7y9.mongodb.net/tênCSDL', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MongoDB connected successfully');
    } catch (error) {
        console.error('MongoDB connection error:', error);
        process.exit(1); // Dừng ứng dụng nếu không kết nối được
    }
};

module.exports = connectDB;

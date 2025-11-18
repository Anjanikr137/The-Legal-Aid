const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
    try {
        // Remove deprecated options for newer MongoDB driver versions
        const conn = await mongoose.connect(process.env.MONGODB_URI);

        console.log(`✅ MongoDB Connected Successfully!`);
        console.log(`   Database: ${conn.connection.name}`);
        console.log(`   Host: ${conn.connection.host}`);
        
        return conn;
    } catch (error) {
        console.error('❌ MongoDB Connection Error:', error.message);
        console.error('   Please check:');
        console.error('   1. Your MongoDB Atlas IP whitelist (Network Access)');
        console.error('   2. Your username and password in .env file');
        console.error('   3. Your internet connection');
        throw error; // Re-throw error so it can be caught by app.js
    }
};

module.exports = connectDB;


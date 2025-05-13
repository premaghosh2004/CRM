const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const criminalRoutes = require('./routes/criminalRoutes');
const judgeRoutes = require('./routes/judgeRoutes')
const authRoutes = require('./routes/authRoutes')


const app = express();


app.use(express.json());
app.use(cors())




const PORT = process.env.PORT || 5000;


const MONGO_URI = process.env.MONGO_URI;


const startServer = async () => {
    try {
        // Connect to MongoDB
        await mongoose.connect(MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MongoDB connected successfully');

        // Start server only after successful database connection
        app.listen(PORT, () => {
            console.log(`Server running on http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error('Error connecting to MongoDB:', error.message);
        process.exit(1); // Exit the process with failure if connection fails
    }
};


app.use('/auth', authRoutes);
app.use('/api/criminals', criminalRoutes);
app.use('/api/judge', judgeRoutes);


startServer();

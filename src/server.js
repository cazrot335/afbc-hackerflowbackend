const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const profileRoutes = require('./routes/profileRoutes');
const serviceRoutes = require('./routes/serviceRoutes');
const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRoutes');

dotenv.config();
connectDB();

const app = express();
app.use(express.json());
app.use(cors());

app.use('/api/profile', profileRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
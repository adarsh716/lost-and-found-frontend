// server.js
const express = require('express');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const profileRoutes = require('./routes/profileRoutes')
const bodyParser = require('body-parser');
const cors = require('cors');  
require('dotenv').config();

const app = express();

app.use(cors("*"));

app.use(bodyParser.json());

connectDB();

app.use('/api/auth', authRoutes);
app.use('/api/profile',profileRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

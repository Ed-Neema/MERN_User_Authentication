require('dotenv').config()
const express = require('express');
const app = express();
const connectDB = require("./config/db");

// connect DB
connectDB();
app.use(express.json());

// connecting our routes
app.use('/api/auth',require('./routes/auth'));

const PORT = process.env.PORT || 5050;

app.listen(PORT, ()=>{
    console.log(`Server running on ${PORT}`);
})

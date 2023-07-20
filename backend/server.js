require('dotenv').config()
const express = require('express');
const app = express();
const connectDB = require("./config/db");
const errorHandler = require("./middleware/error")
// connect DB
connectDB();
app.use(express.json());

// connecting our routes
app.use('/api/auth',require('./routes/auth'));
// Error Handler Middleware(Error handler should be the last piece of middleware)
app.use(errorHandler);

const PORT = process.env.PORT || 5050;
const server = app.listen(PORT, ()=>{
    console.log(`Server running on ${PORT}`);
})
process.on("unhandledRejection", (err, promise) => {
  console.log(`Logged Error: ${err.message}`);
  server.close(() => process.exit(1));
});

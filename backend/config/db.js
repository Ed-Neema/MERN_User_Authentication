const mongoose = require("mongoose");

const connectDB = async()=>{
    const connect = await mongoose.connect(process.env.MONGO_URI);
    console.log(
      "DB Connected",
      connect.connection.host,
      connect.connection.name
    );
}

module.exports = connectDB;
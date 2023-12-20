const mongoose = require("mongoose");

const MONGO_URL =
  process.env.MONGODB_URL || "mongodb://localhost:27017/flipkart";

const databaseconnect = () => {
    mongoose.connect(MONGO_URL)
        .then((conn) => console.log(`connected to db ${conn.connection.host}`))
        .catch((err) => console.log(err.message));
    
}

module.exports = databaseconnect;

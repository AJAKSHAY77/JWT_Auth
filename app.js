const express = require("express");
const authRouter = require("./router/authRouter");

const databaseconnect = require("./config/databaseconfig");



const app = express();

databaseconnect()

app.use(express.json());


app.use("/api/auth/",authRouter)


app.use('/', (req, res) => {
    res.status(201).json({
        Data:"JWT dauth server -updated"
    })
})

module.exports = app;
const express = require("express");
const authRouter = require("./router/authRouter");
const cookieparser = require("cookie-parser");
const cors = require("cors");

const databaseconnect = require("./config/databaseconfig");

const app = express();

databaseconnect();

app.use(express.json());
app.use(cookieparser());
app.use(
  cors({
    origin: [process.env.CLIENT_URL],
    credentials: true,
  })
);

app.use("/api/auth/", authRouter);

app.use("/", (req, res) => {
  res.status(201).json({
    Data: "JWT dauth server -updated",
  });
});

module.exports = app;

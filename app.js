const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const url = process.env.uri;
const app = express(); //start the express server
const authToken = require("./middleware/authToken");

var cors = require("cors");

app.use(cors()); // Use this after the variable declaration

mongoose
  .connect(url, {
    useNewUrlParser: true,

    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("connected..");
  })
  .catch((err) => {
    console.log("error in connection", err);
  }); //connext to db

let a={
  _id: "62ff233abd4eb0248ae65361",
  user: "62f3759ca7331fdf1d1f147f",
  weburl: 'https://www.w3schools.com/html/tryit.asp?filename=tryhtml_formatting_cite',
  shortenedUrl: 'http://localhost:9000/lT5c16st3',
  clicks: 1,
  __v: 0
}



app.use(express.json());
const userRouter = require("./routes/Users");
app.use("/users", authToken, userRouter);

const authRouter = require("./routes/auth");
app.use("/", authRouter);

const urlShortRouter = require("./routes/urlShortener");
app.use("/", urlShortRouter);


const PORT = 9000;
app.listen(PORT, () => {
  console.log("server started");
});

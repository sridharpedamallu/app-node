const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
const port = 3000;

mongoose
  .connect(process.env.DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => {
    app.listen(process.env.PORT || port, () => {
      console.log("DB connected");
      console.log(`Server listening at ${port}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });

app.get("/", (req, res) => {
  res.send(process.env.DB_URI);
});

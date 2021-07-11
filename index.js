const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors")
require("dotenv").config();

const app = express();
app.use(cors())
const port = 3000;

app.use(express.urlencoded({extended: true}));
app.use(express.json())


const user_routes = require("./routes/user.route")


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


app.use("/api/users", user_routes)

app.get("/", (req, res) => {
  res.send('V0.1');
});

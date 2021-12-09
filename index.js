const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const router = require("./api/API");
require("dotenv").config()
app.use(cors());

app.use(express.json());

app.use("/api", router);

mongoose.connect(
  process.env.MONGODB,
  { useNewUrlParser: true, useUnifiedTopology: true, autoIndex: true },
  () => console.log("Connected to db")
);

const PORT = process.env.PORT || 5000 ;

app.listen(PORT, () => console.log(`Server is up and running on ${PORT}`));

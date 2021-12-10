const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const router = require("./api/API");
const path = require("path")
require("dotenv").config()
app.use(cors());

app.use(express.json());

app.use("/api", router);
app.use(express.static(path.join(__dirname, "public")))
mongoose.connect(
  process.env.DB,
  { useNewUrlParser: true, useUnifiedTopology: true, autoIndex: true },
  () => console.log("Connected to db")
);

const PORT = process.env.PORT || 5000 ;

app.listen(PORT, () => console.log(`Server is up and running on ${PORT}`));

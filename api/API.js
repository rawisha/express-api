const express = require("express");
const router = express.Router();
const Post = require("../models/Post");
const sgMail = require("@sendgrid/mail");
require("dotenv").config()
const API_KEY = process.env.API_KEY;
sgMail.setApiKey(API_KEY);

// Adds new data to database
router.post("/adduser", (req, res) => {
  const newPost = new Post({
    name: req.body.name,
    lastname: req.body.lastname,
    age: req.body.age,
    email: req.body.email,
    password: req.body.password,
    adress: req.body.adress,
  });
  newPost.save(err => {
    if (err) {
      console.log(err);
      res.status(500).json({
        message: {
          msgBody: "An error occured while saving post data",
          msgError: true,
        },
      });
    } else {
      res.status(201).json({
        message: { msgBody: "Post data succefully saved", msgError: false },
      });
    }
  });
});

// Same as above, but we change the endpoint to Register
router.post("/register", (req, res) => {
  console.log(req.body);
  const newPost = new Post({
    name: req.body.name,
    lastname: req.body.lastname,
    age: req.body.age,
    email: req.body.email,
    password: req.body.password,
    adress: req.body.adress,
  });
  newPost.save(err => {
    if (err) {
      console.log(err);
      res.status(500).json({
        message: {
          msgBody: "An error occured while saving post data",
          msgError: true,
        },
      });
    } else {
      res.status(201).json({
        message: { msgBody: "Post data succefully saved", msgError: false },
      });
    }
  });
  const message = {
    to: req.body.email,
    from: "rawvsmaw22@gmail.com",
    subject: "Thank you for Registering with us",
    text: "You have Successfully created an account with us",
    html: "<h2>You have Successfully created an account with us</h2>",
  };
  sgMail
    .send(message)
    .then(res => console.log("Email sent"))
    .catch(error => console.log(error));
});

// Gets posts and displays it
router.get("/getposts", (req, res) => {
  Post.find({}, (err, documents) => {
    if (err) {
      res.status(500).json({
        message: {
          msgBody: "An error occudred while retriving data",
          msgError: true,
        },
      });
    } else {
      res.status(200).json({ posts: documents });
    }
  });
});

// Gets posts and displays it
router.get("/getposts/:id", (req, res) => {
  Post.findById(req.params.id, {}, (err, documents) => {
    if (err) {
      res.status(500).json({
        message: {
          msgBody: "An error occudred while retriving data",
          msgError: true,
        },
      });
    } else {
      res.status(200).json({ posts: documents });
    }
  });
});

// Updates data based on id given by the database
router.put("/updateuser/:id", (req, res) => {
  Post.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      lastname: req.body.lastname,
      age: req.body.age,
      email: req.body.email,
      password: req.body.password,
      adress: req.body.adress,
    },
    err => {
      if (err) {
        res.status(500).json({
          message: {
            msgBody: "An error occured while updating post data",
            msgError: true,
          },
        });
      } else {
        res.status(200).json({
          message: {
            msgBody: "Post data succefully updated",
            msgError: false,
          },
        });
      }
    }
  );
});

// Deletes data based on id given by the database
router.delete("/deletepost/:id", (req, res) => {
  Post.findByIdAndDelete(req.params.id, err => {
    if (err) {
      res.status(500).json({
        message: {
          msgBody: "An error occured while deleting post data",
          msgError: true,
        },
      });
    } else {
      res.status(200).json({
        message: { msgBody: "Post data succefully deleted", msgError: false },
      });
    }
  });
});
module.exports = router;

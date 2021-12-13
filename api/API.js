const express = require("express");
const router = express.Router();
const Post = require("../models/Post");
const sendMail = require("../email-service");
require("dotenv").config()


// Adds new data to database wit the request body
router.post("/adduser", (req, res) => {
  const newPost = new Post({
    name: req.body.name,
    lastname: req.body.lastname,
    age: req.body.age,
    email: req.body.email,
    password: req.body.password,
    adress: req.body.adress,
  });
  // saves the new data to the database with the content of the request body.
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
  // saves the new data to the database with the content of the request body.
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
    // Using the sendMail function that has been emported from the email-service js and passing the request body to the function.
    sendMail(req.body)
  });
});

// Grabs all the posts and returns it
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

// Gets posts with an ID( 1 user ) and returns it
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

// Updates the post data based on which user id it has been given.
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

// Deletes data from the database with the help of ID has been given.
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

// exports the router and makes it usuable through out the app.
module.exports = router;

const express = require("express");
const router = express.Router();
const Blog = require("../model/Blog");
const mongoose = require("mongoose");
const checkAuth = require("../middleware/checkAuth");
const jwt = require("jsonwebtoken");

router.post("", checkAuth, (req, res) => {
  const token = req.headers.authorization.split(" ")[1];
  const verify = jwt.verify(token, "sbs 147");
  const newBlog = new Blog({
    _id: new mongoose.Types.ObjectId(),
    userId: verify.userId,
    imageUrl: req.body.imageUrl,
    title: req.body.title,
    categoryId: req.body.categoryId,
    categoryTitle: req.body.categoryTitle,
    blogDetail: req.body.blogDetail,
    userName: verify.firstName + " " + verify.lastName,
  });
  newBlog
    .save()
    .then((result) => {
      res.status(200).json({
        newBlog: result,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
});
//get all blogs

router.get("/getAllBlogs", (req, res) => {
  Blog.find()
    .select("_id userId categoryId categoryTitle title imageUrl userName")
    .then((result) => {
      res.status(200).json({
        blogs: result,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
});

//get own blogs

router.get("/", checkAuth, (req, res) => {
  const token = req.headers.authorization.split(" ")[1];
  const verify = jwt.verify(token, "sbs 147");
  Blog.find({ userId: verify.userId })
    .select("_id userId categoryId categoryTitle title imageUrl userName")
    .then((result) => {
      res.status(200).json({
        blogList: result,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
});

//get blogs by category
router.get("/getBycategory/:id", (req, res) => {
    Blog.find({categoryId:req.params.id})
      .select("_id userId categoryId categoryTitle title imageUrl userName")
      .then((result) => {
        res.status(200).json({
          blogs: result,
        });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({
          error: err,
        });
      });
  });

//delete own blogs
router.delete("/:id", (req, res) => {
  const token = req.headers.authorization.split(" ")[1];
  const verify = jwt.verify(token, "sbs 147");
  console.log(verify);

  Blog.deleteOne({ _id: req.params.id, userId: verify.userId })
    .then((result) => {
      if (result.deletedCount == 0) {
        return res.status(401).json({
          msg: "something is wrong",
        });
      }
      res.status(200).json({
        msg: "deleted success",
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
});

//update
router.put("/:id", checkAuth, (req, res) => {
  const token = req.headers.authorization.split(" ")[1];
  const verify = jwt.verify(token, "sbs 147");
  console.log(verify);

  Blog.find({ _id: req.params.id, userId: verify.userId })
    .then((result) => {
      if (result.length == 0) {
        return res.status(400).json({
          msg: "something went wrong",
        });
      }

      Blog.findOneAndUpdate(
        { _id: req.params.id, userId: verify.userId },
        {
          $set: {
            userId: verify.userId,
            imageUrl: req.body.imageUrl,
            title: req.body.title,
            categoryId: req.body.categoryId,
            categoryTitle: req.body.categoryTitle,
            blogDetail: req.body.blogDetail,
            userName: verify.firstName + " " + verify.lastName,
          },
        }
      )
        .then((result) => {
          res.status(200).json({
            msg: result,
          });
        })
        .catch((err) => {
          console.log(err);
          res.status(500).json({
            error: err,
          });
        });
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
});

module.exports = router;

const express = require('express');

const router = express.Router();
const users = require("./userDb")
const posts = require("../posts/postDb")

//works
router.post('/', validateUser(), (req, res) => {
  users.insert(req.body)
    .then((user) => {
      res.status(201).json(user)
    })
    .catch((error) => {
      next(error)
    })
});

//not working
router.post('/:id/posts', validatePost(), (req, res) => {
  posts.insert(req.body)
  .then((post)=>{
      res.status(201).json(post)

  })
  .catch((error) => {
      next(error)
    })
});

//works
router.get('/', (req, res) => {
  users.get()
    .then((users) => {
      res.status(200).json(users)
    })
    .catch((error) => {
      next(error)
    })
});

//works
router.get('/:id', validateUserID(), (req, res) => {
  res.status(200).json(req.user)

});

//working
router.get('/:id/posts', validateUserID(), (req, res) => {
  users.getUserPosts(req.params.id)
    .then((posts) => {
      res.status(200).json(posts)
    })
    .catch((error) => {
      next(error)
    })
});

//works
router.delete('/:id', validateUserID(), (req, res) => {
  users.remove(req.params.id)
    .then((count) => {
      if (count > 0) {
        res.status(200).json({
          message: `${count} users deleted`
        })
      } else {
        res.status(400).json({
          message: "User not found"
        })
      }
    })
    .catch((error) => {
      next(error)
    })
});

//works
router.put('/:id', validateUserID(), validateUser(), (req, res) => {
  users.update(req.params.id, req.body)
    .then((user) => {
      res.status(200).json(user)
    })
    .catch((error) => {
      next(error)
    })
});

//custom middleware

function validateUserID(req, res, next) {
  return (req, res, next) => {
    users.getById(req.params.id)
      .then((user) => {
        if (user) {
          req.user = user
          next()
        } else {
          res.status(400).json({
            message: "invalid user id"
          })
        }
      })
      .catch(next)
  }
}

function validateUser(req, res, next) {
  return (req, res, next) => {
    if (!req.body) {
      res.status(400).json({
        message: "missing user data"
      })
    }
    if (!req.body.name) {
      res.status(400).json({
        message: "missing required name field"
      })
    }
    next()
  }
}

function validatePost(req, res, next) {
  return (req, res, next) => {
    if (!req.body) {
      res.status(400).json({
        message: "missing post data"
      })
    }
       next()
    //  if (!req.params.text) {
    //   res.status(400).json({
    //     message: "missing required text field"
    //   })

    // }
   
    }
  }


module.exports = router;

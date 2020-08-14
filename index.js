const express = require("express")

const server = express()
const usersRouter = require("./users/userRouter")

const logger = require('./middleware/logger')
const validateUserId = require('./users/userRouter')
const validatePost = require('./users/userRouter')
const validateUser = require('./users/userRouter')
const port = 8080

server.use(express.json())
server.use(logger())
server.use(usersRouter)


server.listen(port, ()=>{
    console.log(`Server running on port ${port}`)
})
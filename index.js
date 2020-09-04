const express = require("express")
const actionRouter = require('./data/helpers/actionRouter')
const projectRouter = require('./data/helpers/projectRouter')
const logger = require("./middleware/logger")



const server = express()
const port = 8200

server.use(express.json())

server.use(logger())

server.use('/action', actionRouter)
server.use('/project', projectRouter)

server.get("/", (req, res) => {
    res.json({
        message: "welcome to the littiness"
    })
})

server.listen(port, () => {
    console.log(`server start on port -> ${port}`)
})
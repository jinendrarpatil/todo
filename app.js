const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const connectMongoDB = require('./init/mongodb')
const todoRouter = require('./routes/todo')
const dotenv = require('dotenv')

dotenv.config()

const app = express()

//mongodb connection
connectMongoDB()

app.set("view engine", "ejs")
app.use(express.static(path.join(__dirname, "public")))
app.use(bodyParser.urlencoded({ extended: true }))
app.use('/', todoRouter)

module.exports = app;
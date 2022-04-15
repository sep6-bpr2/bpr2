const express = require('express')
require('dotenv').config()
// const cors = require('cors')
const helmet = require("helmet");
const mssql = require('../connections/MSSQLConnection')
const fs = require('fs')


// Routes that contain the endpoints
function initializeRoutes(app) {
    app.use("/login", require("./routes/login"))
	app.use("/users", require("./routes/users"))
    app.use("/controlPoints", require("./routes/controlPoints"))
	app.use("/createControlPoint", require("./routes/createControlPoint"))
}

// Functions that are called before the actual endpoint is reached
function initializeMiddleware(app) {
    app.use(helmet())
    // app.use(cors())
    app.use(express.json())
}

const app = express()

initializeMiddleware(app)
initializeRoutes(app)

mssql.getConnections()

module.exports = app

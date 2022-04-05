const express = require('express')
const bodyParser = require('body-parser')
require('dotenv').config()
// const cors = require('cors')
const helmet = require("helmet");
const mssql = require('../connections/MSSQLConnection')


// Routes that contain the endpoints
function initializeRoutes(app) {
    app.use("/login", require("./routes/login"))
	app.use("/users", require("./routes/users"))
    app.use("/controlPoints", require("./routes/controlPoints"))

}

// Functions that are called before the actual endpoint is reached
function initializeMiddleware(app) {
    app.use(helmet())
    // app.use(cors())
    app.use(express.json())
	app.use(bodyParser.urlencoded({ extended: false }));
	app.use(bodyParser.json());
}

const app = express()

initializeMiddleware(app)
initializeRoutes(app)

mssql.getConnections()

module.exports = app

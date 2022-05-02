const express = require('express')
require('dotenv').config()
// const cors = require('cors')
const helmet = require("helmet");
const mssql = require('./connections/MSSQLConnection')


// Routes that contain the endpoints
function initializeRoutes(app) {
    app.use("/users", require("./routes/users"))
    app.use("/controlPoints", require("./routes/controlPoints"))
    app.use("/orders", require("./routes/orders"))

}

// Functions that are called before the actual endpoint is reached
function initializeMiddleware(app) {
    app.use(helmet())
    // app.use(cors())
    app.use(express.json())
    if(process.env.LOGGING == "true"){
        app.use(require("./middleware/loggingMiddleware"))
    }
}

const startServer = () => {
    const app = express()

    initializeMiddleware(app)
    initializeRoutes(app)

    mssql.getConnections()

    return app
}

module.exports.startServer = startServer
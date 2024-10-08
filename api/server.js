const express = require('express')
require('dotenv').config()
const helmet = require("helmet");

// Routes that contain the endpoints
function initializeRoutes(app) {
    app.use("/users", require("./routes/users"))
    app.use("/controlPoints", require("./routes/controlPoints"))
    app.use("/orders", require("./routes/orders"))
    app.use("/location", require("./routes/location"))
	app.use("/itemCategory",require("./routes/itemCategory"))
}

// Functions that are called before the actual endpoint is reached
function initializeMiddleware(app) {
    app.use(helmet())
	app.use(express.json({limit: '50mb'}));
	app.use(express.urlencoded({limit: '50mb'}));
    app.use(express.json())
    if(process.env.LOGGING == "true"){
        app.use(require("./middleware/loggingMiddleware"))
    }
}

const startServer = () => {
    const app = express()

    initializeMiddleware(app)
    initializeRoutes(app)

    return app
}

module.exports.startServer = startServer

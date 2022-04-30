async function logging(req, res, next){
    console.log("[" + new Date().toLocaleString() + "] - [INFO] - Called: " + req.method + " " + req.originalUrl )
    next()
}

module.exports = logging 
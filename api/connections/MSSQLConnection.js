const mssql = require('mssql')
let mssqlV8 = null
if(process.env.DATABASE == "konfairProduction" || process.env.DATABASE == "konfairTesting"){
    mssqlV8 = require("mssql/msnodesqlv8")
}

const pools = new Map();

let konfairDB;
let localDB;

const get = (name, config, useNormalMssql) => {
    if (!pools.has(name)) {
        if (!config) {
            throw new Error('Pool does not exist');
        }
        let pool
        if(useNormalMssql){
            pool = new mssql.ConnectionPool(config);
        }else{
            pool = new mssqlV8.ConnectionPool(config);
        }
        // automatically remove the pool from the cache if `pool.close()` is called
        const close = pool.close.bind(pool);
        pool.close = (...args) => {
            pools.delete(name);
            return close(...args);
        }
        pools.set(name, pool.connect());
    }
    return pools.get(name);
}

module.exports.getConnectionsOwn = async () => {
    if (process.env.environment != "testing") {
        // localDB = await get("Own", "Server=172.16.1.38,50259;Database=Own;User Id=rafal;Password=uogauoga123*;Encrypt=true;trustServerCertificate=true;", true)

        if (process.env.DATABASE == "konfairProduction" || process.env.DATABASE == "konfairTesting") {
            localDB = await get("Own", {
                database: "Own",
                server: "SRVAPP3\\SQLEXPRESS",
                driver: "msnodesqlv8",
                options: {
                  trustedConnection: true
                }}, false)
        } else if (process.env.DATABASE == "local") {
            localDB = await get("Own", "Server=localhost,1433;Database=own;User Id=sa;Password=konf123!proj;Encrypt=true;trustServerCertificate=true;", true)
        } else {
            localDB = await get("Own", "Server=bpr2.database.windows.net,1433;Database=own;User Id=rafal;Password=Microsoft4zure;Encrypt=true;trustServerCertificate=true;", true)
        }
    }
}

module.exports.getConnectionsKonfair = async () => {
    if (process.env.environment != "testing") {
        if (process.env.DATABASE == "konfairProduction") {
            konfairDB = await get("Konfair", {
                database: "KonfAir-2018-daily",
                server: "srvsql",
                driver: "msnodesqlv8",
                options: {
                  trustedConnection: true
                }}, false)
        } else if (process.env.DATABASE == "konfairTesting") {
            konfairDB = await get("Konfair", {
                database: "konfair",
                server: "SRVAPP3\\SQLEXPRESS",
                driver: "msnodesqlv8",
                options: {
                  trustedConnection: true
                }}, false)
        } else if (process.env.DATABASE == "local") {
            console.log("Getting the connection")
            konfairDB = await get("Konfair", "Server=localhost,1433;Database=konfair;User Id=sa;Password=konf123!proj;Encrypt=true;trustServerCertificate=true;", true)
        } else {
            konfairDB = await get("konfair", "Server=bpr2.database.windows.net,1433;Database=konfair;User Id=rafal;Password=Microsoft4zure;Encrypt=true;trustServerCertificate=true;", true)
        }
    }
}


module.exports.konfairDB = async () => {
    if (konfairDB == null) {
        try {
            await module.exports.getConnectionsKonfair()
            return konfairDB
        } catch (err) {
            console.log("[" + new Date().toLocaleString() + "] - [ERROR] - Failed to connect to database - Own")
            return null
        }
    }else{
        return konfairDB
    }
}
module.exports.localDB = async () => {
    if (localDB == null) {
        try {
            await module.exports.getConnectionsOwn()
            return localDB

        } catch (err) {
            console.log("[" + new Date().toLocaleString() + "] - [ERROR] - Failed to connect to database - Konfair")
            return null
        }
    }else{
        return localDB
    }
}

module.exports.mssql = mssql
// module.exports.mssqlV8 = mssqlV8


const mssql = require('mssql')
const pools = new Map();

let konfairDB;
let localDB;

const get = (name, config) => {
    if (!pools.has(name)) {
        if (!config) {
            throw new Error('Pool does not exist');
        }
        const pool = new mssql.ConnectionPool(config);
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
        if (process.env.DATABASE == "konfair") {
            localDB = await get("Own", "Server=172.16.1.38,50259;Database=Own;User Id=rafal;Password=uogauoga123*;Encrypt=true;trustServerCertificate=true;")
        } else if (process.env.DATABASE == "local") {
            localDB = await get("Own", "Server=localhost,1433;Database=Own;User Id=sa;Password=konf123!proj;Encrypt=true;trustServerCertificate=true;")
        } else {
            localDB = await get("own", "Server=bpr2.database.windows.net,1433;Database=own;User Id=rafal;Password=Microsoft4zure;Encrypt=true;trustServerCertificate=true;")
        }
    }
}

module.exports.getConnectionsKonfair = async () => {
    if (process.env.environment != "testing") {
        if (process.env.DATABASE == "konfair") {
            konfairDB = await get("Konfair", "Server=172.16.1.38,50259;Database=konfair;User Id=rafal;Password=uogauoga123*;Encrypt=true;trustServerCertificate=true;")
        } else if (process.env.DATABASE == "local") {
            konfairDB = await get("Konfair", "Server=localhost,1433;Database=konfair;User Id=sa;Password=konf123!proj;Encrypt=true;trustServerCertificate=true;")
        } else {
            konfairDB = await get("konfair", "Server=bpr2.database.windows.net,1433;Database=konfair;User Id=rafal;Password=Microsoft4zure;Encrypt=true;trustServerCertificate=true;")
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

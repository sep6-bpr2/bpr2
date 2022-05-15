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

module.exports.getConnections = async () => {
    if (process.env.environment != "testing") {
        
        if(process.env.DATABASE == "local"){
            konfairDB = await get("Konfair", "Server=localhost,1433;Database=konfair;User Id=sa;Password=konf123!proj;Encrypt=true;trustServerCertificate=true;")
            localDB = await get("Own", "Server=localhost,1433;Database=Own;User Id=sa;Password=konf123!proj;Encrypt=true;trustServerCertificate=true;")
        }else{
            konfairDB = await get("konfair", "Server=bpr2.database.windows.net,1433;Database=konfair;User Id=rafal;Password=Microsoft4zure;Encrypt=true;trustServerCertificate=true;")
            localDB = await get("own", "Server=bpr2.database.windows.net,1433;Database=own;User Id=rafal;Password=Microsoft4zure;Encrypt=true;trustServerCertificate=true;")
        }
     }
}

module.exports.konfairDB = () => {
    return konfairDB
}
module.exports.localDB = () => {
    return localDB
}

module.exports.mssql = mssql

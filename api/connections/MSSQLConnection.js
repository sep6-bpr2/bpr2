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
    // docker pull mcr.microsoft.com/mssql/server
    // docker run -e "ACCEPT_EULA=Y" -e "SA_PASSWORD=konf123!proj" -p 1433:1433 -d mcr.microsoft.com/mssql/server:2019-CU15-ubuntu-20.04

    if (process.env.environment != "testing") {

        konfairDB = await get("Konfair", "Server=localhost,1433;Database=konfair;User Id=sa;Password=konf123!proj;Encrypt=true;trustServerCertificate=true;")
        localDB = await get("Own", "Server=localhost,1433;Database=Own;User Id=sa;Password=konf123!proj;Encrypt=true;trustServerCertificate=true;")

        // konfairDB = await get("Konfair", "Server=konfdb.database.windows.net,1433;Database=konfair;User Id=Odinaka@konfdb;Password=konf123!proj;Encrypt=true;trustServerCertificate=true;")
        // localDB = await get("Own", "Server=owndatabase.database.windows.net,1433;Database=Own;User Id=Odinaka@owndatabase;Password=konf123!proj;Encrypt=true;trustServerCertificate=true;")
    }
}

module.exports.konfairDB = () => {
    return konfairDB
}
module.exports.localDB = () => {
    return localDB
}

module.exports.mssql = mssql

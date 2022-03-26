const mssql = require('mssql')
const pools = new Map();

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

async function getConnections(){
    konfairDB = await get("Konfair", "Server=localhost,1433;Database=KonfairDatabase;User Id=sa;Password=r00t.R00T;Encrypt=true;trustServerCertificate=true;")
    localDB = await get("Own", "Server=localhost,1433;Database=OurDatabase;User Id=sa;Password=r00t.R00T;Encrypt=true;trustServerCertificate=true;")

    console.log(await konfairDB.request().query('select * from "KonfAir DRIFT$Item"'))
    console.log(await localDB.request().query('select * from "SystemUser"'))
    console.log(await konfairDB.request().query('select * from "KonfAir DRIFT$Item"'))
}

let konfairDB = {}
let localDB = {}

getConnections()

module.exports.konfairDB = konfairDB
module.exports.localDB = localDB

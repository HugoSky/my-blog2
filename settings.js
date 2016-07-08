/**
 * Itdoater Blog's entire config information
 */

var appInfo = {
    buildDev: false,
    isDebug: false,
    hotPostNum: 5,
};

var dbInfo = {
    poolSize: 20,
    address: 'localhost:27017/test'
}

module.exports = {
    appInfo: appInfo,
    dbInfo: dbInfo
};

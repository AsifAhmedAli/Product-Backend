const geoip = require('geoip-lite');

const getLocation = (ip) => {
    var geo = geoip.lookup(ip);
    console.log("Location", geo);
    return geo;
}

module.exports = getLocation;
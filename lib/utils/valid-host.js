/**
 * Check if a sub-domain is valid
 * @param {String} hostname sub-domain
 * @returns {Boolean} true if valid
 */
const isValidHost = (hostname) => {
    if (typeof hostname !== 'string') {
        return false;
    }
    const regex = /^[\da-z]([\da-z-]{0,61}[\da-z])?$/i;
    return regex.test(hostname);
};

module.exports = {
    isValidHost,
};

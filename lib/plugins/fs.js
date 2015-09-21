/**
 * Provides very simple file system handler for the following events
 * emitted either by Vapor or plugin:
 * * `readFile` -> fileName, callback(error, data)
 * * `writeFile` -> fileName, data, callback(error)
 *
 * @example
 * // use the default folder './data'
 * bot.use(vapor.plugins.fs);
 *
 * // use our own data folder
 * bot.use(vapor.plugins.fs, './myDataFolder');
 * @param {Object} VaporAPI Instance of the API class.
 * @module
 */
var fs = require('fs');
var path = require('path');

exports.name = 'fs';

exports.plugin = function(VaporAPI) {

    var dataDir = VaporAPI.data || './data';

    // Create data directory
    if (!fs.existsSync(dataDir)){
        fs.mkdirSync(dataDir);
    }

    function readFile(fileName, callback) {
        fs.readFile(path.join(dataDir, fileName), callback);
    }

    function writeFile(fileName, data, callback) {
        fs.writeFile(path.join(dataDir, fileName), data, callback);
    }

    // Handle the 'readFile' event
    VaporAPI.registerHandler({emitter: 'vapor', event: 'readFile'}, readFile);
    VaporAPI.registerHandler({emitter: 'plugin', plugin: '*', event: 'readFile'}, readFile);

    // Handle the writeFile event
    VaporAPI.registerHandler({emitter: 'vapor', event: 'writeFile'}, writeFile);
    VaporAPI.registerHandler({emitter: 'plugin', plugin: '*', event: 'writeFile'}, writeFile);

};
const paths = require('../../paths');
const createEnvSettingsFile = require('../envSettings.js');
module.exports = app => {
    app.get(paths.settingsJsPath, (req, res) => {
        res.contentType('text/javascript');
        res.send(createEnvSettingsFile());
    });
};

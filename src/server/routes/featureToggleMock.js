const paths = require('../../paths');
const featureToggles = require('../../fixtures/featuretoggleMock.json');
module.exports = app => {
    app.get(paths.featurePath, (req, res) => {
        res.json(featureToggles);
    });
};

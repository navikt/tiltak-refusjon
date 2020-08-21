const paths = require('../../paths');
const dummyLoginUrl =
    'http://localhost:8080/tiltak-refusjon-api/local/cookie?subject=01010099999&redirect=http://localhost:3000/tiltak-refusjon';
module.exports = app => {
    app.get(paths.redirectTilLoginPath, (req, res) => {
        res.redirect(process.env.LOGIN_URL || dummyLoginUrl);
    });
};

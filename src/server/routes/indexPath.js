const paths = require('../../paths');
const path = require('path');
const express = require('express');
const buildPath = path.join(__dirname, '../../../build');

module.exports = (app, html) => {
    app.use(paths.basePath, express.static(buildPath, { index: false }));
    app.get('/', (req, res) => {
        res.redirect(301, paths.basePath);
    });
    app.get(`${paths.basePath}/*`, (req, res) => {
        res.send(html);
    });
};

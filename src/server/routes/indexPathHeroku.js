const paths = require('../../paths');
const path = require('path');
const express = require('express');
const buildPath = path.join(__dirname, '../../../build');
module.exports = app => {
    app.use(paths.basePath, express.static(buildPath));
    app.get('/', (req, res) => {
        res.redirect(301, paths.basePath);
    });
    app.get(`${paths.basePath}/*`, (req, res) => {
        res.sendFile(path.resolve(buildPath, 'index.html'));
    });
};

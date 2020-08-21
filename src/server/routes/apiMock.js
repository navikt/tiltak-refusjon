const express = require('express');
const cookieParser = require('cookie-parser');
const uuid = require('uuid');
const cookieName = 'localhost-idtoken';
/**
 * Mock for å
 */
module.exports = function (app) {
    app.use(express.json());
    app.use(cookieParser());

    app.use((req, res, next) => {
        if (!req.cookies[cookieName]) {
            res.cookie(cookieName, uuid.v1(), {maxAge: 900000, httpOnly: false});
        }
        next();
    });

    app.get("/refusjon/fake", (req, res) => {
        res.json({id: "1"});
    });
};

const express = require('express');
const app = express();
const mustacheExpress = require('mustache-express');
const getDecorator = require('./routes/decorator');
const internalRoutes = require('./routes/internals');
const indexRoute = require('./routes/indexPath');
const loginRoutes = require('./routes/login');
const apiProxy = require('./routes/apiProxy');
const settingsJsRoutes = require('./routes/settingsJs');
const port = process.env.PORT || 3000;
const path = require('path');
const buildPath = path.join(__dirname, '../../build');
app.engine('html', mustacheExpress());
app.set('view engine', 'mustache');
app.set('views', buildPath);

const renderApp = decoratorFragments =>
    new Promise((resolve, reject) => {
        app.render('index.html', decoratorFragments, (err, html) => {
            if (err) {
                reject(err);
            } else {
                resolve(html);
            }
        });
    });

const startServer = html => {
    console.log('start regular server');
    settingsJsRoutes(app);
    loginRoutes(app);
    apiProxy(app);
    internalRoutes(app);
    indexRoute(app, html);
    app.listen(port, () => {
        console.log('Server listening on port', port);
    });
};

/**
 * Config for running the regular server
 *
 * @param app
 * @param port
 */

getDecorator()
    .then(renderApp, error => {
        console.error('Kunne ikke hente dekoratør ', error);
        process.exit(1);
    })
    .then(startServer, error => {
        console.error('Kunne ikke rendre app ', error);
        process.exit(1);
    });

const paths = require("../../paths");
module.exports = app => {
  app.get(paths.isAlivePath, (req, res) => res.sendStatus(200));
  app.get(paths.isReadyPath, (req, res) => res.sendStatus(200));
};

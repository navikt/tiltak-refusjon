const apiMockRoutes = require("./server/routes/apiMock");
const apiProxyRoutes = require("./server/routes/apiProxy");
const internalRoutes = require("./server/routes/internals");
const loginRoutes = require("./server/routes/login");
/**
 * Dette er configen som `craco start` bruker...
 * @param app
 */
module.exports = function(app) {
  internalRoutes(app);
  loginRoutes(app);
  if (process.env.REACT_APP_MOCK) {
    //featureTogglesMock(app);
    apiMockRoutes(app);
  } else {
    apiProxyRoutes(app);
  }
};

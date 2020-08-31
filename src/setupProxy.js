const apiMockRoutes = require("./server/routes/apiMock");
const apiProxyRoutes = require("./server/routes/apiProxy");
/**
 * Dette er configen som `craco start` bruker...
 * @param app
 */
module.exports = function(app) {
  if (process.env.REACT_APP_MOCK) {
    //featureTogglesMock(app);
    apiMockRoutes(app);
  } else {
    apiProxyRoutes(app);
  }
};

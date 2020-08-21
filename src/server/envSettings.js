function createEnvSettingsFile() {
    const settings = JSON.stringify({
        MILJO: process.env.NAIS_CLUSTER_NAME || 'local',
    });
    return `window.appSettings = ${settings};`;
}
module.exports = createEnvSettingsFile;

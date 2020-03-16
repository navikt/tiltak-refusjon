const whitelistPaths = ['refusjon'];

if (process.env.NODE_ENV === 'development') {
    // Funksjoner som bare skal finnes lokalt, bl.a. generering av id-token
    whitelistPaths.push('local');
}

const whitelist = {};
whitelistPaths.forEach(url => {
    const fraUrl = '^/tiltak-refusjon-api' + url;
    const tilUrl = '/tiltak-refusjon-api' + url;
    whitelist[fraUrl] = tilUrl;
});

module.exports = whitelist;

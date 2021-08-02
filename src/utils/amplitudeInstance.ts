import amplitude from 'amplitude-js';

const key = () =>
    window.location.hostname === 'tiltak-refusjon.nav.no'
        ? '3a6fe32c3457e77ce81c356bb14ca886'
        : '55477baea93c5227d8c0f6b813653615';

const amplitudeInstance = amplitude.getInstance();

amplitudeInstance.init(key(), '', {
    apiEndpoint: 'amplitude.nav.no/collect',
    saveEvents: false,
    includeUtm: true,
    batchEvents: false,
    includeReferrer: true,
});

export default amplitudeInstance;

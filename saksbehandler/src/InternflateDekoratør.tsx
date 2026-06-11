import { FunctionComponent } from 'react';

const env = () => {
    if (window.location.hostname.includes('localhost')) {
        return 'local';
    }
    if (window.location.hostname.includes('intern.dev.nav.no')) {
        return 'dev';
    }
    return 'prod';
};

const InternflateDekoratør: FunctionComponent = () => {
    return (
        <internarbeidsflate-decorator
            app-name="Tiltaksrefusjon"
            proxy="/modiacontextholder"
            environment={env() === 'prod' ? 'prod' : 'q2'}
            fnr-sync-mode="ignore"
            enhet-sync-mode="ignore"
            fetch-active-enhet-on-mount
            fetch-active-user-on-mount
            url-format="NAV_NO"
            enable-hotkeys
            show-hotkeys={false}
        />
    );
};

export default InternflateDekoratør;

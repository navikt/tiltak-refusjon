import React, { FunctionComponent } from 'react';
import NAVSPA from '@navikt/navspa';

export interface DecoratorProps {
    enhet?: string | undefined; // Konfigurasjon av enhet-kontekst
    accessToken?: string | undefined; // Manuell innsending av JWT, settes som Authorization-header. Om null sendes cookies vha credentials: 'include'
    fnr?: string | undefined; // Konfigurasjon av fødselsnummer-kontekst
    userKey?: string | undefined; // Om man ikke ønsker å bruke fnr i urler, kan andre apper kalle contextholder for å generere en midlertidig kode. Hvis App A skal navigere til App B som har dekoratøren, må App A først sende en post request til /fnr-code/generate med {fnr: string} i bodyen, dette returnerer {fnr: string, code: string} til App A. App A kan så navigere til App B og sende med denne koden. App B kan så sende den koden inn til dekoratøren i userKey  propen og så henter dekoratøren fnr for den koden fra contextholderen.
    enableHotkeys?: boolean | undefined; // Aktivere hurtigtaster
    fetchActiveEnhetOnMount?: boolean | undefined; // Om enhet er undefined fra container appen, og denne er satt til true, henter den sist aktiv enhet og bruker denne.
    fetchActiveUserOnMount?: boolean | undefined; // Om fnr er undefined fra container appen, og denne er satt til true for at den skal hente siste aktiv fnr.
    fnrSyncMode?: 'sync' | 'writeOnly' | 'ignore'; // Modus til fnr state management. "sync" er default. "writeOnly" gjør at endringer aldri hentes men vil settes dersom det oppdateres lokalt i appen
    enhetSyncMode?: 'sync' | 'writeOnly' | 'ignore'; // Samme som fnrSyncMode, men for enhet state.
    onEnhetChanged: (enhetId?: string | null, enhet?: Enhet) => void; // Kalles når enheten endres
    onFnrChanged: (fnr?: string | null) => void; // Kalles når fnr enheten endres
    onLinkClick?: (link: { text: string; url: string }) => void; // Kan brukes for å legge til callbacks ved klikk på lenker i menyen. Merk at callbacken ikke kan awaites og man må selv håndtere at siden lukkes. Nyttig for å f.eks tracke navigasjon events i amplitude
    appName: string; // Navn på applikasjonen
    hotkeys?: Hotkey[]; // Konfigurasjon av hurtigtaster
    markup?: Markup; // Egen HTML
    showEnheter: boolean; // Vis enheter
    showSearchArea: boolean; // Vis søkefelt
    showHotkeys: boolean; // Vis hurtigtaster
    environment: Environment; // Miljø som skal brukes.
    urlFormat: UrlFormat; // URL format
    proxy?: string | undefined; // Manuell overstyring av urlene til BFFs. Gjør alle kall til relativt path hvis true, og bruker verdien som domene om satt til en string. Default: false
}

export interface Markup {
    etterSokefelt?: string; // Gir muligheten for sende inn egen html som blir en del av dekoratøren
}

export interface Enhet {
    readonly enhetId: string;
    readonly navn: string;
}

// Miljø
export type Environment = 'q0' | 'q1' | 'q2' | 'q3' | 'q4' | 'prod' | 'local' | 'mock';

export type UrlFormat = 'LOCAL' | 'NAV_NO' | 'ANSATT'; // UrlFormat. Brukes om proxy ikke er satt & i url til websocket.

export interface HotkeyObject {
    char: string;
    altKey?: boolean;
    ctrlKey?: boolean;
    metaKey?: boolean;
    shiftKey?: boolean;
}

export interface HotkeyDescription {
    key: HotkeyObject;
    description: string;
    forceOverride?: boolean;
}

export interface ActionHotKey extends HotkeyDescription {
    action(event: KeyboardEvent): void;
}

export interface DocumentingHotKey extends HotkeyDescription {
    documentationOnly: boolean;
}

export type Hotkey = ActionHotKey | DocumentingHotKey;

const InternflateDecorator = NAVSPA.importer<DecoratorProps>('internarbeidsflate-decorator-v3');

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
        <InternflateDecorator
            appName="Tiltaksrefusjon"
            proxy="/modiacontextholder"
            onEnhetChanged={() => {}}
            onFnrChanged={() => {}}
            fetchActiveUserOnMount={true}
            fetchActiveEnhetOnMount={true}
            fnrSyncMode="ignore"
            enhetSyncMode="ignore"
            showEnheter={false}
            showSearchArea={false}
            showHotkeys={false}
            environment={env() === 'prod' ? 'prod' : 'q2'}
            urlFormat="NAV_NO"
        />
    );
};

export default InternflateDekoratør;

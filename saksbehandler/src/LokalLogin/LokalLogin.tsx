import axios from 'axios';
import React, { FunctionComponent, useState } from 'react';
import VerticalSpacer from '../komponenter/VerticalSpacer';
import { InnloggetBruker } from '../bruker/BrukerContextType';
import { useCookies } from 'react-cookie';
import { TextField, Button, Label } from '@navikt/ds-react';

const AAD_COOKIE_NAME = `aad-token`,
    TOKENX_COOKIE_NAME = `tokenx-token`;

type Props = {
    innloggetBruker: InnloggetBruker | undefined;
};

const LokalLogin: FunctionComponent<Props> = (props) => {
    const [subject, setSubject] = useState('X123456');
    const [, , removeCookie] = useCookies();

    const loggInnKnapp = async (subject: string) => {
        const response = await axios.get(
            `https://tiltak-fakelogin.ekstern.dev.nav.no/token?aud=aud-aad&iss=aad&sub=${subject}&NAVident=${subject}&oid=00000000-0000-0000-0000-000000000000`
        );
        document.cookie = `${AAD_COOKIE_NAME}=${response.data};expires=Tue, 15 Jan 2044 21:47:38 GMT;domain=${window.location.hostname};path=/`;
        window.location.reload();
    };

    const loggUtClick = () => {
        removeCookie(AAD_COOKIE_NAME);
        removeCookie(TOKENX_COOKIE_NAME);
        window.location.reload();
    };

    if (props.innloggetBruker !== undefined) {
        return (
            <div style={{ display: 'flex', justifyContent: 'flex-end', backgroundColor: 'white', padding: '0.5rem' }}>
                <Button variant="tertiary" onClick={loggUtClick}>
                    Logg ut
                </Button>
            </div>
        );
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <VerticalSpacer rem={2} />
            <Label>Logg inn med NAV-ident</Label>
            <VerticalSpacer rem={1} />
            <div style={{ display: 'flex', alignItems: 'flex-end' }}>
                <TextField
                    hideLabel
                    label=""
                    placeholder="Logg inn som"
                    value={subject}
                    onChange={(event) => setSubject(event.currentTarget.value)}
                    maxLength={7}
                />
                <Button
                    variant="primary"
                    style={{ marginLeft: '0.5rem' }}
                    disabled={!subject}
                    onClick={() => loggInnKnapp(subject)}
                >
                    Logg inn
                </Button>
            </div>
            <VerticalSpacer rem={2} />
        </div>
    );
};

export default LokalLogin;

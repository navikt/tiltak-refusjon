import { History } from 'history';
import React, { FunctionComponent, PropsWithChildren, useEffect, useState } from 'react';
import { useLocation, useNavigate, Location } from 'react-router';
import BedriftsmenyRefusjon from '../bruker/bedriftsmenyRefusjon/BedriftsmenyRefusjon';
import { Bedriftvalg, Organisasjon } from '../bruker/bedriftsmenyRefusjon/api/api';

interface Properties {
    organisasjoner: Organisasjon[];
    valgtBedrift: Bedriftvalg | undefined;
    setValgtBedrift: (org: Bedriftvalg) => void;
}

const Banner: FunctionComponent<Properties> = (props: PropsWithChildren<Properties>) => {
    const location = useLocation();
    const [listener, setListener] = useState<(props: { action: string; location: Location; }) => void>();
    const { organisasjoner, valgtBedrift, setValgtBedrift } = props;

    useEffect(() => {
        if (listener) {
            listener({ action: 'REPLACE', location });
        }
    }, [location, listener]);

    const navigate = useNavigate();

    const customHistory: Pick<History, 'listen' | 'replace'> = {
        replace: (to) => {
            navigate(to, { replace: true });
        },
        listen: (nyListener) => () => {
            setListener(() => nyListener);
        },
    };

    return (
        <BedriftsmenyRefusjon
            organisasjoner={organisasjoner}
            valgtBedrift={valgtBedrift}
            setValgtBedrift={setValgtBedrift}
            history={customHistory as History}
            sendCallbackAlleClick={true}
        />
    );
};

export default Banner;

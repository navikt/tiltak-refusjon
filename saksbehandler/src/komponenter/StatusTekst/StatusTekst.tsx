import * as React from 'react';
import { Tag } from '@navikt/ds-react';
import { FunctionComponent } from 'react';
import { statusTekst } from '../../messages';
import { RefusjonStatus } from '../../refusjon/refusjon';
import { formatterDato } from '../../utils/datoUtils';
import { storForbokstav } from '../../utils/stringUtils';

interface Props {
    status: RefusjonStatus;
    tilskuddFom: string;
    tilskuddTom: string;
}

const StatusTekst: FunctionComponent<Props> = (props) => {
    if (props.status === RefusjonStatus.KLAR_FOR_INNSENDING) {
        return (
            <Tag variant="success" size="small">
                Klar for innsending
            </Tag>
        );
    } else if (props.status === RefusjonStatus.FOR_TIDLIG) {
        return (
            <Tag variant="info" size="small">
                Søk fra {formatterDato(props.tilskuddTom)}
            </Tag>
        );
    } else if (props.status === RefusjonStatus.UTBETALT) {
        return (
            <Tag variant="info" size="small">
                {storForbokstav(statusTekst[props.status])}
            </Tag>
        );
    } else if (
        props.status === RefusjonStatus.UTGÅTT ||
        props.status === RefusjonStatus.UTBETALING_FEILET ||
        props.status === RefusjonStatus.ANNULLERT
    ) {
        return (
            <Tag variant="warning" size="small">
                {storForbokstav(statusTekst[props.status])}
            </Tag>
        );
    }
    return (
        <Tag variant="info" size="small">
            {storForbokstav(statusTekst[props.status])}
        </Tag>
    );
};

export default StatusTekst;

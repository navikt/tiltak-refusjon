import * as React from 'react';
import { Tag } from '@navikt/ds-react';
import { FunctionComponent } from 'react';
import { statusTekst } from '../types/messages';
import { RefusjonStatus } from '../types/status';
import { formatterDato } from '../utils/datoUtils';
import { storForbokstav } from '../utils/stringUtils';
import { Tiltak } from '../types/tiltak';
import moment from 'moment';

interface Props {
    status: RefusjonStatus;
    tiltakstype: Tiltak;
    tilskuddFom: string;
    tilskuddTom: string;
    fratrekkRefunderbarBeløp?: boolean;
}

const StatusTekst: FunctionComponent<Props> = (props) => {
    if (props.status === RefusjonStatus.KLAR_FOR_INNSENDING) {
        return (
            <Tag variant="success" size="small">
                Klar for innsending
            </Tag>
        );
    } else if (props.status === RefusjonStatus.FOR_TIDLIG) {
        if (props.tiltakstype === Tiltak.VTAO) {
            return (
                <Tag variant="info">Sendes {formatterDato(moment(props.tilskuddTom).add(1, 'days').toString())}</Tag>
            );
        }
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

import { File } from '@navikt/ds-icons';
import {
    EnvelopeClosedIcon,
    CheckmarkCircleIcon,
    DocPencilIcon,
    ClockIcon,
    PersonPencilIcon,
    XMarkOctagonIcon,
} from '@navikt/aksel-icons';
import { FunctionComponent, ReactNode } from 'react';
import { HendelseType } from '../refusjon';

interface Props {
    hendelse: HendelseType;
}

const hendelsesIkon: { [key in HendelseType]: ReactNode } = {
    RefusjonOpprettet: <File />,
    BeregningUtført: <DocPencilIcon />,
    GodkjentAvArbeidsgiver: <CheckmarkCircleIcon />,
    RefusjonGodkjentNullBeløp: <CheckmarkCircleIcon />,
    RefusjonGodkjentMinusBeløp: <CheckmarkCircleIcon />,
    FristForlenget: <ClockIcon />,
    KorreksjonBeregningUtført: <PersonPencilIcon />,
    KorreksjonMerketForOppgjort: <PersonPencilIcon />,
    KorreksjonMerketForTilbakekreving: <PersonPencilIcon />,
    KorreksjonSendtTilUtbetaling: <PersonPencilIcon />,
    MerketForInntekterFrem: <PersonPencilIcon />,
    RefusjonVarselKlar: <EnvelopeClosedIcon />,
    RefusjonVarselRevarsel: <EnvelopeClosedIcon />,
    RefusjonVarselFristForlenget: <EnvelopeClosedIcon />,
    RefusjonVarselKorrigert: <EnvelopeClosedIcon />,
    RefusjonAnnullert: <XMarkOctagonIcon />,
    RefusjonForkortet: <ClockIcon />,
    TilskuddsperioderIRefusjonAnnullertManuelt: <XMarkOctagonIcon />,
    SaksbehandlerMerketForInntekterLengerFrem: <PersonPencilIcon />,
    KryssetAvForFravær: <ClockIcon />,
};

const HendelseIkon: FunctionComponent<Props> = (props): ReactNode => {
    if (props.hendelse) {
        return hendelsesIkon[props.hendelse];
    } else {
        return null;
    }
};

export default HendelseIkon;

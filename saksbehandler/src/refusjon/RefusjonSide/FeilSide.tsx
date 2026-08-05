import { Alert, Heading, HStack } from '@navikt/ds-react';

import Boks from '~/Boks';
import VerticalSpacer from '~/VerticalSpacer';
import { Aktsomhet, Refusjon, tiltakstypeTekst } from '~/types';

import InformasjonFraAvtalen from './InformasjonFraAvtalen';
import HandlingerMeny from '@/refusjon/RefusjonSide/HandlingerMeny';

type AlertStripeType = 'info' | 'success' | 'warning' | 'error';

interface Props {
    aktsomhet?: Aktsomhet;
    refusjon: Refusjon;
    feiltekst: string;
    advarselType: AlertStripeType;
}

const FeilSide = (props: Props) => {
    const { aktsomhet, refusjon, feiltekst, advarselType } = props;

    return (
        <Boks variant="hvit">
            <Alert variant={advarselType} size="small">
                {feiltekst}
            </Alert>
            <VerticalSpacer rem={2} />
            <HStack justify="space-between">
                <Heading size="large">
                    Refusjon av {tiltakstypeTekst[refusjon.refusjonsgrunnlag.tilskuddsgrunnlag.tiltakstype]}
                </Heading>
                <HandlingerMeny refusjon={refusjon} />
            </HStack>
            <VerticalSpacer rem={2} />
            <InformasjonFraAvtalen
                aktsomhet={aktsomhet}
                tilskuddsgrunnlag={refusjon.refusjonsgrunnlag.tilskuddsgrunnlag}
                bedriftKid={refusjon.refusjonsgrunnlag.bedriftKid}
                bedriftKontonummer={refusjon.refusjonsgrunnlag.bedriftKontonummer}
                fristForGodkjenning={refusjon.fristForGodkjenning}
                bedriftKontonummerInnhentetTidspunkt={refusjon.refusjonsgrunnlag.bedriftKontonummerInnhentetTidspunkt}
            />
        </Boks>
    );
};

export default FeilSide;

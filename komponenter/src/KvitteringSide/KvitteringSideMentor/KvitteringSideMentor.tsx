import { Heading, VStack } from '@navikt/ds-react';
import { FunctionComponent, ReactNode } from 'react';

import LagreSomPdfKnapp from '~/KvitteringSide/LagreSomPdfKnapp';
import Statusmelding from '~/KvitteringSide/Statusmelding';
import VerticalSpacer from '~/VerticalSpacer';
import { Aktsomhet, Refusjon } from '~/types';
import { InnloggetBruker } from '~/types/brukerContextType';
import InformasjonFraAvtalenMentor from './InformasjonFraAvtaleMentor';
import UtregningMentor from './UtregningMentor';
import SummeringBoksMentor from './SummeringBoksMentor';
import StatusEtikettMentor from './StatusEtikettMentor';
import Boks from '~/Boks';

interface Props {
    aktsomhet?: Aktsomhet;
    refusjon: Refusjon;
    innloggetBruker?: InnloggetBruker;
    settKid?: (kid?: string) => void;
    headerActions?: ReactNode;
}

const KvitteringSideMentor: FunctionComponent<Props> = (props: Props) => {
    const { refusjon, innloggetBruker, aktsomhet, settKid, headerActions } = props;
    const innloggetRolle = innloggetBruker?.rolle;

    return (
        <VStack gap="space-16">
            <Boks variant="hvit">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Heading level="2" size="large">
                        Refusjon for Mentor
                    </Heading>
                    <VStack gap="space-16" align="end">
                        <StatusEtikettMentor refusjon={refusjon} />
                        {headerActions}
                    </VStack>
                </div>
                <VerticalSpacer rem={1} />
                <div style={{ display: 'flex', justifyContent: 'space-between', gap: '5rem' }}>
                    <Statusmelding
                        status={refusjon.status}
                        vtao={true}
                        sendtTidspunkt={refusjon.godkjentAvArbeidsgiver}
                    />
                    {innloggetBruker !== undefined && innloggetBruker.rolle === 'ARBEIDSGIVER' && (
                        <LagreSomPdfKnapp avtaleId={refusjon.id} />
                    )}
                </div>
                <VerticalSpacer rem={1} />
                <InformasjonFraAvtalenMentor
                    aktsomhet={aktsomhet}
                    innloggetRolle={innloggetRolle}
                    refusjonStatus={refusjon.status}
                    refusjonsgrunnlag={refusjon.refusjonsgrunnlag}
                    åpnetFørsteGang={refusjon.åpnetFørsteGang}
                    settKid={settKid}
                />
                <VerticalSpacer rem={1} />
                <UtregningMentor
                    tilskuddsgrunnlag={props.refusjon.refusjonsgrunnlag.tilskuddsgrunnlag}
                    beregning={props.refusjon.refusjonsgrunnlag.beregning}
                />
                <SummeringBoksMentor refusjonsgrunnlag={refusjon.refusjonsgrunnlag} />
            </Boks>
        </VStack>
    );
};

export default KvitteringSideMentor;

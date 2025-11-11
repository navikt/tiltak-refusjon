import { Box, Heading, VStack } from '@navikt/ds-react';
import { FunctionComponent } from 'react';

import LagreSomPdfKnapp from '~/KvitteringSide/LagreSomPdfKnapp';
import Statusmelding from '~/KvitteringSide/Statusmelding';
import VerticalSpacer from '~/VerticalSpacer';
import { Aktsomhet, Korreksjonsgrunn, Refusjon } from '~/types';
import { InnloggetBruker } from '~/types/brukerContextType';
import InformasjonFraAvtalenMentor from './InformasjonFraAvtaleMentor';
import UtregningMentor from './UtregningMentor';
import SummeringBoksMentor from './SummeringBoksMentor';
import StatusEtikettMentor from './StatusEtikettMentor';

interface Props {
    aktsomhet?: Aktsomhet;
    refusjon: Refusjon;
    innloggetBruker?: InnloggetBruker;
    opprettKorreksjon?: (
        grunner: Korreksjonsgrunn[],
        unntakOmInntekterFremitid?: number,
        annenKorreksjonsGrunn?: string
    ) => Promise<void>;
    settKid?: (kid?: string) => void;
}

const KvitteringSideMentor: FunctionComponent<Props> = (props: Props) => {
    const { refusjon, innloggetBruker, aktsomhet, settKid } = props;
    const innloggetRolle = innloggetBruker?.rolle;

    return (
        <VStack gap="space-16">
            <Box>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Heading level="2" size="large">
                        Refusjon for Mentor
                    </Heading>
                    <StatusEtikettMentor refusjon={refusjon} />
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
            </Box>
            <UtregningMentor
                tilskuddsgrunnlag={props.refusjon.refusjonsgrunnlag.tilskuddsgrunnlag}
                beregning={props.refusjon.refusjonsgrunnlag.beregning}
            />
            <SummeringBoksMentor refusjonsgrunnlag={refusjon.refusjonsgrunnlag} />
        </VStack>
    );
};

export default KvitteringSideMentor;

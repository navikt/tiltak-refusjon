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
import Boks from '~/Boks';

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
        <Boks variant="hvit">
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
                            automatiskInnsending={true}
                            sendtTidspunkt={refusjon.godkjentAvArbeidsgiver}
                        />
                        {innloggetBruker?.rolle === 'ARBEIDSGIVER' && <LagreSomPdfKnapp avtaleId={refusjon.id} />}
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
                    tilskuddsgrunnlag={refusjon.refusjonsgrunnlag.tilskuddsgrunnlag}
                    beregning={refusjon.refusjonsgrunnlag.beregning}
                />
                <SummeringBoksMentor refusjonsgrunnlag={refusjon.refusjonsgrunnlag} />
            </VStack>
        </Boks>
    );
};

export default KvitteringSideMentor;

import React, { useState } from 'react';
import { useNavigate } from 'react-router';

import Boks from '~/Boks';
import { Aktsomhet, Refusjon } from '~/types';
import { godkjennRefusjon } from '@/services/rest-service';
import { innSendingRefusjon, UtbetaltStatus } from '@/utils/amplitude-utils';

import InformasjonFraAvtalen from './informasjonAvtalen/InformasjonFraAvtalen';
import InntekterFraAMeldingen from './inntektsmelding/InntekterFraAMeldingen';
import InntekterFraTiltaketSpørsmål from './InntekterFraTiltaketSpørsmål';
import RefusjonFullførNullbeløp from './refusjonFullførNullbeløp/RefusjonFullførNullbeløp';
import RefusjonGodkjennModal from './RefusjonGodkjennModal';
import RefusjonIngress from './RefusjonIngress';
import RefusjonInnsending from './refusjonInnsending/RefusjonInnsending';
import TidligereRefunderbarBeløp from './TidligereRefunderbarBeløp';

import './RefusjonSide.less';
import RefusjonInnsendingMentor from './refusjonInnsendingMentor/RefusjonInnsendingMentor';

interface Props {
    refusjon: Refusjon;
    aktsomhet?: Aktsomhet;
}

const RefusjonSide = (props: Props) => {
    const { refusjon, aktsomhet } = props;

    const navigate = useNavigate();
    const [visGodkjennModal, setVisGodkjennModal] = useState<boolean>(false);
    const [visRefusjonInnsending, setVisRefusjonInnsending] = useState<boolean>(true);
    const [feilmelding, setFeilmelding] = useState<string>();

    const godkjennRefusjonen = async (): Promise<void> => {
        try {
            await godkjennRefusjon(refusjon.id, refusjon.sistEndret).then(() => {
                navigate({ pathname: `/refusjon/${refusjon.id}/kvittering`, search: window.location.search });
                innSendingRefusjon(UtbetaltStatus.OK, refusjon, undefined);
            });
        } catch (error) {
            console.log('feil ved innsending:', error);
            innSendingRefusjon(UtbetaltStatus.FEILET, refusjon, error as Error);
            throw error;
        }
    };

    return (
        <div role="main">
            <Boks variant="hvit">
                <RefusjonIngress refusjon={refusjon} />
                <InformasjonFraAvtalen refusjon={refusjon} aktsomhet={aktsomhet} onFeil={setFeilmelding} />
                {refusjon.refusjonsgrunnlag.tilskuddsgrunnlag.tiltakstype !== 'MENTOR' && (
                    <>
                        <InntekterFraAMeldingen refusjon={refusjon} kvitteringVisning={false} />
                        <RefusjonFullførNullbeløp />
                        <InntekterFraTiltaketSpørsmål setVisRefusjonInnsending={setVisRefusjonInnsending} />
                        <TidligereRefunderbarBeløp refusjon={refusjon} />
                    </>
                )}
                {visRefusjonInnsending && (
                    <RefusjonInnsending
                        refusjon={refusjon}
                        setVisGodkjennModal={setVisGodkjennModal}
                        feilmelding={feilmelding}
                    />
                )}
                {refusjon.refusjonsgrunnlag.tilskuddsgrunnlag.tiltakstype === 'MENTOR' && (
                    <RefusjonInnsendingMentor
                        refusjon={refusjon}
                        setVisGodkjennModal={setVisGodkjennModal}
                        feilmelding={feilmelding}
                    />
                )}
            </Boks>
            <RefusjonGodkjennModal
                refusjon={refusjon}
                visGodkjennModal={visGodkjennModal}
                setVisGodkjennModal={setVisGodkjennModal}
                godkjennRefusjonen={godkjennRefusjonen}
            />
        </div>
    );
};

export default RefusjonSide;

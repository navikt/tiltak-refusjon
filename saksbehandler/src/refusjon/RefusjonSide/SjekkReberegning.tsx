import { Button, HelpText, Switch, TextField } from '@navikt/ds-react';
import { FunctionComponent, useState } from 'react';
import { useParams } from 'react-router';
import LagreKnapp from '../../komponenter/LagreKnapp';
import VerticalSpacer from '../../komponenter/VerticalSpacer';
import BekreftelseModal from '../../komponenter/bekreftelse-modal/BekreftelseModal';
import { sjekkReberegning, useHentRefusjon } from '../../services/rest-service';
import { Beregning } from '../refusjon';
import Utregning from './Utregning';

const SjekkReberegning: FunctionComponent = () => {
    const { refusjonId } = useParams<{ refusjonId: string }>();
    const refusjon = useHentRefusjon(refusjonId!);
    const [åpen, setÅpen] = useState(false);
    const [beregning, setBeregning] = useState<null | Beregning>(null);
    const [harFerieTrekkSammeMåned, setHarFerieTrekkSammeMåned] = useState(false);
    const [minusbeløp, setMinusbeløp] = useState('');

    const hentReberegning = async () => {
        sjekkReberegning(refusjonId!, harFerieTrekkSammeMåned, parseInt(minusbeløp)).then(setBeregning);
    };

    return (
        <div>
            <Button variant="secondary" onClick={() => setÅpen(true)}>
                Sjekk reberegning
            </Button>
            <BekreftelseModal
                isOpen={åpen}
                lukkModal={() => setÅpen(false)}
                tittel="Sjekk reberegning"
                bekreft={async () => setÅpen(false)}
                containerStyle={{ minWidth: '40rem' }}
            >
                <div>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <Switch
                            checked={harFerieTrekkSammeMåned}
                            onChange={(e) => setHarFerieTrekkSammeMåned(e.currentTarget.checked)}
                        >
                            Har ferietrekk i samme måned?
                        </Switch>
                        <HelpText style={{ marginLeft: '1rem' }}>
                            Klikk her for å ignorere eventuelle ferietrekk, typisk fordi ferietrekket allerede er brukt
                            i en annen refusjon innenfor samme måned.
                        </HelpText>
                    </div>
                    <TextField
                        type="number"
                        label="Minusbeløp"
                        style={{ width: '10rem' }}
                        value={minusbeløp}
                        onChange={(e) => setMinusbeløp(e.currentTarget.value)}
                    />
                    <VerticalSpacer rem={1} />
                    <LagreKnapp lagreFunksjon={hentReberegning}>Hent beregning</LagreKnapp>
                </div>

                {beregning && (
                    <div>
                        <VerticalSpacer rem={1} />
                        <Utregning
                            refusjonsnummer={{
                                avtalenr: refusjon.refusjonsgrunnlag.tilskuddsgrunnlag.avtaleNr,
                                løpenummer: refusjon.refusjonsgrunnlag.tilskuddsgrunnlag.løpenummer,
                            }}
                            erKorreksjon={false}
                            tilskuddsgrunnlag={refusjon.refusjonsgrunnlag.tilskuddsgrunnlag}
                            beregning={beregning}
                            forrigeRefusjonMinusBeløp={parseInt(minusbeløp)}
                        />
                        <VerticalSpacer rem={1} />
                    </div>
                )}
            </BekreftelseModal>
        </div>
    );
};

export default SjekkReberegning;

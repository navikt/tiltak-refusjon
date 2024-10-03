import React, { ChangeEvent, FunctionComponent, useState } from 'react';
import { useParams } from 'react-router';
import { useNavigate } from 'react-router-dom';
import BekreftelseModal from '../../komponenter/bekreftelse-modal/BekreftelseModal';
import VerticalSpacer from '../../komponenter/VerticalSpacer';
import { korreksjonsgrunnTekst } from '../../messages';
import { opprettKorreksjonsutkast } from '../../services/rest-service';
import { Korreksjonsgrunn } from '../refusjon';
import { Button, BodyShort, ErrorMessage, Checkbox, CheckboxGroup, TextField, Textarea } from '@navikt/ds-react';

const OpprettKorreksjon: FunctionComponent<{}> = () => {
    const { refusjonId } = useParams<{ refusjonId: string }>();
    const navigate = useNavigate();
    const [åpen, setÅpen] = useState(false);
    const [grunner, setGrunner] = useState<Korreksjonsgrunn[]>([]);
    const [unntakOmInntekterFremitid, setUnntakOmInntekterFremitid] = useState<number>();
    const [feilmelding, setFeilmelding] = useState<string>('');
    const [annenKorreksjonsGrunn, setAnnenKorreksjonsGrunn] = useState<string>('');

    return (
        <>
            <Button variant="secondary" onClick={() => setÅpen(true)}>
                Opprett korreksjonsutkast
            </Button>
            <BekreftelseModal
                isOpen={åpen}
                lukkModal={() => {
                    setFeilmelding('');
                    setÅpen(false);
                }}
                bekreft={async () => {
                    try {
                        const korreksjon = await opprettKorreksjonsutkast(
                            refusjonId!,
                            Array.from(grunner),
                            unntakOmInntekterFremitid,
                            annenKorreksjonsGrunn?.trim() === '' ? undefined : annenKorreksjonsGrunn
                        );
                        navigate('/refusjon/' + korreksjon.id);
                    } catch (error) {
                        const feilmelding =
                            'feilmelding' in (error as any) ? (error as any).feilmelding : 'Uventet feil';
                        setFeilmelding(feilmelding);
                    }
                }}
                tittel={'Opprett korreksjonsutkast'}
            >
                <BodyShort size="small">Hvorfor skal det korrigeres?</BodyShort>
                <VerticalSpacer rem={1} />
                <CheckboxGroup legend="" value={grunner} onChange={(e) => setGrunner(e)}>
                    {[
                        Korreksjonsgrunn.HENT_INNTEKTER_PÅ_NYTT,
                        Korreksjonsgrunn.HENT_INNTEKTER_TO_MÅNEDER_FREM,
                        Korreksjonsgrunn.TRUKKET_FEIL_FOR_FRAVÆR,
                        Korreksjonsgrunn.OPPDATERT_AMELDING,
                        Korreksjonsgrunn.ANNEN_GRUNN,
                    ].map((it, index) => (
                        <>
                            <Checkbox key={index} value={it}>
                                {korreksjonsgrunnTekst[it]}
                            </Checkbox>
                            {it === Korreksjonsgrunn.HENT_INNTEKTER_TO_MÅNEDER_FREM &&
                                grunner.includes(Korreksjonsgrunn.HENT_INNTEKTER_TO_MÅNEDER_FREM) && (
                                    <TextField
                                        style={{ width: '25%' }}
                                        size="small"
                                        label={`Antall måneder etter perioden det skal hentes innteker (maks 12)`}
                                        onChange={(event: ChangeEvent<HTMLInputElement>) => {
                                            const verdi: string = event.currentTarget.value;
                                            if (verdi.match(/^\d*$/) && parseInt(verdi, 10) <= 12) {
                                                setUnntakOmInntekterFremitid(parseInt(verdi, 10));
                                            }
                                            if (!verdi) {
                                                setUnntakOmInntekterFremitid(2);
                                            }
                                        }}
                                        value={unntakOmInntekterFremitid}
                                    />
                                )}
                            {it === Korreksjonsgrunn.ANNEN_GRUNN && grunner.includes(Korreksjonsgrunn.ANNEN_GRUNN) && (
                                <Textarea
                                    style={{ width: '50%' }}
                                    label="Skriv inn grunn"
                                    maxLength={100}
                                    value={annenKorreksjonsGrunn}
                                    onChange={(event) => setAnnenKorreksjonsGrunn(event.target.value)}
                                />
                            )}
                        </>
                    ))}
                    {feilmelding && <ErrorMessage>{feilmelding}</ErrorMessage>}
                </CheckboxGroup>
            </BekreftelseModal>
        </>
    );
};

export default OpprettKorreksjon;

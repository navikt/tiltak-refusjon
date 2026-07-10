import React, { ChangeEvent, FunctionComponent, useState } from 'react';
import BekreftelseModal from '~/BekreftelseModal';
import VerticalSpacer from '~/VerticalSpacer';
import { BodyShort, Checkbox, CheckboxGroup, TextField, Textarea } from '@navikt/ds-react';
import { Korreksjonsgrunn } from '~/types/refusjon';
import { korreksjonsgrunnTekst } from '~/types/messages';

const OpprettKorreksjonModal: FunctionComponent<{
    opprettKorreksjon: (
        grunner: Korreksjonsgrunn[],
        unntakOmInntekterFremitid?: number,
        annenKorreksjonsGrunn?: string
    ) => Promise<void>;
    open: boolean;
    onClose: () => void;
}> = ({ opprettKorreksjon, open, onClose }) => {
    const [grunner, setGrunner] = useState<Korreksjonsgrunn[]>([]);
    const [unntakOmInntekterFremitid, setUnntakOmInntekterFremitid] = useState<number>();
    const [annenKorreksjonsGrunn, setAnnenKorreksjonsGrunn] = useState<string>('');

    return (
        <BekreftelseModal
            isOpen={open}
            lukkModal={onClose}
            bekreft={() => opprettKorreksjon(grunner, unntakOmInntekterFremitid, annenKorreksjonsGrunn)}
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
                    <React.Fragment key={index}>
                        <Checkbox value={it}>{korreksjonsgrunnTekst[it]}</Checkbox>
                        {it === Korreksjonsgrunn.HENT_INNTEKTER_TO_MÅNEDER_FREM &&
                            grunner.includes(Korreksjonsgrunn.HENT_INNTEKTER_TO_MÅNEDER_FREM) && (
                                <TextField
                                    style={{ width: '25%' }}
                                    size="small"
                                    label={`Antall måneder etter perioden det skal hentes inntekter (maks 12)`}
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
                    </React.Fragment>
                ))}
            </CheckboxGroup>
        </BekreftelseModal>
    );
};

export default OpprettKorreksjonModal;

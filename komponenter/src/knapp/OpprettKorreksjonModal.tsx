import React, { ChangeEvent, FunctionComponent, useState } from 'react';
import BekreftelseModal from '~/BekreftelseModal';
import VerticalSpacer from '~/VerticalSpacer';
import { BodyShort, Box, Checkbox, CheckboxGroup, Select, Textarea } from '@navikt/ds-react';
import { Korreksjonsgrunn } from '~/types/refusjon';
import { korreksjonsgrunnTekst } from '~/types/messages';
import styles from './OpprettKorreksjonModal.module.less';

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

    const bekreft = async () => {
        const harValgtHentInntekterToMånederFrem = grunner.includes(Korreksjonsgrunn.HENT_INNTEKTER_TO_MÅNEDER_FREM);
        const harValgtAnnenGrunn = grunner.includes(Korreksjonsgrunn.ANNEN_GRUNN);

        if (grunner.length === 0) {
            throw new Error('Du må velge minst én grunn for korreksjon.');
        }
        if (harValgtAnnenGrunn && annenKorreksjonsGrunn.trim() === '') {
            throw new Error('Begrunnelse kan ikke være tom når du velger "Annen grunn".');
        }
        if (harValgtHentInntekterToMånederFrem && unntakOmInntekterFremitid === undefined) {
            throw new Error('Du må velge antall måneder før du kan opprette korreksjon.');
        }
        await opprettKorreksjon(
            grunner,
            harValgtHentInntekterToMånederFrem ? unntakOmInntekterFremitid : undefined,
            harValgtAnnenGrunn ? annenKorreksjonsGrunn : undefined
        );
    };

    return (
        <BekreftelseModal isOpen={open} lukkModal={onClose} bekreft={bekreft} tittel={'Opprett korreksjonsutkast'}>
            <BodyShort>Hvorfor skal det korrigeres?</BodyShort>
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
                                <Box className={styles.indent}>
                                    <Select
                                        label="Antall måneder etter perioden det skal hentes inntekter"
                                        onChange={(event: ChangeEvent<HTMLSelectElement>) => {
                                            const verdi: string = event.currentTarget.value;
                                            if (verdi !== '' && verdi.match(/^\d+$/) && parseInt(verdi, 10) <= 12) {
                                                setUnntakOmInntekterFremitid(parseInt(verdi, 10));
                                            }
                                        }}
                                        value={unntakOmInntekterFremitid ?? ''}
                                    >
                                        <option value="" disabled>
                                            Velg antall måneder
                                        </option>
                                        {Array.from({ length: 12 }, (_, i) => i + 1).map((antall) => (
                                            <option key={antall} value={antall}>
                                                {antall}
                                            </option>
                                        ))}
                                    </Select>
                                </Box>
                            )}
                        {it === Korreksjonsgrunn.ANNEN_GRUNN && grunner.includes(Korreksjonsgrunn.ANNEN_GRUNN) && (
                            <Box className={styles.indent}>
                                <Textarea
                                    label="Skriv inn grunn"
                                    maxLength={100}
                                    value={annenKorreksjonsGrunn}
                                    onChange={(event) => setAnnenKorreksjonsGrunn(event.target.value)}
                                />
                            </Box>
                        )}
                    </React.Fragment>
                ))}
            </CheckboxGroup>
        </BekreftelseModal>
    );
};

export default OpprettKorreksjonModal;

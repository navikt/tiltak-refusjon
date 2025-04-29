import Calender from '@/asset/image/calender2.svg?react';
import { Button, Label, TextField } from '@navikt/ds-react';
import { FunctionComponent, useState } from 'react';
import { nb } from 'date-fns/locale';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import BekreftelseModal from '~/BekreftelseModal';
import { forlengFrist } from '@/services/rest-service';
import './ForlengFrist.less';
import {
    finnFeilMeldingFraInputDialog,
    ForlengeDatoSkjemaGruppeFeil,
    norskDatoTilISOString,
    parseNorskDato,
    erGyldigDato,
    datoTilNorskString,
} from './forlengFristUtils';
import GrunnlagTilForlengelse from './GrunnlagTilForlengelse';
import { FeilkodeError } from '~/types/errors';
import BEMHelper from '~/utils/bem';

const cls = BEMHelper('forleng-frist');

const ForlengFristModalKropp: FunctionComponent<{
    tidligsteFrist: string;
    senesteFrist: string;
    lukkModal: () => void;
    oppdatereRefusjonFrist: (dato: string, grunnlag: string, annetGrunnlag: string) => Promise<void>;
}> = ({ tidligsteFrist, senesteFrist, oppdatereRefusjonFrist, lukkModal }) => {
    const tidligsteFristDato = new Date(Date.parse(tidligsteFrist));
    const senesteFristDato = new Date(Date.parse(senesteFrist));
    const senesteFristNorskDatoStreng = datoTilNorskString(senesteFristDato);

    const [month, setMonth] = useState<Date>(tidligsteFristDato);
    const [datoFraDatoVelger, setDatoFraDatoVelger] = useState<Date>(tidligsteFristDato);
    const [datoFraInputFelt, setDatoFraInputFelt] = useState<string>(datoTilNorskString(tidligsteFristDato));
    const [grunnlag, setGrunnlag] = useState<string>('');
    const [annetGrunnlag, setAnnetGrunnlag] = useState<string>('');
    const [skjemaGruppeFeilmeldinger, setSkjemaGruppeFeilmeldinger] = useState<ForlengeDatoSkjemaGruppeFeil[] | []>([]);

    const setNyFeilMelding = (id: string, feilMelding: string) => {
        setSkjemaGruppeFeilmeldinger((prevState) => [...prevState, ...[{ id: id, feilMelding: feilMelding }]]);
    };

    const sjekkInnsendingsInformasjon = () => {
        let KAN_SENDE_INN: boolean = true;
        setSkjemaGruppeFeilmeldinger([]);
        const parseDate = parseNorskDato(datoFraInputFelt);
        if (isNaN(parseDate.getTime())) {
            setNyFeilMelding('ugyldig-datoformat', 'Ugyldig datoformat. DD.MM.YYYY.');
            KAN_SENDE_INN = false;
        }
        if (parseDate <= tidligsteFristDato) {
            setNyFeilMelding('for-kort-frist', 'Ny frist må være etter opprinnelig frist.');
            KAN_SENDE_INN = false;
        }
        if (parseDate > senesteFristDato) {
            setNyFeilMelding('for-lang-frist', `Frist kan ikke overstige ${senesteFristNorskDatoStreng}.`);
            KAN_SENDE_INN = false;
        }
        if (grunnlag.length === 0) {
            setNyFeilMelding('mangler-grunnlag', 'Må sette grunn til forlenglse.');
            KAN_SENDE_INN = false;
        }
        if (grunnlag.includes('Annet') && annetGrunnlag.trim().length === 0) {
            setNyFeilMelding('mangler-annet', 'Mangler tekst for annet grunnlag.');
            KAN_SENDE_INN = false;
        }
        if (KAN_SENDE_INN) {
            setSkjemaGruppeFeilmeldinger([]);
            return oppdatereRefusjonFrist(datoFraInputFelt, grunnlag, annetGrunnlag);
        } else {
            return Promise.reject(new FeilkodeError('Alle påkrevde felter må være utfylt'));
        }
    };

    return (
        <BekreftelseModal
            isOpen={true}
            lukkModal={lukkModal}
            bekreft={sjekkInnsendingsInformasjon}
            tittel={'Forleng refusjonsfrist'}
            containerStyle={{ minWidth: 'unset' }}
        >
            <div className={cls.className}>
                <DayPicker
                    month={month}
                    onMonthChange={setMonth}
                    selected={datoFraDatoVelger}
                    onDayClick={(day) => {
                        setDatoFraInputFelt(datoTilNorskString(day));
                        setDatoFraDatoVelger(day);
                    }}
                    locale={nb}
                    disabled={{
                        before: tidligsteFristDato,
                        after: senesteFristDato,
                    }}
                />
                <div className={cls.element('text-wrapper')}>
                    <div className={cls.element('dato-input')}>
                        <div className={cls.element('dato-label')}>
                            <Calender width={20} height={20} />
                            <Label className={cls.element('label')} htmlFor="dato-label">
                                Dato
                            </Label>
                        </div>
                        <div className={cls.element('input-wrapper')}>
                            <TextField
                                label=""
                                hideLabel
                                error={finnFeilMeldingFraInputDialog(
                                    ['ugyldig-datoformat', 'for-kort-frist', 'for-lang-frist'],
                                    skjemaGruppeFeilmeldinger
                                )}
                                onChange={(event) => {
                                    const input = event.target.value;
                                    const parsedDate = parseNorskDato(input);
                                    if (erGyldigDato(parsedDate)) {
                                        setDatoFraDatoVelger(parsedDate);
                                        setMonth(parsedDate);
                                    }
                                    setDatoFraInputFelt(input);
                                }}
                                className={cls.element('input-felt-dato')}
                                id="dato-input"
                                size="small"
                                value={datoFraInputFelt}
                            />
                        </div>
                    </div>
                    <GrunnlagTilForlengelse
                        grunnlag={grunnlag}
                        setGrunnlag={setGrunnlag}
                        annetGrunnlag={annetGrunnlag}
                        setAnnetGrunnlag={setAnnetGrunnlag}
                        skjemaGruppeFeilmeldinger={skjemaGruppeFeilmeldinger}
                    />
                </div>
            </div>
        </BekreftelseModal>
    );
};

const ForlengFrist: FunctionComponent<{ refusjonId: string; tidligsteFrist: string; senesteFrist: string }> = ({
    refusjonId,
    tidligsteFrist,
    senesteFrist,
}) => {
    const [open, setOpen] = useState<boolean>(false);

    const openModal = () => {
        setOpen(true);
    };
    const lukkModal = () => {
        setOpen(false);
    };

    const oppdatereRefusjonFrist = async (dato: string, grunnlag: string, annetGrunnlag: string) => {
        const valgGrunn = grunnlag.includes('Annet') ? annetGrunnlag : grunnlag;
        await forlengFrist(refusjonId!, {
            nyFrist: norskDatoTilISOString(dato),
            årsak: valgGrunn,
        });
        setOpen(false);
    };

    return (
        <div>
            <Button size="small" variant="secondary" className={cls.element('openButton')} onClick={() => openModal()}>
                Forleng frist
            </Button>
            {open && (
                <ForlengFristModalKropp
                    oppdatereRefusjonFrist={oppdatereRefusjonFrist}
                    lukkModal={lukkModal}
                    tidligsteFrist={tidligsteFrist}
                    senesteFrist={senesteFrist}
                />
            )}
        </div>
    );
};

export default ForlengFrist;

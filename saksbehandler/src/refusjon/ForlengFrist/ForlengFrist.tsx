import Calender from '@/asset/image/calender2.svg?react';
import { Button, Label, TextField } from '@navikt/ds-react';
import React, { FunctionComponent, useEffect, useState } from 'react';
import { nb } from 'date-fns/locale';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import { useParams } from 'react-router';
import BekreftelseModal from '../../komponenter/bekreftelse-modal/BekreftelseModal';
import { forlengFrist, useHentRefusjon } from '../../services/rest-service';
import BEMHelper from '../../utils/bem';
import './ForlengFrist.less';
import {
    finnFeilMeldingFraInputDialog,
    ForlengeDatoSkjemaGruppeFeil,
    formatDateToIsoDateFormat,
    getDateStringFraDatoVelger,
} from './forlengFristUtils';
import GrunnlagTilForlengelse from './GrunnlagTilForlengelse';
import { FeilkodeError } from '../../types/errors';

const cls = BEMHelper('forleng-frist');

const ForlengFrist: FunctionComponent = () => {
    const { refusjonId } = useParams<{ refusjonId: string }>();
    const refusjon = useHentRefusjon(refusjonId!);
    const [open, setOpen] = useState<boolean>(false);
    const [datoFraDatoVelger, setDatoFraDatoVelger] = useState<Date>(
        new Date(Date.parse(refusjon.fristForGodkjenning))
    );
    const [datoFraInputFelt, setDatoFraInputFelt] = useState<string>(refusjon.fristForGodkjenning);
    const [grunnlag, setGrunnlag] = useState<string>('');
    const [annetGrunnlag, setAnnetGrunnlag] = useState<string>('');
    const [skjemaGruppeFeilmeldinger, setSkjemaGruppeFeilmeldinger] = useState<ForlengeDatoSkjemaGruppeFeil[] | []>([]);

    useEffect(() => {
        setDatoFraInputFelt(getDateStringFraDatoVelger(datoFraDatoVelger));
    }, [datoFraDatoVelger]);

    const lukkModalOgResettState = () => {
        setGrunnlag('');
        setAnnetGrunnlag('');
        setSkjemaGruppeFeilmeldinger([]);
        setOpen(false);
    };

    const setNyFeilMelding = (id: string, feilMelding: string) => {
        setSkjemaGruppeFeilmeldinger((prevState) => [...prevState, ...[{ id: id, feilMelding: feilMelding }]]);
    };

    const sjekkInnsendingsInformasjon = () => {
        let KAN_SENDE_INN: boolean = true;
        setSkjemaGruppeFeilmeldinger([]);
        const parseDate = Date.parse(formatDateToIsoDateFormat(datoFraInputFelt));
        if (isNaN(parseDate)) {
            setNyFeilMelding('ugyldig-datoformat', 'Ugyldig datoformat. DD.MM.YYYY.');
            KAN_SENDE_INN = false;
        }
        if (new Date(parseDate) <= new Date(refusjon.fristForGodkjenning)) {
            setNyFeilMelding('for-kort-frist', 'Ny frist må være etter opprinnelig frist.');
            KAN_SENDE_INN = false;
        }
        if (grunnlag.length === 0) {
            setNyFeilMelding('mangler-grunnlag', 'Må sette grunn til forlenglse.');
            KAN_SENDE_INN = false;
        }
        if (grunnlag.includes('Annet') && annetGrunnlag.length === 0) {
            setNyFeilMelding('mangler-annet', 'Mangler tekst for annet grunnlag.');
            KAN_SENDE_INN = false;
        }
        if (KAN_SENDE_INN) {
            setSkjemaGruppeFeilmeldinger([]);
            return oppdatereRefusjonFrist();
        } else {
            return Promise.reject(new FeilkodeError('Alle påkrevde felter må være utfylt'));
        }
    };

    const oppdatereRefusjonFrist = async () => {
        const valgGrunn = grunnlag.includes('Annet') ? annetGrunnlag : grunnlag;
        await forlengFrist(refusjonId!, {
            nyFrist: formatDateToIsoDateFormat(datoFraInputFelt),
            årsak: valgGrunn,
        });
        lukkModalOgResettState();
    };

    return (
        <div>
            <Button
                size="small"
                variant="secondary"
                className={cls.element('openButton')}
                onClick={() => setOpen(!open)}
            >
                Forleng frist
            </Button>
            <BekreftelseModal
                isOpen={open}
                lukkModal={lukkModalOgResettState}
                bekreft={sjekkInnsendingsInformasjon}
                tittel={'Forleng refusjonsfrist'}
                containerStyle={{ minWidth: 'unset' }}
            >
                <div className={cls.className}>
                    <div className={cls.element('container')}>
                        <div className={cls.element('dato-velger')}>
                            <DayPicker
                                defaultMonth={datoFraDatoVelger}
                                selected={datoFraDatoVelger}
                                onDayClick={(day) => setDatoFraDatoVelger(day)}
                                locale={nb}
                                disabled={{
                                    before: new Date(Date.parse(refusjon.fristForGodkjenning)),
                                }}
                            />
                        </div>
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
                                        onChange={(event) => setDatoFraInputFelt(event.target.value)}
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
                </div>
            </BekreftelseModal>
        </div>
    );
};

export default ForlengFrist;

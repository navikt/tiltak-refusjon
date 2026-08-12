import { BodyShort, DatePicker, DateValidationT, useDatepicker } from '@navikt/ds-react';
import { FunctionComponent, SetStateAction, useRef } from 'react';
import { z } from 'zod';
import { useForm, useController, SubmitHandler, SubmitErrorHandler, Resolver } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import BekreftelseModal from '~/BekreftelseModal';
import { forlengFrist } from '@/services/rest-service';
import { norskDatoTilISOString, datoTilNorskString, nesteDag } from './forlengFristUtils';
import GrunnlagTilForlengelse from './GrunnlagTilForlengelse';
import VerticalSpacer from '~/VerticalSpacer';

const schema = z
    .object({
        dato: z.date({ required_error: 'Må sette frist.' }),
        grunnlag: z.string().min(1, 'Må sette grunn til forlengelse.'),
        annetGrunnlag: z.string(),
    })
    .refine(({ grunnlag, annetGrunnlag }) => !(grunnlag.includes('Annet') && annetGrunnlag.trim().length === 0), {
        message: 'Mangler tekst for annet grunnlag.',
        path: ['annetGrunnlag'],
    });

type FormFields = z.infer<typeof schema>;

const ForlengFristModalKropp: FunctionComponent<{
    eksisterendeFrist: string;
    senesteFrist: string;
    lukkModal: () => void;
    oppdatereRefusjonFrist: (dato: string, grunnlag: string, annetGrunnlag: string) => Promise<void>;
}> = ({ eksisterendeFrist, senesteFrist, oppdatereRefusjonFrist, lukkModal }) => {
    const eksisterendeFristDato = new Date(Date.parse(eksisterendeFrist));
    const senesteFristDato = new Date(Date.parse(senesteFrist));

    const datePickerValidationRef = useRef<DateValidationT | undefined>(undefined);

    const {
        control,
        handleSubmit,
        setValue,
        watch,
        setError,
        formState: { errors, isSubmitted },
    } = useForm<FormFields>({
        resolver: (async (values, context, options) => {
            const result = await zodResolver(schema)(values, context, options);
            const dpv = datePickerValidationRef.current;
            if (dpv?.isBefore || dpv?.isAfter || dpv?.isInvalid) {
                const message = dpv.isBefore
                    ? `Ny frist kan ikke være før ${datoTilNorskString(nesteDag(eksisterendeFristDato))}.`
                    : dpv.isAfter
                      ? `Ny frist kan ikke være etter ${datoTilNorskString(senesteFristDato)}.`
                      : 'Ugyldig dato. DD.MM.YYYY.';
                return { ...result, errors: { ...result.errors, dato: { type: 'custom', message } } };
            }
            return result;
        }) as Resolver<FormFields>,
        defaultValues: { grunnlag: '', annetGrunnlag: '' },
    });

    const { field: datoField } = useController({ control, name: 'dato', defaultValue: undefined as unknown as Date });

    const grunnlag = watch('grunnlag');
    const annetGrunnlag = watch('annetGrunnlag');

    const setGrunnlag = (action: SetStateAction<string>) => {
        const next = typeof action === 'function' ? action(grunnlag) : action;
        setValue('grunnlag', next, { shouldValidate: isSubmitted });
    };

    const setAnnetGrunnlag = (action: SetStateAction<string>) => {
        const next = typeof action === 'function' ? action(annetGrunnlag) : action;
        setValue('annetGrunnlag', next, { shouldValidate: isSubmitted });
    };

    const onSubmit: SubmitHandler<FormFields> = ({ dato, grunnlag, annetGrunnlag }) =>
        oppdatereRefusjonFrist(datoTilNorskString(dato), grunnlag, annetGrunnlag);

    const onError: SubmitErrorHandler<FormFields> = () => {
        if (grunnlag.includes('Annet') && !annetGrunnlag.trim()) {
            setError('annetGrunnlag', { message: 'Mangler tekst for annet grunnlag.' });
        }
    };

    const { datepickerProps, inputProps } = useDatepicker({
        today: eksisterendeFristDato,
        fromDate: nesteDag(eksisterendeFristDato),
        toDate: senesteFristDato,
        inputFormat: 'dd.MM.yyyy',
        allowTwoDigitYear: true,
        onDateChange: datoField.onChange,
        onValidate: (validation) => {
            datePickerValidationRef.current = validation;
        },
    });

    const kanForlengeFrist = eksisterendeFristDato < senesteFristDato;

    return (
        <BekreftelseModal
            isOpen={true}
            lukkModal={lukkModal}
            bekreft={() => handleSubmit(onSubmit, onError)()}
            tittel={'Forleng refusjonsfrist'}
            containerStyle={{ minWidth: '35rem' }}
        >
            {kanForlengeFrist ? (
                <>
                    <DatePicker {...datepickerProps}>
                        <DatePicker.Input {...inputProps} label="Ny Frist" error={errors.dato?.message} />
                    </DatePicker>
                    <VerticalSpacer rem={1} />
                    <GrunnlagTilForlengelse
                        grunnlag={grunnlag}
                        setGrunnlag={setGrunnlag}
                        annetGrunnlag={annetGrunnlag}
                        setAnnetGrunnlag={setAnnetGrunnlag}
                        grunnlagFeilmelding={errors.grunnlag?.message}
                        annetGrunnlagFeilmelding={errors.annetGrunnlag?.message}
                    />
                </>
            ) : (
                <>
                    <BodyShort>Refusjonsfristen kan ikke lenger forlenges.</BodyShort>
                    <BodyShort>Nåværende frist er {datoTilNorskString(eksisterendeFristDato)}.</BodyShort>
                    <BodyShort>Seneste mulige frist er {datoTilNorskString(senesteFristDato)}.</BodyShort>
                </>
            )}
        </BekreftelseModal>
    );
};

const ForlengFristModal: FunctionComponent<{
    refusjonId: string;
    eksisterendeFrist: string;
    senesteFrist: string;
    open: boolean;
    onClose: () => void;
}> = ({ refusjonId, eksisterendeFrist, senesteFrist, open, onClose }) => {
    const oppdatereRefusjonFrist = async (dato: string, grunnlag: string, annetGrunnlag: string) => {
        const valgGrunn = grunnlag.includes('Annet') ? annetGrunnlag : grunnlag;
        await forlengFrist(refusjonId, {
            nyFrist: norskDatoTilISOString(dato),
            årsak: valgGrunn,
        });
        onClose();
    };

    if (!open) return null;

    return (
        <ForlengFristModalKropp
            oppdatereRefusjonFrist={oppdatereRefusjonFrist}
            lukkModal={onClose}
            eksisterendeFrist={eksisterendeFrist}
            senesteFrist={senesteFrist}
        />
    );
};

export default ForlengFristModal;

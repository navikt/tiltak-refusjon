import { FunctionComponent } from 'react';
import { merkForUnntakOmInntekterFremITid } from '../../services/rest-service';
import VerticalSpacer from '~/VerticalSpacer';
import { BodyShort, Button, Modal, Heading, Select } from '@navikt/ds-react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Refusjon } from '~/types/refusjon';
import { FeilkodeError } from '~/types';
import { Feilkode, Feilmeldinger } from '~/feilkodemapping';

const schema = z.object({
    merking: z.coerce
        .number({ invalid_type_error: 'Må være tall' })
        .min(1, 'Må være minst 1')
        .max(12, 'Kan ikke være mer enn 12'),
});

type FormFields = z.infer<typeof schema>;

const MerkForUnntakOmInntekterFremITidModal: FunctionComponent<{
    refusjon: Refusjon;
    open: boolean;
    onClose: () => void;
}> = ({ refusjon, open, onClose }) => {
    return (
        <Modal open={open} onClose={onClose} aria-labelledby="modal-heading">
            <Modal.Header>
                <Heading level="2" size="large">
                    Merk refusjonen for henting av inntekter frem i tid
                </Heading>
            </Modal.Header>
            {open && (
                <ModalForm
                    refusjon={refusjon}
                    setOpen={(isOpen) => {
                        if (!isOpen) onClose();
                    }}
                />
            )}
        </Modal>
    );
};

/* Lager en ny komponent for innholdet for slette Modal innholdet fra dommen*/
const ModalForm: FunctionComponent<{ refusjon: Refusjon; setOpen: (open: boolean) => void }> = ({
    refusjon,
    setOpen,
}) => {
    const {
        register,
        unregister,
        handleSubmit,
        setError,
        formState: { errors, isSubmitting },
    } = useForm<FormFields>({
        defaultValues: {
            merking: refusjon.unntakOmInntekterFremitid,
        },
        resolver: zodResolver(schema),
    });

    const onSubmit: SubmitHandler<{ merking: number }> = async (data) => {
        try {
            await merkForUnntakOmInntekterFremITid(refusjon.id, data.merking);
            setOpen(false);
        } catch (error) {
            if (error instanceof FeilkodeError) {
                const feilmeldingTekst = Feilmeldinger[error.message as Feilkode];
                setError('merking', { type: 'manual', message: feilmeldingTekst });
            } else {
                setError('merking', { type: 'manual', message: 'Noe gikk galt' });
            }
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Modal.Body>
                <BodyShort>
                    Hvis unntaksregelen er aktivert vil systemet hente inntekter for valgt antall måneder etter
                    perioden, i stedet for én måned som standard. Nytt inntektsoppslag vil gjøres neste gang
                    arbeidsgiver åpner refusjonen.
                </BodyShort>
                <VerticalSpacer rem={1} />
                <Select
                    style={{ width: '25%' }}
                    label="Antall ekstra måneder etter perioden systemet skal hente inntekter"
                    {...register('merking')}
                    error={errors.merking?.message}
                >
                    {Array.from({ length: 12 }, (_, i) => i + 1).map((antall) => (
                        <option key={antall} value={antall}>
                            {antall}
                        </option>
                    ))}
                </Select>
            </Modal.Body>
            <Modal.Footer>
                <Button disabled={isSubmitting} type="submit">
                    {isSubmitting ? 'OK' : 'OK'}
                </Button>
                <Button
                    type="button"
                    variant="secondary"
                    onClick={() => {
                        unregister('merking');
                        setOpen(false);
                    }}
                >
                    Avbryt
                </Button>
            </Modal.Footer>
        </form>
    );
};

export default MerkForUnntakOmInntekterFremITidModal;

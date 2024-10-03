import { FunctionComponent, useState } from 'react';
import { merkForUnntakOmInntekterFremITid } from '../../services/rest-service';
import VerticalSpacer from '../../komponenter/VerticalSpacer';
import { BodyShort, TextField, Button, Modal, Heading } from '@navikt/ds-react';
import { Refusjon } from '../refusjon';
import { useForm, SubmitHandler } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const schema = z.object({
    merking: z.coerce.number({ invalid_type_error: 'Må være tall' }).min(1, 'Må være mer en 1').max(12, 'Må være mindre enn 12')
});

type FormFields = z.infer<typeof schema>;

const MerkForUnntakOmInntekterFremITid: FunctionComponent<{ refusjon: Refusjon }> = ({ refusjon }) => {
    const [open, setOpen] = useState<boolean>(false);

    return (
        <div>
            <Button size="small" variant="secondary" onClick={() => setOpen(!open)}>
                Hent inntekter lenger frem
            </Button>
            <Modal open={open} onClose={() => setOpen(false)} aria-labelledby="modal-heading">
                <Modal.Header>
                    <Heading level="2" size="large">
                        Merk refusjonen for henting av inntekter frem i tid
                    </Heading>
                </Modal.Header>
                {open && <ModalForm refusjon={refusjon} setOpen={setOpen} />}
            </Modal>
        </div>
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
            setError('merking', { type: 'manual', message: 'Noe gikk galt' });
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Modal.Body>
                <BodyShort size="small">
                    Hvis unntaksregelen er aktivert vil systemet hente inntekter for valgt antall måneder etter
                    perioden, i stedet for én måned som standard. Nytt inntektsoppslag vil gjøres neste gang
                    arbeidsgiver åpner refusjonen.
                </BodyShort>
                <VerticalSpacer rem={1} />
                <TextField
                    style={{ width: '25%' }}
                    size="small"
                    label={`Antall ekstra måneder etter perioden systemet skal hente innteker (maks 12)`}
                    {...register('merking')}
                    error={errors.merking?.message}
                />
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

export default MerkForUnntakOmInntekterFremITid;

import { Dispatch, FunctionComponent, SetStateAction } from 'react';
import { RadioGroup, Radio, Textarea, Fieldset } from '@navikt/ds-react';

interface Props {
    grunnlag: string;
    setGrunnlag: Dispatch<SetStateAction<string>>;
    grunnlagFeilmelding?: string;
    annetGrunnlag: string;
    setAnnetGrunnlag: Dispatch<SetStateAction<string>>;
    annetGrunnlagFeilmelding?: string;
}

const GrunnlagTilForlengelse: FunctionComponent<Props> = (props) => {
    const { grunnlag, setGrunnlag, annetGrunnlag, setAnnetGrunnlag, grunnlagFeilmelding, annetGrunnlagFeilmelding } =
        props;
    return (
        <Fieldset legend="Årsaker til forlengelse av refusjonsfristen?">
            <RadioGroup
                error={grunnlagFeilmelding}
                legend="Årsaker til forlengelse av refusjonsfristen?"
                hideLegend
                value={grunnlag}
                onChange={setGrunnlag}
            >
                <Radio value="Ikke-tilgang" name="begrunnelse">
                    Ikke tilgang
                </Radio>
                <Radio value="Finner ikke inntekt" name="begrunnelse">
                    Finner ikke inntekt fra a-melding
                </Radio>
                <Radio value="Ikke mottatt SMS med lenke til refusjon og varsel" name="begrunnelse">
                    Ikke mottatt SMS med lenke til refusjon og varsel
                </Radio>
                <Radio value="Annet" name="begrunnelse">
                    Annet
                </Radio>
            </RadioGroup>
            {grunnlag.includes('Annet') && (
                <Textarea
                    error={annetGrunnlagFeilmelding}
                    label="Oppgi grunnlag"
                    maxLength={100}
                    value={annetGrunnlag}
                    onChange={(event) => setAnnetGrunnlag(event.target.value)}
                />
            )}
        </Fieldset>
    );
};
export default GrunnlagTilForlengelse;

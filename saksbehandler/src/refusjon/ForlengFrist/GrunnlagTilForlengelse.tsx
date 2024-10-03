import React, { Dispatch, FunctionComponent, SetStateAction } from 'react';
import { ForlengeDatoSkjemaGruppeFeil, finnFeilMeldingFraInputDialog } from './forlengFristUtils';
import { RadioGroup, Radio, Textarea, Fieldset } from '@navikt/ds-react';

interface Props {
    grunnlag: string;
    setGrunnlag: Dispatch<SetStateAction<string>>;
    annetGrunnlag: string;
    setAnnetGrunnlag: Dispatch<SetStateAction<string>>;
    skjemaGruppeFeilmeldinger: ForlengeDatoSkjemaGruppeFeil[] | [];
}

const GrunnlagTilForlengelse: FunctionComponent<Props> = (props) => {
    const { grunnlag, setGrunnlag, annetGrunnlag, setAnnetGrunnlag, skjemaGruppeFeilmeldinger } = props;
    return (
        <div>
            <Fieldset legend>
                <RadioGroup
                    error={finnFeilMeldingFraInputDialog(['mangler-grunnlag'], skjemaGruppeFeilmeldinger)}
                    legend="Årsaker til forlengelse av refusjonsfristen?"
                >
                    <Radio value="" name="begrunnelse" onClick={() => setGrunnlag('Ikke-tilgang')}>
                        Ikke tilgang
                    </Radio>
                    <Radio value={true} name="begrunnelse" onClick={() => setGrunnlag('Finner ikke inntekt')}>
                        Finner ikke inntekt fra a-melding
                    </Radio>
                    <Radio
                        value={true}
                        name="begrunnelse"
                        onClick={() => setGrunnlag('Ikke mottatt SMS med lenke til refusjon og varsel')}
                    >
                        Ikke mottatt SMS med lenke til refusjon og varsel
                    </Radio>
                    <Radio value={true} name="begrunnelse" onClick={() => setGrunnlag('Annet')}>
                        Annet
                    </Radio>
                </RadioGroup>
                {grunnlag.includes('Annet') && (
                    <Textarea
                        error={finnFeilMeldingFraInputDialog(['mangler-annet'], skjemaGruppeFeilmeldinger)}
                        label="Oppgi grunnlag"
                        maxLength={100}
                        value={annetGrunnlag}
                        onChange={(event) => setAnnetGrunnlag(event.target.value)}
                    />
                )}
            </Fieldset>
        </div>
    );
};
export default GrunnlagTilForlengelse;

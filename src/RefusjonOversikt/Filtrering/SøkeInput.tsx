
import { Søkeknapp } from 'nav-frontend-ikonknapper';
import { Input } from 'nav-frontend-skjema';
import { NavFrontendInputProps } from 'nav-frontend-skjema/lib/input';
import { SkjemaelementFeil } from 'nav-frontend-skjema/lib/skjemaelement-feilmelding';
import React, { FormEvent, FunctionComponent, useState } from 'react';
import useValidering from '../../Komponenter/UseValidering';

type Props = NavFrontendInputProps & {
    utførSøk: (søkeord: string) => void;
    valider: (verdi: string) => SkjemaelementFeil | undefined;
};

export const SøkeInput: FunctionComponent<Props> = props => {
    const [søkeord, setSøkeord] = useState<string>('');
    const [skjemaelementfeil, setSkjemaelementfeil, valider] = useValidering(søkeord, [props.valider]);

    const utførSøk = () => {
        if (valider()) {
            props.utførSøk(søkeord);
        }
    };

    const onBlur = () => {
        valider();
    };

    const onChange = (event: FormEvent<HTMLInputElement>) => {
        setSøkeord(event.currentTarget.value.toUpperCase());
        setSkjemaelementfeil(undefined);
    };

    const enterKlikk = (event: any) => {
        if (event.key === 'Enter') {
            const nyttSøkeord = event.currentTarget.value;
            setSøkeord(nyttSøkeord);
            utførSøk();
        }
    };

    return (
        <>
            <Input
                label={props.label}
                maxLength={props.maxLength}
                placeholder={props.placeholder}
                value={søkeord}
                onChange={onChange}
                onBlur={onBlur}
                onKeyPress={enterKlikk}
                feil={skjemaelementfeil}
            />
            <Søkeknapp onClick={utførSøk} />
        </>
    );
};

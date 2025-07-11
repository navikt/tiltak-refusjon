import React, { useCallback, useEffect, useState } from 'react';

import validator from 'norsk-validator';
import { TextField, debounce } from '@navikt/ds-react';

import styles from './KIDInputValidator.module.less';

interface Props {
    kid?: string;
    onEndring?: (kid?: string) => void;
    onFeil?: (msg?: string) => void;
}

const bedriftKidRegex = new RegExp('[^ 0-9\\d]|^0+$');

const KIDInputValidator = (props: Props) => {
    const { onEndring = (f) => f, onFeil = (f) => f } = props;

    const [kid, setKid] = useState(props.kid || '');
    const [feil, setfeil] = useState(false);

    useEffect(() => {
        onFeil(feil ? 'KID-nummeret du har fylt ut er ikke gyldig' : undefined);
    }, [feil, onFeil]);

    const validerOgSettKid = useCallback(
        debounce((nyKid: string) => {
            const erGyldigKID = !bedriftKidRegex.test(nyKid) && validator.kidnummer(nyKid);
            if (erGyldigKID) {
                onEndring(nyKid);
            } else {
                setfeil(true);
            }
        }, 500),
        [onEndring, setfeil]
    );

    return (
        <>
            <TextField
                className={styles.textField}
                hideLabel
                label="KID-nummer"
                placeholder="KID-nummer"
                value={kid}
                size="small"
                type="text"
                onBlur={() => {
                    if (feil) {
                        onEndring(undefined);
                    }
                }}
                onChange={(event) => {
                    const nyKid = event.currentTarget.value.trim();
                    setKid(nyKid);
                    setfeil(false);

                    if (!nyKid || nyKid?.length === 0) {
                        onEndring(undefined);
                        return;
                    }

                    validerOgSettKid(nyKid);
                }}
                error={feil && 'Feil KID-nummer'}
            />
        </>
    );
};
export default KIDInputValidator;

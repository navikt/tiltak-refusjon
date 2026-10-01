import { BodyShort } from '@navikt/ds-react';
import React, { FunctionComponent, PropsWithChildren, ReactNode } from 'react';

import styles from './UtregningsradNext.module.css';
import { Inntektslinje, Tilskuddsgrunnlag, UtgårÅrsak } from '~/types/refusjon';
import classNames from 'classnames';

interface Props {
    labelIkon?: string | ReactNode;
    labelTekst: string | ReactNode;
    labelSats?: number | string;
    verdiOperator?: ReactNode;
    verdi: string;
    inntekter?: Inntektslinje[];
    tilskuddsgunnlag?: Tilskuddsgrunnlag;
    utgår?: UtgårÅrsak;
    uthevet?: boolean;
    graaBakgrunn?: boolean;
}

const Utregningsrad: FunctionComponent<PropsWithChildren<Props>> = (props) => {
    const setIkon = (ikon?: React.ReactNode) =>
        ikon ? ikon : <span className={styles.ikonPlaceholder} aria-hidden={true} />;

    const labelTekstString = typeof props.labelTekst === 'string' ? props.labelTekst : undefined;

    return (
        <div className={classNames(styles.wrapper, props.graaBakgrunn && styles.uthevetBakgrunn)}>
            <div className={styles.utregningRad}>
                <div className={styles.utregningLabel}>
                    <div className={styles.labelInnhold}>
                        {setIkon(props.labelIkon)}
                        <BodyShort size="small" weight={props.uthevet ? 'semibold' : 'regular'} id={labelTekstString}>
                            {props.labelTekst} {props.utgår && <b>UTGÅR</b>}
                        </BodyShort>
                    </div>
                    {props.labelSats && <BodyShort size="small">({props.labelSats})</BodyShort>}
                </div>
                <div className={styles.utregningVerdi}>
                    {props.verdiOperator}
                    <BodyShort
                        weight={props.uthevet ? 'semibold' : 'regular'}
                        size="small"
                        className={classNames(styles.sum, props.utgår && styles.gjennomstreking)}
                        aria-labelledby={labelTekstString}
                    >
                        {props.verdi}
                    </BodyShort>
                </div>
            </div>
            {props.children && (
                <div style={{ marginLeft: '2rem', marginRight: '10rem', marginBottom: '1rem' }}>{props.children}</div>
            )}
        </div>
    );
};

export default Utregningsrad;

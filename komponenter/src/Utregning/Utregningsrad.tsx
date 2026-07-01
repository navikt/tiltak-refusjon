import { BodyShort } from '@navikt/ds-react';
import type { FunctionComponent, PropsWithChildren, ReactNode } from 'react';

import { formatterPenger } from '~/utils/PengeUtils';

import styles from './Utregningsrad.module.less';
import { Inntektslinje, Tilskuddsgrunnlag } from '~/types/refusjon';

const visSatsMedNorskFormatering = (sats?: number) => (sats ? sats * 100 : 0).toLocaleString('no-NB');

interface UtregningsradProps {
    labelIkon?: ReactNode;
    labelTekst: ReactNode;
    labelSubtekst?: ReactNode;
    labelSats?: number;
    verdiOperator?: ReactNode;
    verdi: number | string;
    ikkePenger?: boolean;
    border?: 'NORMAL' | 'TYKK' | 'INGEN';
    inntekter?: Inntektslinje[];
    tilskuddsgunnlag?: Tilskuddsgrunnlag;
    className?: string;
    utgår?: boolean;
}

const Utregningsrad: FunctionComponent<PropsWithChildren<UtregningsradProps>> = (
    props: PropsWithChildren<UtregningsradProps>
) => {
    const border = () => {
        switch (props.border) {
            case 'NORMAL':
            case undefined:
                return '';
            case 'TYKK':
                return styles.tykkBunn;
            case 'INGEN':
                return styles.ingenBunn;
            default:
                return '';
        }
    };

    const labelTekstString = typeof props.labelTekst === 'string' ? props.labelTekst : undefined;

    return (
        <div className={styles.utregningWrapper + ' ' + border() + (props.className ? ' ' + props.className : '')}>
            <div className={styles.rad}>
                <div className={styles.utregningLabel}>
                    <div className={styles.labelInnhold}>
                        {props.labelIkon || <span className={styles.ikonPlaceholder} aria-hidden={true} />}
                        {
                            <span id={labelTekstString}>
                                {props.labelTekst} {props.utgår ? <b>UTGÅR</b> : null}
                            </span>
                        }
                    </div>
                    {props.labelSats && (
                        <BodyShort size="small">({visSatsMedNorskFormatering(props.labelSats)}%)</BodyShort>
                    )}
                    {props.labelSubtekst && props.labelSubtekst}
                </div>
                <span className={styles.utregningVerdi}>
                    {props.verdiOperator}
                    <BodyShort
                        size="small"
                        className={[styles.sum, props.utgår && styles.utgaar].filter((x) => x).join(' ')}
                        aria-labelledby={labelTekstString}
                    >
                        {props.ikkePenger || typeof props.verdi === 'string'
                            ? props.verdi
                            : formatterPenger(props.verdi)}
                    </BodyShort>
                </span>
            </div>
            {props.children && <div className={styles.childrenWrapper}>{props.children}</div>}
        </div>
    );
};

export default Utregningsrad;

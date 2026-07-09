import { BodyShort } from '@navikt/ds-react';
import type { FunctionComponent, PropsWithChildren, ReactNode } from 'react';
import classnames from 'classnames';

import { formatterPenger } from '~/utils/PengeUtils';

import styles from './Utregningsrad.module.less';

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
    className?: string;
    utgår?: boolean;
}

const Utregningsrad: FunctionComponent<PropsWithChildren<UtregningsradProps>> = (
    props: PropsWithChildren<UtregningsradProps>
) => {
    const labelTekstString = typeof props.labelTekst === 'string' ? props.labelTekst : undefined;

    return (
        <div
            className={classnames(
                styles.utregningWrapper,
                {
                    [styles.tykkBunn]: props.border === 'TYKK',
                    [styles.ingenBunn]: props.border === 'INGEN',
                },
                props.className
            )}
        >
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
                        className={classnames(styles.sum, { [styles.utgaar]: props.utgår })}
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

import { BodyShort, Box, HStack, VStack } from '@navikt/ds-react';
import React, { FunctionComponent, PropsWithChildren } from 'react';

import styles from './Utregningsrad.module.less';
import { Inntektslinje, Tilskuddsgrunnlag } from '~/types/refusjon';
import classNames from 'classnames';
import {
    BankNoteIcon,
    Buildings2Icon,
    EqualsIcon,
    MinusIcon,
    MultiplyIcon,
    ParasolBeachIcon,
    PencilIcon,
    PercentIcon,
    PiggybankIcon,
    PlusIcon,
    SackKronerIcon,
} from '@navikt/aksel-icons';
import { Fortegn, Utregningslinje, UtregningsLinjeType } from '~/types/utregning';

interface Props {
    inntekter?: Inntektslinje[];
    tilskuddsgunnlag?: Tilskuddsgrunnlag;
    uthevet?: boolean;
    graaBakgrunn?: boolean;
    utregningslinje: Utregningslinje;
}

const konverterFortegn = (fortegn?: Fortegn) => {
    switch (fortegn) {
        case Fortegn.PLUSS:
            return <PlusIcon title="pluss" />;
        case Fortegn.MINUS:
            return <MinusIcon title="minus" />;
        case Fortegn.ER_LIK:
            return <EqualsIcon title="er lik" />;
        case Fortegn.MULTIPLISER:
            return <MultiplyIcon title="ganger" />;
        default:
            return null;
    }
};

const ikonForType = (type: UtregningsLinjeType) => {
    switch (type) {
        case UtregningsLinjeType.FERIEPENGER:
            return <ParasolBeachIcon aria-hidden={true} />;
        case UtregningsLinjeType.ARBEIDSGIVERAVGIFT:
            return <Buildings2Icon aria-hidden={true} />;
        case UtregningsLinjeType.OBLIGATORISK_TJENESTEPENSJON:
            return <PiggybankIcon aria-hidden={true} />;
        case UtregningsLinjeType.TILSKUDDSPROSENT:
            return <PercentIcon aria-hidden={true} />;
        case UtregningsLinjeType.REFUSJONSBELOP_TIL_UTBETALING:
            return <BankNoteIcon aria-hidden={true} />;
        case UtregningsLinjeType.TIMELONN_X_TIMER:
        case UtregningsLinjeType.AVTALT_BELOP:
        case UtregningsLinjeType.AVTALT_BELOP_REST_5G:
            return <SackKronerIcon aria-hidden={true} />;
        case UtregningsLinjeType.RESTERENDE_FRATREKK_FOR_FERIE_FRA_TIDLIGERE_REFUSJONER:
            return <PencilIcon aria-hidden={true} />;
        default:
            return <span className={styles.ikonPlaceholder} aria-hidden={true} />;
    }
};

const Utregningsrad: FunctionComponent<PropsWithChildren<Props>> = (props) => {
    const { utregningslinje } = props;

    return (
        <VStack className={classNames(styles.wrapper, props.graaBakgrunn && styles.uthevetBakgrunn)}>
            <HStack height="3.5rem" align="center" justify="space-between">
                <HStack minWidth="60%" align="center" justify="space-between" className={styles.utregningLabel}>
                    <HStack>
                        {ikonForType(utregningslinje.type)}
                        <BodyShort size="small" weight={props.uthevet ? 'semibold' : 'regular'}>
                            {utregningslinje.label} {utregningslinje.utgårGrunn && <b>UTGÅR</b>}
                        </BodyShort>
                    </HStack>
                    {utregningslinje.utledning && (
                        <BodyShort aria-label="sats" size="small">
                            <span aria-hidden>(</span>
                            {utregningslinje.utledning.formatertVerdi}
                            <span aria-hidden>)</span>
                        </BodyShort>
                    )}
                </HStack>
                <HStack align="center">
                    {konverterFortegn(utregningslinje.fortegn)}
                    <BodyShort
                        align="end"
                        weight={props.uthevet ? 'semibold' : 'regular'}
                        size="small"
                        className={classNames(styles.sum, utregningslinje.utgårGrunn && styles.gjennomstreking)}
                    >
                        {utregningslinje.formatertVerdi}
                    </BodyShort>
                </HStack>
            </HStack>
            {React.Children.toArray(props.children).length > 0 && (
                <Box className={styles.ekstraInformasjon}>{props.children}</Box>
            )}
        </VStack>
    );
};

export default Utregningsrad;

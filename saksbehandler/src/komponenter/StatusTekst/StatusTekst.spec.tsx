import { render, screen } from '@testing-library/react';
import moment from 'moment';
import * as React from 'react';
import { RefusjonStatus } from '../../refusjon/refusjon';
import { datoString, formatterDato } from '../../utils/datoUtils';
import StatusTekst from './StatusTekst';
import { describe, test, expect } from 'vitest';

describe('Skal vise riktig statustekst', () => {
    test('UTGÅTT', () => {
        const tilskuddTom = datoString(moment().add(1, 'days'));
        render(
            <StatusTekst
                status={RefusjonStatus.UTGÅTT}
                tilskuddFom={datoString(moment().subtract(2, 'days'))}
                tilskuddTom={tilskuddTom}
            />
        );
        expect(screen.getByText('Frist utgått')).toBeDefined();
    });

    test('for tidlig', () => {
        const tilskuddTom = datoString(moment().add(1, 'days'));
        render(
            <StatusTekst
                status={RefusjonStatus.FOR_TIDLIG}
                tilskuddFom={datoString(moment().subtract(2, 'days'))}
                tilskuddTom={tilskuddTom}
            />
        );
        expect(screen.getByText('Søk fra ' + formatterDato(tilskuddTom))).toBeDefined();
    });

    test('Klar for innsending', () => {
        render(
            <StatusTekst
                status={RefusjonStatus.KLAR_FOR_INNSENDING}
                tilskuddFom={datoString(moment())}
                tilskuddTom={datoString(moment())}
            />
        );
        expect(screen.getByText(/Klar for innsending/i)).toBeDefined();
    });

    test('Utbetaling feilet', () => {
        render(
            <StatusTekst
                status={RefusjonStatus.UTBETALING_FEILET}
                tilskuddFom={datoString(moment())}
                tilskuddTom={datoString(moment())}
            />
        );
        expect(screen.getByText(/Utbetaling feilet/i)).toBeDefined();
    });

    test('Utbetaling velykket', () => {
        render(
            <StatusTekst
                status={RefusjonStatus.UTBETALT}
                tilskuddFom={datoString(moment())}
                tilskuddTom={datoString(moment())}
            />
        );
        expect(screen.getByText(/Utbetalt/i)).toBeDefined();
    });
});

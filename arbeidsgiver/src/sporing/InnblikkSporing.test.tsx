import { cleanup, render, waitFor } from '@testing-library/react';
import { beforeEach, afterEach, describe, expect, it, vi } from 'vitest';
import { SPORING_SCRIPT_ID } from '~/sporing/config';
import { erSporingDeaktivert } from '~/sporing/localStorage';

let analyticsConsent = false;

vi.mock('@navikt/nav-dekoratoren-moduler', () => ({
    awaitDecoratorData: vi.fn().mockResolvedValue(undefined),
    getCurrentConsent: vi.fn(() => ({
        consent: {
            analytics: analyticsConsent,
            surveys: false,
        },
    })),
}));

import { awaitDecoratorData } from '@navikt/nav-dekoratoren-moduler';
import InnblikkSporing from './InnblikkSporing';

describe('InnblikkSporing', () => {
    beforeEach(() => {
        analyticsConsent = false;
        localStorage.clear();
        window.history.pushState({}, '', '/refusjon');
    });

    afterEach(() => {
        cleanup();
        document.getElementById(SPORING_SCRIPT_ID)?.remove();
        delete window.beforeSendAnalytics;
    });

    it('laster ikke inn sporing før samtykke', async () => {
        render(<InnblikkSporing />);

        await waitFor(() => {
            expect(erSporingDeaktivert()).toBe(true);
            expect(document.getElementById(SPORING_SCRIPT_ID)).toBeNull();
        });
    });

    it('rører ikke deaktivert-flagget før samtykket er kjent', async () => {
        vi.mocked(awaitDecoratorData).mockReturnValueOnce(new Promise(() => {}));
        render(<InnblikkSporing />);

        await Promise.resolve();

        expect(erSporingDeaktivert()).toBe(false);
        expect(document.getElementById(SPORING_SCRIPT_ID)).toBeNull();
    });

    it('laster inn sporing etter samtykke selv om samtykke-cookien ikke er oppdatert ennå', async () => {
        render(<InnblikkSporing />);

        window.dispatchEvent(new Event('consentAllWebStorage'));

        await waitFor(() => {
            expect(erSporingDeaktivert()).toBe(false);
            expect(document.getElementById(SPORING_SCRIPT_ID)).toBeInstanceOf(HTMLScriptElement);
        });

        const script = document.getElementById(SPORING_SCRIPT_ID) as HTMLScriptElement;
        expect(script.getAttribute('data-website-id')).toBe('a901f04e-0b4c-438e-9d98-89021358556a');
        expect(script.getAttribute('data-tag')).toBe('tiltak-refusjon');
        expect(script.getAttribute('data-before-send')).toBe('beforeSendAnalytics');
        expect(script.getAttribute('data-exclude-search')).toBe('true');
        expect(script.src).toContain('sporing-dev.js');
    });

    it('deaktiverer sporing når samtykke trekkes tilbake', async () => {
        analyticsConsent = true;
        render(<InnblikkSporing />);

        await waitFor(() => {
            expect(document.getElementById(SPORING_SCRIPT_ID)).toBeInstanceOf(HTMLScriptElement);
        });

        window.dispatchEvent(new Event('refuseOptionalWebStorage'));

        await waitFor(() => {
            expect(erSporingDeaktivert()).toBe(true);
        });
    });

    it('legger ikke inn skriptet på nytt når samtykke gis igjen', async () => {
        analyticsConsent = true;
        render(<InnblikkSporing />);

        await waitFor(() => {
            expect(document.querySelectorAll(`#${SPORING_SCRIPT_ID}`)).toHaveLength(1);
        });

        window.dispatchEvent(new Event('refuseOptionalWebStorage'));
        await waitFor(() => expect(erSporingDeaktivert()).toBe(true));

        window.dispatchEvent(new Event('consentAllWebStorage'));
        await waitFor(() => expect(erSporingDeaktivert()).toBe(false));

        expect(document.querySelectorAll(`#${SPORING_SCRIPT_ID}`)).toHaveLength(1);
    });
});

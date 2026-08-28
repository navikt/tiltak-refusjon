import { cleanup, render, waitFor } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { SPORING_SCRIPT_ID } from '~/sporing/config';

import InnblikkSporing from './InnblikkSporing';
import { deaktiverSporing, erSporingDeaktivert } from '~/sporing/localStorage';

describe('InnblikkSporing', () => {
    beforeEach(() => {
        localStorage.clear();
        window.history.pushState({}, '', '/refusjon/abc123');
    });

    afterEach(() => {
        cleanup();
        document.getElementById(SPORING_SCRIPT_ID)?.remove();
        delete window.beforeSendAnalytics;
    });

    it('laster sporingsskript og setter forventede attributter', async () => {
        deaktiverSporing();
        render(<InnblikkSporing />);

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

    it('injiserer ikke duplikate skript-tagger', async () => {
        const { rerender } = render(<InnblikkSporing />);

        await waitFor(() => {
            expect(document.querySelectorAll(`#${SPORING_SCRIPT_ID}`)).toHaveLength(1);
        });

        rerender(<InnblikkSporing />);
        expect(document.querySelectorAll(`#${SPORING_SCRIPT_ID}`)).toHaveLength(1);
    });
});

import { act, cleanup, render, waitFor } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { SPORING_SCRIPT_ID } from '~/sporing/config';

import InnblikkSporing from './InnblikkSporing';
import { deaktiverSporing } from '~/sporing/localStorage';
import { settSporingsvalg } from './sporingsvalg';

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
        render(<InnblikkSporing />);

        await waitFor(() => {
            expect(document.getElementById(SPORING_SCRIPT_ID)).toBeInstanceOf(HTMLScriptElement);
        });

        const script = document.getElementById(SPORING_SCRIPT_ID) as HTMLScriptElement;
        expect(script.getAttribute('data-website-id')).toBe('a901f04e-0b4c-438e-9d98-89021358556a');
        expect(script.getAttribute('data-tag')).toBe('tiltak-refusjon');
        expect(script.getAttribute('data-before-send')).toBe('beforeSendAnalytics');
        expect(script.getAttribute('data-exclude-search')).toBe('true');
        expect(script.src).toContain('sporing-dev.js');
    });

    it('laster ikke sporingsskript når bruker har skrudd av sporing', async () => {
        deaktiverSporing();
        render(<InnblikkSporing />);

        await waitFor(() => {
            expect(document.getElementById(SPORING_SCRIPT_ID)).toBeNull();
        });
    });

    it('fjerner sporingsskript når bruker skrur av sporing underveis', async () => {
        render(<InnblikkSporing />);

        await waitFor(() => {
            expect(document.getElementById(SPORING_SCRIPT_ID)).toBeInstanceOf(HTMLScriptElement);
        });

        act(() => {
            settSporingsvalg(false);
        });

        expect(document.getElementById(SPORING_SCRIPT_ID)).toBeNull();
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

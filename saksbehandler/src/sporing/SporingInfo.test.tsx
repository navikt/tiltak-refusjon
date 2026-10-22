import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { erSporingDeaktivert } from '~/sporing/localStorage';

import SporingInfo from './SporingInfo';

describe('SporingInfo', () => {
    beforeEach(() => {
        localStorage.clear();
    });

    afterEach(() => {
        cleanup();
    });

    it('informerer om sporingen', () => {
        render(<SporingInfo />);

        expect(screen.getByText(/samler inn statistikk/i)).toBeDefined();
        expect(screen.getByRole('button', { name: 'Hva samler vi inn?' })).toBeDefined();
    });

    it('lar bruker skru av og på sporing', () => {
        render(<SporingInfo />);

        const bryter = screen.getByRole('checkbox', { name: 'Samle statistikk' });
        expect((bryter as HTMLInputElement).checked).toBe(true);

        fireEvent.click(bryter);
        expect(erSporingDeaktivert()).toBe(true);
        expect((bryter as HTMLInputElement).checked).toBe(false);

        fireEvent.click(bryter);
        expect(erSporingDeaktivert()).toBe(false);
        expect((bryter as HTMLInputElement).checked).toBe(true);
    });

    it('viser valget som er lagret fra før', () => {
        localStorage.setItem('sporing.disabled', '1');
        render(<SporingInfo />);

        const bryter = screen.getByRole('checkbox', { name: 'Samle statistikk' }) as HTMLInputElement;
        expect(bryter.checked).toBe(false);
    });
});

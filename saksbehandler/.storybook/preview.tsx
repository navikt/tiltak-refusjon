import React from 'react';
import type { Preview } from '@storybook/react-vite';
import '@/index.css';
import '@navikt/ds-css';
import { BrukerContext } from '@/bruker/BrukerContext';

const mockInnloggetBruker = {
    identifikator: 'Z123456',
    harKorreksjonTilgang: true,
    rolle: 'BESLUTTER' as const,
};

const preview: Preview = {
    parameters: {
        actions: { argTypesRegex: '^on[A-Z].*' },
        controls: {
            matchers: {
                color: /(background|color)$/i,
                date: /Date$/i,
            },
        },
    },
    decorators: [
        (Story) => (
            <BrukerContext.Provider value={{ innloggetBruker: mockInnloggetBruker }}>
                <Story />
            </BrukerContext.Provider>
        ),
    ],
};

export default preview;

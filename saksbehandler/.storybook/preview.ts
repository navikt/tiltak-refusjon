import type { Preview } from '@storybook/react';
import '@/index.css';
import '@navikt/ds-css';
import { initialize, mswLoader } from 'msw-storybook-addon';
import { mswHandlers } from '@/msw/handlers';

initialize();

const preview: Preview = {
    parameters: {
        msw: {
            handlers: { defaults: mswHandlers },
        },
        actions: { argTypesRegex: '^on[A-Z].*' },
        controls: {
            matchers: {
                color: /(background|color)$/i,
                date: /Date$/i,
            },
        },
    },
    loaders: [mswLoader],
};

export default preview;

import { injectDecoratorServerSide } from '@navikt/nav-dekoratoren-moduler/ssr';
import { Handler } from 'express';

export default (indexFilepath: string): Handler => {
    if (process.env.MILJO === 'dev-gcp-labs') {
        return (_, res) => {
            res.sendFile(indexFilepath);
        };
    }
    return async (_, res) => {
        try {
            const html = await injectDecoratorServerSide({
                env: process.env.MILJO === 'prod-gcp' ? 'prod' : 'dev',
                filePath: indexFilepath,
                params: {
                    context: 'arbeidsgiver',
                    chatbot: true,
                    redirectToApp: true,
                    level: 'Level4',
                    language: 'nb',
                },
            });

            res.send(html);
        } catch (error) {
            console.log('Feil ved henting av dekorator: ', error);
            res.sendFile(indexFilepath);
        }
    };
};

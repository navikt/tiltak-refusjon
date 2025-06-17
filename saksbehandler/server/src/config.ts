const envVar = ({ name, required = true }: { name: string; required?: boolean }) => {
    if (!process.env[name] && required) {
        console.error(`Missing required environment variable '${name}'`);
        process.exit(1);
    }
    return process.env[name] ?? '';
};

export const apiConfig = () => ({
    clientId: envVar({ name: 'API_CLIENT_ID' }),
    url: envVar({ name: 'API_URL' }),
});

export const decoratorConfig = () => ({
    host: envVar({ name: 'DECORATOR_HOST' }),
    modiaContextHolderScope: envVar({ name: 'MODIA_CONTEXT_HOLDER_SCOPE', required: false }),
});

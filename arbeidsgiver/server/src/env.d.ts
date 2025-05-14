declare global {
    namespace NodeJS {
        interface ProcessEnv {
            API_AUDIENCE: string;
            API_URL: string;
            DECORATOR_URL: string;
            MILJO: string;
        }
    }
}

export {};

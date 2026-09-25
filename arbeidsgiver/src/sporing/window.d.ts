export {};

declare global {
    interface Window {
        beforeSendAnalytics?: (type: string, payload: Record<string, unknown>) => Record<string, unknown> | false;
    }
}

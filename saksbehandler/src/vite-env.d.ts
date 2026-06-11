/// <reference types="vite-plugin-svgr/client" />
/// <reference types="vite/client" />

declare namespace React {
    namespace JSX {
        interface IntrinsicElements {
            'internarbeidsflate-decorator': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
                'app-name'?: string;
                environment?: string;
                proxy?: string;
                'fetch-active-enhet-on-mount'?: boolean;
                'fetch-active-user-on-mount'?: boolean;
                'fnr-sync-mode'?: string;
                'enhet-sync-mode'?: string;
                fnr?: string;
                'url-format'?: string;
                'enable-hotkeys'?: boolean;
                'show-hotkeys'?: boolean;
            };
        }
    }
}

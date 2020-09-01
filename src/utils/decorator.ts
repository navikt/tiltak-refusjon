const fragments = {
  header: '<section id="decorator-header"/>',
  footer: '<section id="decorator-footer"/>',
  styles:
    '<link href="https://www.nav.no/dekoratoren/css/client.css" rel="stylesheet"/>',
  env:
    '<div id="decorator-env" data-src="https://www.nav.no/dekoratoren/env"></div>',
};

export const isDevelopment = () => process.env.NODE_ENV === "development";

const getScript = () => {
  const script = document.createElement("script");
  script.src = "https://www.nav.no/dekoratoren/client.js";
  document.body.appendChild(script);
};

const injectFragments = (
  header: string,
  footer: string,
  styles: string,
  env: string
) => {
  document.body.innerHTML = document.body.innerHTML
    .replace("{{{NAV_HEADING}}}", header)
    .replace("{{{NAV_FOOTER}}}", footer)
    .replace("{{{NAV_STYLES}}}", styles)
    .replace("{{{NAV_SCRIPTS}}}", "")
    .replace("{{{NAV_SKIPLINKS}}}", env);
};

export const setHeaderAndFooter = (setHeader: boolean = true) => {
  if (setHeader) {
    injectFragments(
      fragments.header,
      fragments.footer,
      fragments.styles,
      fragments.env
    );
    getScript();
  } else {
    injectFragments("", "", "", "");
  }
};

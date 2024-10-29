export const storForbokstav = (tekst: string) => {
    return tekst ? tekst.toLowerCase().replace(/\b\w/, (v) => v.toUpperCase()) : tekst;
};


export const kunStorForbokstav = (tekst: string) => {
    return tekst ? tekst.replace(/\b\w/, (v) => v.toUpperCase()) : tekst;
};
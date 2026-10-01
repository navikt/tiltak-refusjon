const fnrRegex = /\b\d{11}\b/g;
const navIdentRegex = /\b[A-Za-z]\d{6}\b/g;

export function sladdFnrOgNavIdent(value?: string): string | undefined {
    if (!value) {
        return value;
    }

    const queryOrHashStart = value.search(/[?#]/);
    const redacted = queryOrHashStart === -1 ? value : value.slice(0, queryOrHashStart);

    return redacted.replace(fnrRegex, '***********').replace(navIdentRegex, '*******');
}

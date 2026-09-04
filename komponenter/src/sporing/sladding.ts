const fnrRegex = /\b\d{11}\b/g;
const navIdentRegex = /\b[A-Za-z]\d{6}\b/g;

export function sladdFnrOgNavIdent(value?: string): string | undefined {
    if (!value) {
        return value;
    }

    let redacted = value;

    try {
        const url = new URL(value);
        url.search = '';
        url.hash = '';
        redacted = url.toString();
    } catch {
        redacted = value;
    }

    return redacted.replace(fnrRegex, '***********').replace(navIdentRegex, '*******');
}

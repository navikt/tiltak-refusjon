export function deaktiverSporing(): void {
    try {
        window.localStorage.setItem('sporing.disabled', '1');
    } catch {
        console.error('Could not set localStorage item "sporing.disabled"');
        // setItem kan kaste feil hvis lagring er fult eller blokkert av strengere cookie settings
    }
}

export function aktiverSporing(): void {
    try {
        window.localStorage.removeItem('sporing.disabled');
    } catch {
        console.error('Could not remove localStorage item "sporing.disabled"');
        // removeItem kan kaste feil hvis lagring er blokkert av strengere cookie settings
    }
}

export function erSporingDeaktivert(): boolean {
    try {
        return window.localStorage.getItem('sporing.disabled') === '1';
    } catch {
        console.error('Could not get localStorage item "sporing.disabled"');
        // getItem kan kaste feil hvis lagring er blokkert av strengere cookie settings
        return true;
    }
}

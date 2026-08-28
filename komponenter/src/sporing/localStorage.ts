export function deaktiverSporing(): void {
    try {
        window.localStorage.setItem('sporing.disabled', '1');
    } catch {
        // setItem kan kaste feil hvis lagring er fult eller blokkert av strengere cookie settings
    }
}

export function aktiverSporing(): void {
    window.localStorage.removeItem('sporing.disabled');
}

export function erSporingDeaktivert(): boolean {
    return window.localStorage.getItem('sporing.disabled') === '1';
}

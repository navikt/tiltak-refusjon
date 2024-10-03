export const visSatsMedEttDesimal = (sats?: number) => (sats ? sats * 100 : 0).toFixed(1);

export const visSatsMedNorskFormatering = (sats?: number) => (sats ? sats * 100 : 0).toLocaleString('no-NB');
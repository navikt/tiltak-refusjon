export enum Feature {
    ArbeidsgiverNyRefusjon = 'arbeidsgiverNyRefusjon',
    ManueltMinusbelop = 'manueltMinusbelop',
    InkluderingstilskuddRefusjon = 'inkluderingstilskuddRefusjon',
}

export type FeatureToggles = Record<Feature, boolean>;

export const defaultFeatureToggles: FeatureToggles = {
    [Feature.ArbeidsgiverNyRefusjon]: false,
    [Feature.ManueltMinusbelop]: false,
    [Feature.InkluderingstilskuddRefusjon]: false,
};

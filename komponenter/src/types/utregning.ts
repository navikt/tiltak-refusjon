export interface Utregning {
    grupper: Utregningsgruppe[];
}

export type Utregningsgruppe = Utregningslinje[];

export interface Utregningslinje {
    type: UtregningsLinjeType;
    label: string;
    formatertVerdi: string;
    fortegn?: Fortegn;
    utledning?: Verdi;
    utgårGrunn?: UtgårÅrsak;
}

export enum Fortegn {
    ER_LIK = 'ER_LIK',
    MINUS = 'MINUS',
    MULTIPLISER = 'MULTIPLISER',
    PLUSS = 'PLUSS',
}

export enum UtgårÅrsak {
    OVER_AVTALT_TILSKUDD = 'OVER_AVTALT_TILSKUDD',
    OVER_FEM_GRUNNBELOP = 'OVER_FEM_GRUNNBELOP',
    FRAVAERSTREKK_GIR_MINUSBELOP = 'FRAVAERSTREKK_GIR_MINUSBELOP',
}

export enum UtregningsLinjeType {
    ARBEIDSGIVERAVGIFT = 'ARBEIDSGIVERAVGIFT',
    AVTALT_BELOP = 'AVTALT_BELOP',
    AVTALT_BELOP_REST_5G = 'AVTALT_BELOP_REST_5G',
    BEREGNET_BELOP = 'BEREGNET_BELOP',
    BRUTTOLONN_I_PERIODEN = 'BRUTTOLONN_I_PERIODEN',
    FERIEPENGER = 'FERIEPENGER',
    FERIETREKK = 'FERIETREKK',
    OBLIGATORISK_TJENESTEPENSJON = 'OBLIGATORISK_TJENESTEPENSJON',
    REFUSJONSBELOP_TIL_UTBETALING = 'REFUSJONSBELOP_TIL_UTBETALING',
    RESTERENDE_FRATREKK_FOR_FERIE_FRA_TIDLIGERE_REFUSJONER = 'RESTERENDE_FRATREKK_FOR_FERIE_FRA_TIDLIGERE_REFUSJONER',
    TIMELONN_X_TIMER = 'TIMELONN_X_TIMER',
    TILSKUDDSPROSENT = 'TILSKUDDSPROSENT',
}

export interface Verdi {
    formatertVerdi: string;
}

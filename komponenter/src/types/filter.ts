import { RefusjonStatus } from './status';
import { Tiltak } from './tiltak';

export interface Filter {
    status?: RefusjonStatus | undefined;
    tiltakstype?: Tiltak | undefined;
    sorting?: SortingOrder | undefined;
    page?: number | undefined;
    size?: number | undefined;
}

export enum SortingOrder {
    TILTAKSTYPE_ASC = 'TILTAKSTYPE_ASC',
    TILTAKSTYPE_DESC = 'TILTAKSTYPE_DESC',
    BEDRIFT_ASC = 'BEDRIFT_ASC',
    BEDRIFT_DESC = 'BEDRIFT_DESC',
    DELTAKER_ASC = 'DELTAKER_ASC',
    DELTAKER_DESC = 'DELTAKER_DESC',
    PERIODE_ASC = 'PERIODE_ASC',
    PERIODE_DESC = 'PERIODE_DESC',
    STATUS_ASC = 'STATUS_ASC',
    STATUS_DESC = 'STATUS_DESC',
    FRISTFORGODKJENNING_ASC = 'FRISTFORGODKJENNING_ASC',
    FRISTFORGODKJENNING_DESC = 'FRISTFORGODKJENNING_DESC',
}

import {
    BASE_AUTHORITY,
    SPECIAL_AUTHORITY
} from '../../constants/autorities'

export const USER = [
    BASE_AUTHORITY,
];

export const ADMIN = [
    ...USER,
    SPECIAL_AUTHORITY,
];
import {AxiosError} from 'axios';
import {ERROR_CODES} from './errorCodes';

export type Error = AxiosError<{error: keyof typeof ERROR_CODES | string}>;

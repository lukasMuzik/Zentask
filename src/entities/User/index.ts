import type {User as UserType} from '../../../backend/database/users';

export type User = Omit<UserType, 'createdAt' | 'password'>;

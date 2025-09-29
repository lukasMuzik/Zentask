export type UserType = {username: string; password: string; createdAt: string; id: string};

export type User = Omit<UserType, 'createdAt' | 'password'>;

export interface User {
  userId: number;
  userName: string;
  userPassword: string;
  userMail: string;
  firstName: string;
  lastName: string;
  role: string;
  address: string;
  city: string;
  state: string;
  zip: number;
}

export enum UserRole {
  Admin = 'ADMIN',
  User = 'USER',
  Guest = 'GUEST',
}

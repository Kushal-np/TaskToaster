export interface IUser {
  _id: string;
  name: string;
  email: string;
  phone: string;
  clubIds: string[];
  role: 'user' | 'admin' | 'superadmin';
  createdAt: string;
  updatedAt: string;
}

export interface IAuthResponse {
  user: IUser;
  message: string;
  // The token might be handled by httpOnly cookies, but it's good to have in the type
  // for potential use cases or alternative auth strategies.
  token?: string;
}
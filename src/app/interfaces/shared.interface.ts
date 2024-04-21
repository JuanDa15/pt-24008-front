export type UserType = 'user' | 'admin';

export interface ServerResponse<T = any> {
  ok: boolean;
  message: string;
  data?: T
}

export interface User {
  _id: string;
  name: string;
  email: string;
  type: UserType;
}


export interface LoginResponse extends User {
  token: string;
}

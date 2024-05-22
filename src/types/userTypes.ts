export interface IUser {
  id: string;
  name: string;
  email: string;
  password: string;
  space_used: string;
  created_at: string;
  updated_at: string;
}

export interface ICreateUser extends Pick<IUser, 'name' | 'email' | 'password'> {}

export interface ILoginRequest extends Pick<IUser, 'email' | 'password'>{}

export interface ILoginResponse extends Omit<IUser, 'password'> {
  token: string;
}
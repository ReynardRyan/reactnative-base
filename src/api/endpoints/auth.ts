import client from '../client';

export type LoginBody = {
  email: string;
  password: string;
};

export type LoginResponse = {
  token: string;
};

export async function login(body: LoginBody): Promise<LoginResponse> {
  return client.post<LoginResponse, LoginBody>('/auth/login', body);
}

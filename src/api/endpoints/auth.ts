import client from '../client';

export type LoginBody = {
  username: string;
  password: string;
};

export type LoginResponse = {
  token: string;
};

export async function login(body: LoginBody): Promise<LoginResponse> {
  const raw = await client.post<any, LoginBody>('/auth/login', body);
  const token = raw?.token ?? raw?.access_token ?? raw?.data?.token ?? raw?.data?.access_token ?? '';
  return { token } as LoginResponse;
}

import { post } from './helper';


export const registerUser = async (data: { email: string, fullName: string, password: string; }) => {
  const user = await post('/users/register', data, {});
  return user;
};

export const loginUser = async (data: { email: string, fullName: string, password: string; }) => {
  const user = await post('/users/login', data, {});
  return user;
};
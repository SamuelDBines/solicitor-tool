import { post } from './helper';


export const registerUser = async (data: { email: string, fullName: string, password: string; }) => post('/users/register', data, {});

export const loginUser = async (data: { email: string, fullName: string, password: string; }) => post('/users/login', data, {});
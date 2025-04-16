export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
  role: 'admin' | 'user';
  image_url: string;
  height: number;
  weight: number;
};

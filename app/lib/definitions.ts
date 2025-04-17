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

export type FighterInFight = User & {
  result: 'win' | 'loss';
};

export type Fight = {
  id: string;
  location: string;
  date: string;
  fighters: FighterInFight[];
};

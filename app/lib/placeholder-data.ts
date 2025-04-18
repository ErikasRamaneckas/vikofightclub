const users = [
  {
    id: '9eebc745-4131-40dd-9109-d451ebd214c8',
    name: 'Tyler Durden',
    email: 'admin@fc.com',
    password: '123456',
    role: 'admin',
    image_url: '/fighters/tyler-durden.webp',
    height: 180,
    weight: 70,
  },
  {
    id: '334e74d5-abf4-4c6d-996e-b5754871f83e',
    name: 'The Narrator',
    email: 'thenarrator@fc.com',
    password: 'password1',
    role: 'user',
    image_url: '/fighters/the-narrator.webp',
    height: 183,
    weight: 73,
  },
  {
    id: 'e78ede72-66c8-45bf-bd8b-6d186c7e4513',
    name: 'Robert Paulson',
    email: 'robertpaulson@fc.com',
    password: 'password2',
    role: 'user',
    image_url: '/fighters/robert-paulson.jpg',
    height: 178,
    weight: 130,
  },
  {
    id: 'd04ba762-5af6-4e2e-8e85-2615d5deaffc',
    name: 'Angel Face',
    email: 'angelface@fc.com',
    password: 'password3',
    role: 'user',
    image_url: '/fighters/angel-face.webp',
    height: 180,
    weight: 68,
  },
  {
    id: '40695ceb-b58a-41f8-ac48-cf2eebf1bdee',
    name: 'Mechanic',
    email: 'mechanic@fc.com',
    password: 'password4',
    role: 'user',
    image_url: '/fighters/mechanic.jpg',
    height: 185,
    weight: 90,
  },
];

const fights = [
  {
    location: 'Basement',
    date: '2025-01-12',
    fighters: [
      { userId: users[0].id, result: 'win' },
      { userId: users[1].id, result: 'loss' },
    ],
  },
  {
    location: 'Parking Garage',
    date: '2025-01-10',
    fighters: [
      { userId: users[2].id, result: 'win' },
      { userId: users[3].id, result: 'loss' },
    ],
  },
  {
    location: 'Bar Backroom',
    date: '2025-01-11',
    fighters: [
      { userId: users[4].id, result: 'win' },
      { userId: users[1].id, result: 'loss' },
    ],
  },
];

export { users, fights };

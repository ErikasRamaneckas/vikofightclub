import bcrypt from 'bcryptjs';
import { sql } from '@vercel/postgres';
import { users, fights } from '@/app/lib/placeholder-data';

async function seedUsers() {
  await sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
  await sql`
    CREATE TABLE IF NOT EXISTS users (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      name TEXT NOT NULL,
      email TEXT NOT NULL UNIQUE,
      password TEXT NOT NULL,
      role TEXT NOT NULL,
      image_url TEXT NOT NULL,
      height INT NOT NULL,
      weight INT NOT NULL
    );
  `;

  const insertedUsers = await Promise.all(
    users.map(async (user) => {
      const hashedPassword = await bcrypt.hash(user.password, 10);
      return sql`
        INSERT INTO users (id, name, email, password, role, image_url, height, weight)
        VALUES (${user.id}, ${user.name}, ${user.email}, ${hashedPassword}, ${user.role}, ${user.image_url}, ${user.height}, ${user.weight})
        ON CONFLICT (id) DO NOTHING;
      `;
    })
  );

  return insertedUsers;
}

async function seedFights() {
  await sql`
    CREATE TABLE IF NOT EXISTS fights (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      location TEXT,
      date TIMESTAMP DEFAULT NOW()
    );
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS fighter_fights (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      fight_id UUID REFERENCES fights(id) ON DELETE CASCADE,
      fighter_id UUID REFERENCES users(id) ON DELETE CASCADE,
      result TEXT,
      UNIQUE(fight_id, fighter_id)
    );
  `;

  for (const fight of fights) {
    const fightResult = await sql`
      INSERT INTO fights (location, date)
      VALUES (${fight.location}, ${fight.date})
      RETURNING id;
    `;

    const fightId = fightResult.rows[0].id;

    for (const f of fight.fighters) {
      await sql`
        INSERT INTO fighter_fights (fight_id, fighter_id, result)
        VALUES (${fightId}, ${f.userId}, ${f.result});
      `;
    }
  }
}

export async function GET() {
  try {
    await seedUsers();
    await seedFights();
    return Response.json({ message: 'Database seeded succesfully' });
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}

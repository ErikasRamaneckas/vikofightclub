import bcrypt from 'bcryptjs';
import { sql } from '@vercel/postgres';
import { users } from '@/app/lib/placeholder-data';

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

export async function GET() {
  try {
    await seedUsers();
    return Response.json({ message: 'Database seeded succesfully' });
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}

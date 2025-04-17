'use server';
import { signIn } from '@/auth';
import { AuthError } from 'next-auth';
import { sql } from '@vercel/postgres';
import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import bcrypt from 'bcryptjs';
import { redirect } from 'next/navigation';

export async function authenticate(
  prevState: string | undefined,
  formData: FormData
) {
  try {
    await signIn('credentials', formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid credentials.';
        default:
          return 'Something went wrong.';
      }
    }
    throw error;
  }
}

const FormSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string(),
  password: z.string(),
  role: z.enum(['user', 'admin'], {
    invalid_type_error: 'Please select a role.',
  }),
  image_url: z.string(),
  height: z.coerce.number().gt(100).lt(250),
  weight: z.coerce.number().gt(30).lt(250),
});

const CreateFighter = FormSchema.omit({ id: true });
const UpdateFighter = FormSchema.omit({ id: true });

export type FighterState = {
  errors?: {
    name?: string[];
    email?: string[];
    password?: string[];
    role?: string[];
    image_url?: string[];
    height?: string[];
    weight?: string[];
  };
  message?: string | null;
};

export async function createFighter(
  prevState: FighterState,
  formData: FormData
) {
  const validatedFields = CreateFighter.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    password: formData.get('password'),
    role: formData.get('role'),
    image_url: formData.get('image_url'),
    height: formData.get('height'),
    weight: formData.get('weight'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing fields. Failed to create user',
    };
  }

  const { name, email, password, role, image_url, height, weight } =
    validatedFields.data;

  const { rows: existingUser } = await sql`
    SELECT * FROM users WHERE email = ${email}
  `;

  if (existingUser.length > 0) {
    return {
      message: 'Email already in use.',
    };
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    await sql`
      INSERT INTO users (name, email, password, role, image_url, height, weight)
      VALUES (${name}, ${email}, ${hashedPassword}, ${role}, ${image_url}, ${height}, ${weight})
    `;
  } catch (error) {
    console.error(error);
    return {
      message: 'Database error: Failed to create user',
    };
  }

  revalidatePath('/dashboard/fighters');
  redirect('/dashboard/fighters');
}

export async function updateFighter(
  id: string,
  prevState: FighterState,
  formData: FormData
) {
  const validatedFields = UpdateFighter.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    password: formData.get('password'),
    role: formData.get('role'),
    image_url: formData.get('image_url'),
    height: formData.get('height'),
    weight: formData.get('weight'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Update Fighter.',
    };
  }

  const { name, email, password, role, image_url, height, weight } =
    validatedFields.data;

  try {
    const { rows: emailInUse } = await sql`
      SELECT * FROM users WHERE email = ${email} AND id != ${id}
    `;

    if (emailInUse.length > 0) {
      return {
        message: 'Email already in use by another user.',
      };
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await sql`
      UPDATE users
      SET name = ${name},
          email = ${email},
          password = ${hashedPassword},
          role = ${role},
          image_url = ${image_url},
          height = ${height},
          weight = ${weight}
      WHERE id = ${id}
    `;
  } catch (error) {
    return { message: 'Database Error: Failed to Update user' };
  }

  revalidatePath('/dashboard/fighters');
  redirect('/dashboard/fighters');
}

export async function deleteFighter(id: string) {
  await sql`DELETE FROM users WHERE id = ${id}`;
  revalidatePath('/dashboard/fighters');
}

const FightFormSchema = z.object({
  location: z.string().min(1),
  date: z.string().date(),
  fighters: z
    .array(
      z.object({
        fighter_id: z.string().uuid(),
        result: z.enum(['win', 'loss', 'draw']),
      })
    )
    .min(2, 'At least two fighters required'),
});

export type FightState = {
  errors?: {
    location?: string[];
    date?: string[];
    fighters?: string[];
  };
  message?: string | null;
};

export async function createFight(
  prevState: FightState,
  formData: FormData
) {
  const location = formData.get('location');
  const date = formData.get('date');

  const fightersRaw = formData.get('fighters') as string;
  let fighters;
  try {
    fighters = JSON.parse(fightersRaw);
  } catch {
    return {
      message: 'Invalid fighters format',
    };
  }

  const validated = FightFormSchema.safeParse({
    location,
    date,
    fighters,
  });

  if (!validated.success) {
    return {
      errors: validated.error.flatten().fieldErrors,
      message: 'Validation failed.',
    };
  }

  const {
    location: validLocation,
    date: validDate,
    fighters: validFighters,
  } = validated.data;

  try {
    const result = await sql`
      INSERT INTO fights (location, date)
      VALUES (${validLocation}, ${validDate})
      RETURNING id;
    `;

    const fightId = result.rows[0].id;

    for (const fighter of validFighters) {
      await sql`
        INSERT INTO fighter_fights (fight_id, fighter_id, result)
        VALUES (${fightId}, ${fighter.fighter_id}, ${fighter.result});
      `;
    }
  } catch (error) {
    console.error(error);
    return {
      message: 'Database error: Failed to create fight.',
    };
  }

  revalidatePath('/dashboard/fights');
  redirect('/dashboard/fights');
}

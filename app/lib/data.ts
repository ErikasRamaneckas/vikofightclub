import { sql } from '@vercel/postgres';
import { User } from './definitions';

const ITEMS_PER_PAGE = 5;
export async function fetchFilteredFighters(
  query: string,
  currentPage: number,
  sort?: string
) {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  let orderByClause = 'height ASC';
  if (sort === 'height-asc') {
    orderByClause = 'height ASC';
  } else if (sort === 'height-desc') {
    orderByClause = 'height DESC';
  } else if (sort === 'weight-desc') {
    orderByClause = 'weight DESC';
  } else if (sort === 'weight-asc') {
    orderByClause = 'weight ASC';
  }

  try {
    const queryStr = `
      SELECT
        id,
        name,
        email,
        image_url,
        height,
        weight
      FROM users
      WHERE
        name ILIKE $1
      ORDER BY ${orderByClause}
      LIMIT $2 OFFSET $3
    `;
    const result = await sql.query(queryStr, [
      `%${query}%`,
      ITEMS_PER_PAGE,
      offset,
    ]);
    console.log('Query result rows:', result.rows); // Log results for debugging
    return result.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch fighters.');
  }
}

export async function fetchFightersPages(query: string) {
  try {
    const result = await sql`
    SELECT COUNT(*)
    FROM users
    WHERE
      name ILIKE ${`%${query}%`}
    `;
    const totalPages = Math.ceil(
      Number(result.rows[0].count) / ITEMS_PER_PAGE
    );
    return totalPages;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total number of fighters');
  }
}

export async function fetchFighterById(id: string) {
  try {
    const result = await sql`
    SELECT *
    FROM users
    WHERE
      id = ${id}
    `;
    return result.rows[0] as User;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch fighters.');
  }
}

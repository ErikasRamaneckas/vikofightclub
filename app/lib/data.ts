import { sql } from '@vercel/postgres';
import { User } from './definitions';

export async function fetchFighters() {
  try {
    const result = await sql`
      SELECT
        id,
        name,
        email,
        image_url,
        height,
        weight
      FROM users
    `;
    return result.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch fighters.');
  }
}

const ITEMS_PER_PAGE = 5;
export async function fetchFilteredFighters(
  query: string,
  currentPage: number,
  sort?: string,
  weightClass?: string
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
    let queryStr = `
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
    `;
    const queryParams = [`%${query}%`];

    if (weightClass) {
      if (weightClass === 'light') {
        queryStr += ` AND weight < 70`;
      } else if (weightClass === 'middle') {
        queryStr += ` AND weight BETWEEN 71 AND 85`;
      } else if (weightClass === 'heavy') {
        queryStr += ` AND weight > 85`;
      }
    }

    queryStr += `
      ORDER BY ${orderByClause}
      LIMIT $2 OFFSET $3
    `;
    const finalQueryParams = [...queryParams, ITEMS_PER_PAGE, offset];

    const result = await sql.query(queryStr, finalQueryParams);
    return result.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch fighters.');
  }
}

export async function fetchFightersPages(
  query: string,
  weightClass?: string
) {
  try {
    let queryStr = `
      SELECT COUNT(*)
      FROM users
      WHERE
        name ILIKE $1
    `;
    const queryParams = [`%${query}%`];

    if (weightClass) {
      if (weightClass === 'light') {
        queryStr += ` AND weight < 70`;
      } else if (weightClass === 'middle') {
        queryStr += ` AND weight BETWEEN 71 AND 85`;
      } else if (weightClass === 'heavy') {
        queryStr += ` AND weight > 85`;
      }
    }

    const result = await sql.query(queryStr, queryParams);
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

const FIGHTS_PER_PAGE = 2;

export async function fetchFights(
  currentPage: number,
  query: string = ''
) {
  const offset = (currentPage - 1) * FIGHTS_PER_PAGE;

  try {
    const result = await sql`
      WITH matching_fights AS (
        SELECT DISTINCT f.id
        FROM fights f
        JOIN fighter_fights ff ON f.id = ff.fight_id
        JOIN users u ON ff.fighter_id = u.id
        WHERE u.name ILIKE ${'%' + query + '%'}
      ),
      paged_fights AS (
        SELECT f.id, f.location, f.date
        FROM fights f
        WHERE f.id IN (SELECT id FROM matching_fights)
        ORDER BY f.date DESC
        LIMIT ${FIGHTS_PER_PAGE}
        OFFSET ${offset}
      )
      SELECT
        f.id AS fight_id,
        f.location,
        f.date,
        u.id AS fighter_id,
        u.name AS fighter_name,
        u.image_url,
        ff.result
      FROM paged_fights f
      JOIN fighter_fights ff ON f.id = ff.fight_id
      JOIN users u ON ff.fighter_id = u.id
      ORDER BY f.date DESC;
    `;

    const groupedFights: Record<string, any> = {};

    result.rows.forEach((row) => {
      const {
        fight_id,
        location,
        date,
        fighter_id,
        fighter_name,
        image_url,
        result,
      } = row;

      if (!groupedFights[fight_id]) {
        groupedFights[fight_id] = {
          id: fight_id,
          location,
          date,
          fighters: [],
        };
      }

      groupedFights[fight_id].fighters.push({
        id: fighter_id,
        name: fighter_name,
        image_url,
        result,
      });
    });

    return Object.values(groupedFights);
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch fights.');
  }
}

export async function fetchFightsPages(query: string = '') {
  try {
    const result = await sql`
      SELECT COUNT(DISTINCT f.id) AS count
      FROM fights f
      JOIN fighter_fights ff ON f.id = ff.fight_id
      JOIN users u ON ff.fighter_id = u.id
      WHERE u.name ILIKE ${'%' + query + '%'};
    `;

    const totalPages = Math.ceil(
      Number(result.rows[0].count) / FIGHTS_PER_PAGE
    );

    return totalPages;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total number of fights');
  }
}

export async function fetchFightById(id: string) {
  const fightResult = await sql`
    SELECT * FROM fights WHERE id = ${id}
  `;

  const fightersResult = await sql`
    SELECT ff.fighter_id as id, ff.result
    FROM fighter_fights ff
    WHERE ff.fight_id = ${id}
  `;

  return {
    ...fightResult.rows[0],
    fighters: fightersResult.rows,
  };
}

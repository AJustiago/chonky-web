import { sql } from '@vercel/postgres';

export const query = async (queryText: string, params?: any[]) => {
  try {
    return await sql.query(queryText, params);
  } catch (error) {
    console.error('Database Query Error:', error);
    throw error;
  }
};

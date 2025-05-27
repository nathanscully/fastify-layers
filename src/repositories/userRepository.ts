import type Redis from "ioredis";
import type { Pool, QueryResult } from "pg";

export function createUserRepository({ db }: { db: Pool; redis: Redis }) {
  return {
    async findById(id: string) {
      const res: QueryResult = await db.query("SELECT id, name, email FROM users WHERE id=$1", [id]);
      return res.rows[0] ?? null;
    },
  };
}

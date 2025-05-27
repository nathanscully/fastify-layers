import { Pool } from "pg";

export function createDbPool(connectionString: string): Pool {
  return new Pool({ connectionString });
}

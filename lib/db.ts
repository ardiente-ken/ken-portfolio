import fs from "fs";
import path from "path";
import type { Database } from "./types";

const DB_PATH = path.join(process.cwd(), "data", "db.json");

export function readDb(): Database {
  const raw = fs.readFileSync(DB_PATH, "utf-8");
  return JSON.parse(raw) as Database;
}

export function writeDb(db: Database) {
  fs.writeFileSync(DB_PATH, JSON.stringify(db, null, 2), "utf-8");
}

export function updateDb(mutator: (db: Database) => Database): Database {
  const db = readDb();
  const next = mutator(db);
  writeDb(next);
  return next;
}

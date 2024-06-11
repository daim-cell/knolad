
import sqlite3 from 'sqlite3';
import { open, Database } from 'sqlite';

async function openDB(): Promise<Database> {
  return open({
    filename: './ladder-of-knowledge.db',
    driver: sqlite3.Database
  });
}

export default openDB;
import pg from 'pg';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const { Client } = pg;

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
    console.error('Error: DATABASE_URL not found in .env file.');
    process.exit(1);
}

const client = new Client({
    connectionString,
    ssl: {
        rejectUnauthorized: false,
    },
});

async function setupDatabase() {
    try {
        await client.connect();
        console.log('Connected to database at:', client.host);

        const schemaPath = path.resolve(__dirname, '../supabase_schema.sql');
        const schemaSql = fs.readFileSync(schemaPath, 'utf8');

        console.log('Running SQL schema...');
        await client.query(schemaSql);

        console.log('✅ Schema applied successfully!');
    } catch (err) {
        console.error('❌ Error applying schema:', err);
        process.exit(1);
    } finally {
        await client.end();
    }
}

setupDatabase();

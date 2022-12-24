import pg from 'pg';

const credentials = {
    user: process.env.DB_USER || "postgres",
    host: process.env.HOST || "localhost",
    database: process.env.DB || "images",
    password: process.env.DB_PW || "9359",
    port: process.env.DB_PORT || 5432,
};

// Connect with a connection pool.

const { Pool, Client } = pg

export default async function db() {
    const client = new Client(credentials)
    return client
}
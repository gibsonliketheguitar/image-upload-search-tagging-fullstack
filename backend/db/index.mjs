import pg from 'pg';



// Connect with a connection pool.

const { Pool, Client } = pg

export default async function db() {
    const credentials = {
        user: process.env.DB_USER,
        host: process.env.DB_HOST,
        database: process.env.DB_NAME,
        password: process.env.DB_PW,
        port: process.env.DB_PORT
    };

    const client = new Client(credentials)
    return client
}
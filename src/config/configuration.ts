interface JWT {
    secret: string,
    expiresIn: string
}
interface Database {
    DB_HOST: string
    DB_USER: string
    DB_PASS: string
    DB_NAME: string
    DB_PORT: number
}
interface Redis {
    host: string,
    port: number,
    username: string,
    password: string,
}
interface Configuracion {
    NODE_ENV: string,
    PORT: number,
    jwt: JWT,
    database: Database,
    redis: Redis,
    DB_HOST: string
    DB_USER: string
    DB_PASS: string
    DB_NAME: string
    DB_PORT: number
}

export const configuration = (): Configuracion => ({
    NODE_ENV: process.env.NODE_ENV,
    PORT: parseInt(process.env.PORT, 10) || 3001,
    jwt: {
        secret: process.env.JWT_SECRET,
        expiresIn: process.env.JWT_EXPIRES_IN,
    },
    database: {
        DB_HOST: process.env.DB_HOST,
        DB_USER: process.env.DB_USER,
        DB_PASS: process.env.DB_PASS,
        DB_NAME: process.env.DB_NAME,
        DB_PORT: parseInt(process.env.DB_PORT)
    },
    DB_HOST: process.env.DB_HOST,
    DB_USER: process.env.DB_USER,
    DB_PASS: process.env.DB_PASS,
    DB_NAME: process.env.DB_NAME,
    DB_PORT: parseInt(process.env.DB_PORT),
    redis: {
        host: process.env.REDIS_HOST,
        port: parseInt(process.env.REDIS_PORT) || 6379,
        username: process.env.REDIS_USER,
        password: process.env.REDIS_PASS,
    }
});



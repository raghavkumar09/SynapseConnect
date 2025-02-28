import dotenv from "dotenv";
dotenv.config();

const config = {
    db: {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
    },
    token: {
        secret: process.env.JWT_SECRET,
        tokenDuration: process.env.TOKEN_DURATION
    },
    node_env : {
        env: process.env.NODE_ENV
    },
    redis: {
        host: process.env.REDIS_HOST,
        port: process.env.REDIS_PORT,
    },
    port: process.env.PORT,
    
    googleApiKey: process.env.GOOGLE_API_KEY,
};

export default config;
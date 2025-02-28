import { Sequelize } from "sequelize";
import config from "../config/config.js";

// 🔹 Create Sequelize instance
const sequelize = new Sequelize({
    dialect: "postgres",
    host: config.db.host,
    port: config.db.port,
    username: config.db.user,
    password: config.db.password,
    database: config.db.database,
    logging: config.node_env.env === "development" ? console.log : false, // ✅ Log queries only in dev mode

    pool: {
        max: 10,  // ✅ Increased max connections for better performance
        min: 1,   // ✅ Ensure at least 1 connection is available
        acquire: 30000, // Max wait time for a connection (ms)
        idle: 10000 // Connection timeout (ms)
    },

    define: {
        timestamps: true // ✅ Ensures all models have `createdAt` & `updatedAt`
    },

    dialectOptions: config.node_env.env === "production" ? {
        ssl: {
            require: true,
            rejectUnauthorized: false, // ✅ Fix for some cloud providers (e.g., Render, Heroku)
        }
    } : {}
});

// 🔹 Retry mechanism for database connection
const connectDB = async (retries = 5, delay = 5000) => {
    for (let i = 0; i < retries; i++) {
        try {
            await sequelize.authenticate();
            console.log("✅ Database connected successfully.");
            
            if (config.node_env.env !== "production") {
                await sequelize.sync({ alter: true }); // ✅ Update schema in dev mode
                console.log("✅ Database schema synced.");
            } else {
                console.log("⚠️ Production mode: Use migrations instead of sync!");
            }
            return;
        } catch (error) {
            console.error(`❌ Database connection failed (attempt ${i + 1}/${retries}):`, error.message);
            if (i < retries - 1) {
                console.log(`⏳ Retrying in ${delay / 1000} seconds...`);
                await new Promise((res) => setTimeout(res, delay));
            } else {
                console.error("❌ Maximum retry attempts reached. Exiting...");
                process.exit(1); // Exit process if connection fails after all retries
            }
        }
    }
};

// 🔹 Connect to the database
connectDB();

export default sequelize;

import * as process from "process"

export const ConfigDatabase = () => ({
    dbHost: process.env.DB_HOST,
    dbPort: process.env.DB_PORT,
    dbDatabase: process.env.DB_DATABASE,
    dbUsername: process.env.DB_USERNAME,
    dbPassword: process.env.DB_PASSWORD
})

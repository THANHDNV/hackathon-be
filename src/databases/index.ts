import { ConnectOptions } from 'mongoose'

interface DBConnection {
  url: string
  options?: ConnectOptions
}

const url = `mongodb://${process.env.DB_HOST}:${process.env.DB_PORT || 27017}/?authSource=${process.env.DB_ATHDB || 'admin'}`

export const dbConnection: DBConnection = {
  url,
  options: {
    user: process.env.DB_USER,
    pass: process.env.DB_PASSWORD,
    dbName: process.env.DB_NAME || 'admin',
  }
}
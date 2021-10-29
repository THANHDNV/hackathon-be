import { ConnectOptions } from 'mongoose'

interface DBConnection {
  url: string
  options?: ConnectOptions
}

const url = process.env.DB_URL ? process.env.DB_URL : `mongodb://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT || 27017}/${process.env.DB_NAME || 'admin'}?authSource=admin`

export const dbConnection: DBConnection = {
  url,
  options: {}
}
import dotenv from 'dotenv'
import path from 'path'

dotenv.config({ path: path.join(process.cwd(), '.env') })

export default {
  env: process.env.NODE_ENV,
  port: process.env.PORT,
  secret_key: process.env.SECRET_KEY,
  backend_2_url: process.env.BACKEND2_URL,
  db: {
    uri: process.env.DB_URI,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    pass: process.env.DB_PASS,
    name: process.env.DB_NAME,
    authSource: process.env.DB_AUTH_SOURCE,
  },
  bcrypt_salt_round: 12
}

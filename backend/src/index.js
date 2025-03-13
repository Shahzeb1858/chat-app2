import express from 'express'
import authRoutes from './routes/auth.route.js'
import dotenv from 'dotenv'
import { dbConnection } from './lib/db.js'
import cookie_parser from 'cookie-parser'

const app = express()

dotenv.config()

const PORT = process.env.PORT

app.use(express.json())
app.use(cookie_parser())

app.use("/api/auth", authRoutes)

app.listen(PORT,()=>{
    console.log('Server is running on port number PORT : ', PORT);  
    dbConnection()
})
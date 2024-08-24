import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import dashboardRoutes from "./routes/dashboard/dashboardRoutes"

dotenv.config()
const app = express()
app.use(cors())

app.use('/dashboard', dashboardRoutes )
app.listen(process.env.PORT,()=>{
    console.log("Backend server listening")
})
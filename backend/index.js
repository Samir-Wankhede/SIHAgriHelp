import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import dashboardRoutes from "./routes/dashboardRoutes.js"
import yieldRoutes from "./routes/yieldRoutes.js"

dotenv.config()
const app = express()
app.use(cors())
app.use(express.json())

app.use('/dashboard', dashboardRoutes )

app.use('/api', yieldRoutes);

app.listen(process.env.PORT,()=>{
    console.log("Backend server listening")
})
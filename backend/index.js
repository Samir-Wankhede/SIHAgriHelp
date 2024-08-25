import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import dashboardRoutes from "./routes/dashboardRoutes.js"
import leafRoute from "./routes/route.js"

dotenv.config()
const app = express()
app.use(cors())
app.use(express.json({limit: '50mb'}));

app.use('/dashboard', dashboardRoutes )
app.use("/api/",leafRoute);
app.listen(process.env.PORT,()=>{
    console.log("Backend server listening")
})

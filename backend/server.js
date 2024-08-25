import express from "express";
import cors from "cors"
import leafRoute from "./routes/route.js"

const app = express();
const PORT = 4000;
const corsOptions = {
    origin: true //included origin as true
};


app.use(cors());
app.use(express.json({limit: '50mb'}));
app.use((req,res,next)=>{
    console.log(req.path, req.method);
    next();
});


app.listen(PORT,()=>{
    console.log(`listening on port ${PORT}`);
})

app.use("/api/",leafRoute);
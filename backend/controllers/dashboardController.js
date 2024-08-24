


export const today_details=async(req,res)=>{
    console.log(req.body)
    const {lat,long}=req.body
    try{
        const r = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${process.env.WEATHER_API_KEY}`)
        const result = await r.json()
        console.log(result)
        return res.status(200).json(result)
    }
    catch(e){
        console.log(e)
        return res.status(400).json(e)
    }

}
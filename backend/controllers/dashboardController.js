import { GoogleGenerativeAI } from "@google/generative-ai";




const get_suggestions = async(weatherData)=>{
    const genAI = new GoogleGenerativeAI(process.env.GENAI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });  
    const prompt = `
    Given the following weather data and season information:
    - Temperature: ${weatherData.main.temp}
    - Weather: ${weatherData.weather[0].description}
    - Humidity: ${weatherData.main.humidity}
    - Wind Speed: ${weatherData.wind.speed}
    - Rain in 1h : ${weatherData.rain?weatherData.rain['1h'] : "no available data"}
    - Country : ${weatherData.sys.country}
   
    Provide general agricultural suggestions and warnings for optimal crop management. (in 150 words, give it in points)
    `;

    const result = await model.generateContent(prompt);
    return result.response.text()
}


export const today_details=async(req,res)=>{
    const {lat,long}=req.body
    try{
        const r = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${process.env.WEATHER_API_KEY}`)
        const weatherData = await r.json()
        const result = await get_suggestions(weatherData)
        return res.status(200).json(result)
    }
    catch(e){
        return res.status(400).json(e)
    }
}
// controllers/yieldController.js
import { states, crops, seasons } from "../inputMap.js";

export const submitCrop = (req, res) => {
    if (req.method === 'POST') {
      const {
        crop,
        cropYear,
        season,
        state,
        area,
        production,
        annualRainfall,
        fertilizer,
        pesticide,
      } = req.body;
      console.log(req.body)
      
      const parsedData = {
        crop: crops[crop],
        cropYear: parseInt(cropYear, 10),
        season: seasons[season],
        state: states[state],
        area: parseFloat(area),
        production: parseFloat(production),
        annualRainfall: parseFloat(annualRainfall),
        fertilizer: parseFloat(fertilizer),
        pesticide: parseFloat(pesticide),
      };
  
      console.log('Parsed Data:', parsedData);
  
      
      res.status(200).json({ message: 'Data received and parsed successfully', data: parsedData });
    } else {
      res.status(405).json({ message: 'Method not allowed' });
    }
  };
  


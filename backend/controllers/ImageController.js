import axios from "axios";

const getLeafImagePrediction = async(req,res) => {
    const {plant,image} = (req.body);
    const result = await axios({
        method:"POST",
        url:"http://127.0.0.1:5000/predict",
        data:{
            image_base64:image,
        }
    });
    res.status(200).json(result);
}

export {
    getLeafImagePrediction,
}
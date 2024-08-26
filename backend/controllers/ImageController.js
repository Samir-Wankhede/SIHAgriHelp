import axios from "axios";

const getLeafImagePrediction = async(req,res) => {
    const {plant,image} = req.body;
    console.log(image)
    try{
        const result = await axios({
            method:"POST",
            url:`${process.env.ML_SERVER}/predict-disease`,
            data:{
                base64_image:image,
            },
            headers:{
                "Content-Type": "application/json"
            }
        });
        console.log(result)
        res.status(200).json({result: result.data.class});
    }catch(e){
        console.log(e)
    }
    
   
}

export {
    getLeafImagePrediction,
}
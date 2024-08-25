"use client"
import React,{useState,useRef} from "react"
import Logo from "../public/plant.png"
import Webcam from "react-webcam";


const PhotoUploader = () => {
    const cameraRef = useRef(null);
    const [filename, setFilename] = useState("")
    // const [picture, setPicture] = useState()
    const [Img,setImg] = useState("")
    const [camOn,setCamOn] = useState(false)
    const videoConstraints = {
        facingMode: "environment"
      };      
    const capture = React.useCallback(() => {
        const imageSrc = cameraRef.current.getScreenshot();
        setImg(imageSrc);
        setCamOn(false)
        console.log(imageSrc)
    }, [cameraRef, setImg, setCamOn]);
    const handleChange = (event) => {
        try{
            // if(event.target.files)
            //     setPicture(event.target.files[0])
            if(event.target.files)
                setFilename(event.target.files[0].name)
            if (event.target.files){
                var reader = new FileReader();
                reader.onloadend = () => {
                    setImg(reader.result)
                }
                if(event.target.files[0]){
                    reader.readAsDataURL(event.target.files[0]);
                }
            }
        } catch(err){
            console.log(err)
        }
       }
    return (
        <div className=" absolute h-[80vh] md:h-[60vh] w-[95vw] md:w-[80vw] bg-white rounded-lg grid grid-cols-1 md:grid-cols-2 grid-rows-2 md:grid-rows-1">
            <div className=" col-span-1 h-full w-full bg-transparent flex justify-center items-center ">
                <div className='absolute'>
                {       camOn?
                        <Webcam 
                            audio={false}
                            ref={cameraRef}
                            screenshotFormat="image/jpg"
                            videoConstraints={videoConstraints}
                        />
                        :
                        <></>
                }
                </div>
                <img src={(Img=="")?Logo.src:Img} alt='Plant Pic'  className={`h-auto w-auto p-4 max-w-full max-h-full ${!camOn?'visible':'invisible'}`}/>     
            </div>
            <div className="col-span-1 h-full w-full bg-green-400 flex flex-col justify-center items-center p-2 md:p-8 rounded-lg">
                <div className="relative">
                    <div className='flex flex-col gap-1'>
                        <label className="w-full bg-white rounded-lg text-green-400 px-8 py-4">{(filename=="")?"No Picture chosen yet":filename}</label>
                        <label htmlFor='picture' className='border border-white px-4 py-2 text-center md:w-1/2 w-full rounded-lg hover:bg-white hover:text-green-400'>
                            Upload Picture
                        </label>  
                    </div>
                    <input
                      onChange={handleChange}
                      name='picture'
                      type="file"
                      placeholder="Choose Profile Picture"
                      id='picture'
                      className=" opacity-0"
                    />
                </div>
                <div className=" text-white text-2xl font-thin">
                    OR
                </div>
                <div className="relative">
                    <button onClick={!camOn?()=>setCamOn(true):capture} className="w-full bg-white rounded-lg text-green-400 px-8 py-4 my-5"> {!camOn?'Capture Image':'Click'} </button>
                </div>
            </div>
        </div>
    );
}

export default PhotoUploader;
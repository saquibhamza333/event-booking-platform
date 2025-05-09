// Require the cloudinary library
import {v2 as cloudinary } from "cloudinary"
import fs from "fs"

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET_KEY,
});


const uploadOnCloudinary = async(localFilePath)=>{
    try{
        if(!localFilePath) return null;
        console.log(` localfilepath ${localFilePath}`)

        const response = await cloudinary.uploader.upload(localFilePath,{
            resource_type:"auto",
        },
       
    )
  

    console.log("File has been successfully uploaded",response.url);
    return response;

    }catch(err){
console.log("error uploading file",err);
        fs.unlinkSync(localFilePath);
        return null;

    }


}



export default uploadOnCloudinary
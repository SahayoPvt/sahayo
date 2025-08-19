import { v2 as cloudinary } from 'cloudinary';
import fs from "fs";

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY ,
  api_secret: process.env.CLOUDINARY_API_SECRET ,
});

const uploadImageOnCloudnary=async(filePath,folderName)=>{
try {
  const result=await cloudinary.uploader.upload(filePath,{
    folder:folderName
  })
  
  //remove the file from server other wise server full of memory
   fs.unlinkSync(filePath)
  return {
    public_id:result.public_id,
    secure_url:result.secure_url
  }
  
} catch (error) {
  throw new Error(error)
}
}

const uploadMultipleImages = async (req, res, next) => {
  try {
    // req.files is an array of files
    const uploadResults = await Promise.all(
      req.files.map(file => uploadImageOnCloudnary(file.path, "your-folder"))
    );

    res.status(200).json({
      success: true,
      images: uploadResults // Array of { public_id, secure_url }
    });
  } catch (error) {
    next(error);
  }
};
export { uploadImageOnCloudnary ,uploadMultipleImages };

const cloudinary = require('cloudinary').v2;

const uploadToCloudinary =async (file,folder, folderPath)=>{
    if(!file) return null

    const imageBase64 = file.buffer.toString('base64');
    const imageDataUrl = `data:${file.mimetype};base64,${imageBase64}`;
    const result = await cloudinary.uploader.upload(imageDataUrl,{folder})
    return result
}

module.exports = {uploadToCloudinary}
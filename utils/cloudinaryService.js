const cloudinary = require("cloudinary").v2;

const uploadToCloudinary = async (file, folder) => {
  if (!file) return null;

  const imageBase64 = file.buffer.toString("base64");
  const imageDataUrl = `data:${file.mimetype};base64,${imageBase64}`;
  const result = await cloudinary.uploader.upload(imageDataUrl, { folder });
  return result;
};

const deleteToCloudinary = async (file, folder) => {
    try {
        const publicId = file.split("/").pop().split('.').shift()

        await cloudinary.uploader.destroy(`${folder}/${publicId}`);
    } catch (error) {
        console.log(error)
    }
};

module.exports = { uploadToCloudinary, deleteToCloudinary };

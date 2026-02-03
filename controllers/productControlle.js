const productSchema = require("../models/productSchema")
const { uploadToCloudinary } = require("../utils/cloudinaryService")

const createProduct = async(req,res)=>{
    try {
        const {title,description,category,price,discountPercentage,variants,tags,isActive} = req.body
        const thumbnail = req.files.thumbnail?.[0]
        const images = req.files.images

        if(!title) return res.status(400).send({message : 'Product Title is required.'})
        if(!description) return res.status(400).send({message : 'Product Description is required.'})
        if(!category) return res.status(400).send({message : 'Product Category is required.'})
        if(!price) return res.status(400).send({message : 'Product Price is required.'})
        if(!thumbnail || thumbnail.length < 1) return res.status(400).send({message : 'Product Thumbnail is Required'})
        if(images && images?.length > 4) return res.status(400).send({message : 'You can upload max 4 images'})
            
            const thumbnailUrl = await uploadToCloudinary(thumbnail,'thumbnail')
            const imagesUrl = []
            if(images){
                for (const img of images) {
                  const imgUrl =await uploadToCloudinary(img,'product')
                  imagesUrl.push(imgUrl.secure_url)
                }
            }
            
            // Send To DB
            const product = productSchema({
              title,
              description,
              category,
              price,
              discountPercentage,
              variants,
              tags,
              thumbnail : thumbnailUrl.secure_url,
              images : imagesUrl
            })
            product.save()

            res.status(200).send({message : 'Product create successfully'})

        


    } 
    catch (error) {
      console.log(error)    
    }
}


module.exports = {createProduct}
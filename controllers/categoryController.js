const categorySchema = require("../models/categorySchema")
const { uploadToCloudinary } = require("../utils/cloudinaryService")

const createCategory = async(req,res)=>{
    try {
        const{name,slug,description} = req.body
        const thumbnail = req.file
        if(!name) return res.status(400).send({message : 'Category name is required'})
        if(!slug) return res.status(400).send({message : 'Category slug is required'})
        if(!thumbnail) return res.status(400).send({message : 'Thumbnail is requred'})

        const existCateSlug = await categorySchema.findOne({slug})
        if(existCateSlug) return res.status(400).send({message : 'Category name is already exist'})

        const imgRes =await uploadToCloudinary(thumbnail,'categories')

        const category = categorySchema({
            name,
            slug,
            description,
            thumbnail :imgRes.secure_url
        })
        category.save()
        
       res.status(201).send({message : 'Successful'})
    } 
    catch (error) {
       console.log(error)    
    }
}

const getAllCategory = async(req,res)=>{
    try {
        const categories = await categorySchema.find({})

        res.status(200).send({message : 'Successfully get',categories})

    } 
    catch (error) {
       console.log(error)    
    }
}

module.exports = {createCategory,getAllCategory}
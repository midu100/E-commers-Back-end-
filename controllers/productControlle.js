const createProduct = async(req,res)=>{
    try {

        
        const {title,description,category,price,discountPercentage,variants,tags,isActive} = req.body

        if(!title) return res.status(400).send({message : 'Product Title is required.'})
        if(!description) return res.status(400).send({message : 'Product Description is required.'})
        if(!category) return res.status(400).send({message : 'Product Category is required.'})
        if(!price) return res.status(400).send({message : 'Product Price is required.'})

        console.log(req.files)
        console.log(req.file)

        


    } 
    catch (error) {
      console.log(error)    
    }
}


module.exports = {createProduct}
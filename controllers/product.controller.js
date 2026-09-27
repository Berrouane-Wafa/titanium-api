const { response } = require("express");

const productService = require("../services/product.service");

const asyncHandler = require('../middlewares/asyncHandler');

const getAllProducts = asyncHandler( async (req,res)=>{
        
    // throw new Error("Test Error");
    
        const  results = await productService.getAllProducts();

        return res.status(200).json({
            message : "Liste des produits",
            products : results})


})

const getProductById = asyncHandler(async (req,res) => {
    const id_prod=parseInt(req.params.id)
  
    const results = await productService.getProductById(id_prod);
    // . Vérifier si aucun produit n'a été trouvé

        if (results.length===0) {
                return res.status(404).json({
                message: "Aucun produit trouvé "
                
            });
        }

        //res^ponse
        return res.status(200).json({
        "message": "Produit demandé",
        "id" : id_prod,
        "produit" : results[0]})

   
})

const createProduct = asyncHandler(
    async (req, res) => {

    const name = req.body.name;
    const price = req.body.price;

        // . Insérer dans MySQL

            const result = await productService.createProduct(name.trim(),price);
            return res.status(201).json({
                "message": "Produit crée",
                "product": {
                    "id" :result.insertId,
                    "name" : name.trim(),
                    "price" : price
                }
            });


}
)


const updateProduct = asyncHandler(
    async (req,res)=>{

    // récupérer et vérifier l'id
    const prod_id = parseInt(req.params.id)


    // récupérer name et price
    const name = req.body.name
    const price = req.body.price

    // UPDATE MySQL

        const existingProduct = await productService.getProductById(prod_id)
        if (existingProduct.length === 0) {
            return res.status(404).json({
            message: "Produit " + prod_id + " n'existe pas"
            });
        }

        await productService.updateProduct(prod_id,name !== undefined ? name.trim():undefined,price,);

        ////Récupérer le produit modifié
            const results = await productService.getProductById(prod_id)

            return res.status(200).json({
                message: "Produit modifié avec succès",
                product: results[0]
            });

   


  
}
)

const deleteProduct = asyncHandler(async (req, res) => {

    // 1. récupérer l'id
    const id_prod=parseInt(req.params.id)

    // DELETE MySQL
            const result = await productService.deleteProduct(id_prod);
        
            if (result.affectedRows==0) {
                return res.status(404).json({
                    meessage : "Produit  "+id_prod+"n'existe pas !"
                })
            }
            return res.status(204).send();

  
    

})

module.exports ={getAllProducts,getProductById,createProduct,updateProduct,deleteProduct};


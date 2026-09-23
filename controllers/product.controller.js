const { response } = require("express");
const productService = require("../services/product.service");

const getAllProducts = async (req,res)=>{

    try {
        const  results = await productService.getAllProducts();
        return res.status(200).json({
            message : "Liste des produits",
            products : results})

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message : "Erreur lors de la récupération des produits",
         })
    }
}

const getProductById = async (req,res) => {
    const id_prod=parseInt(req.params.id)

    // verifier que l'id prod est un nombre
    if(isNaN(id_prod)){
        return res.status(400).json({
            "message" :"Le L'id "+req.params.id+" n'est pas valide "
        })
    }

    try {
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

    } catch (error) {
        console.log(error)

        return res.status(500).json({
                message: "Erreur lors de la récupération de produit"})
    }
}

const createProduct = async (req, res) => {

    const name = req.body.name;
    const price = req.body.price;

    //Vérifier que les champ sont disponibles
    if(name === undefined || price === undefined){
        return res.status(400).json({
            "message" : "Champs manquants"
        })
    }

    //Valider le nom 
    if(typeof(name) !== "string" || name.trim().length <3){
            return res.status(400).json({
                "message" : "Le nom doit etre une chaine ayant au moins 3 caractères  "
            })
        }

    //Valider le prix
        if (typeof(price) !== "number" || price <=0) {
            return res.status(400).json({
                "message" : " Le prix est invalide"
            })
        }
    


        // . Insérer dans MySQL
        
        try {
            const result = await productService.createProduct(name.trim(),price);
            return res.status(201).json({
                "message": "Produit crée",
                "product": {
                    "id" :result.insertId,
                    "name" : name.trim(),
                    "price" : price
                }
            });
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                message : "Ereur lors d'insertion produit"
            })
            
        }





}

const updateProduct =async (req,res)=>{

    // récupérer et vérifier l'id
    const prod_id = parseInt(req.params.id)

    //CHekch if the id is correct
    if (isNaN(prod_id)) {
        return res.status(400).json({
            "message" : "Id "+ req.params.id +" invalde"
        })
    }

    // récupérer name et price
    const name = req.body.name
    const price = req.body.price

    // vérifier qu'au moins un des deux est fourni
    if(name == undefined && price == undefined){
        return res.status(400).json({
            "message" : "Aucune donnée à modifier"
        })
    }

    // valider les champs fournis
    //valider le nom
    if (name !== undefined) {
        if(typeof(name) !== "string" || name.trim() === ""){
            return res.status(400).json({
                "message" : "Le nom est invalide "
            })
        }
        
    }
    
    //Valider le prix
    if (price !== undefined) {
        if (typeof(price) !== "number" || price <=0) {
            return res.status(400).json({
                "message" : " Le prix est invalide"
            })
        }
    }

    // UPDATE MySQL
    try {
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

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message : "Erreur lors de la modification du produit"
        })
    }


  
}

const deleteProduct =async (req, res) => {

    // 1. récupérer l'id
    const id_prod=parseInt(req.params.id)

    // 2. vérifier que l'id est valide
    if(isNaN(id_prod)){
        return res.status(400).json({
            "message" :"request mal formé",

        })
    }
    // DELETE MySQL
    try {
            const result = await productService.deleteProduct(id_prod);
        
            if (result.affectedRows==0) {
                return res.status(404).json({
                    meessage : "Produit  "+id_prod+"n'existe pas !"
                })
            }
            return res.status(204).send();
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message : "Erreur lors du supression du produit ! "
        })
        
    }
  
    

}

module.exports ={getAllProducts,getProductById,createProduct,updateProduct,deleteProduct};


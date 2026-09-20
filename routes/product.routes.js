const express = require("express");

//Mini-application spécialisée dans les routes des produits.
const router = express.Router();

const db = require("../config/database");

//GET
router.get('/',(req,res)=>{
        db.query(
        "SELECT * FROM products",
        (err, results) => {

            // gérer l'erreur
            if (err) {
                console.error(err)

                return res.status(500).json({
                    message: "Erreur lors de la récupération des produits"
                })
                
            }
            // retourner results
            res.json({
            "message": "Liste des produits",
            "Products" :results
        })
        }
    );

})


//GET id
router.get('/:id',(req,res)=>{
    const id_prod=parseInt(req.params.id)
    // const product = products.find(prod => prod.id === id_prod);

    // verifier que l'id prod est un nombre
    if(isNaN(id_prod)){
        return res.status(400).json({
            "message" :"Le L'id "+req.params.id+" n'est pas valide "
        })
    }

    // 2. Faire la requête SQL
    db.query(
        "SELECT * FROM products WHERE id = ?",
        [id_prod],  
        (err, results) => {

         // 3. Gérer l'erreur MySQL
        if (err) {
            console.error(err);

            return res.status(500).json({
                message: "Erreur lors de la récupération de produit"
            });
        }

            // 4. Vérifier si aucun produit n'a été trouvé
        if (results.length===0) {
                        return res.status(404).json({
                message: "Aucun produit trouvé "
                
            });
        }

            // 5. Retourner le produit
        
        res.json({
        "message": "Produit demandé",
        "id" : id_prod,
        "produit" : results[0]
        // "query" : req.query,

    })
        }
    );

})


//POST
router.post('/', (req, res) => {

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
    


        // 2. Insérer dans MySQL
    db.query(
        "INSERT INTO products (name, price) VALUES (?, ?)",
        [name, price],
        (err, result) => {

            // 3. Gérer l'erreur MySQL
        if (err) {
            console.error(err);

            return res.status(500).json({
                message: "Erreur lors de l'insertion du produit"
            });
        }
 

            // 4. Retourner le produit créé
        const product = {
            "id": result.insertId,
            "name": name,
            "price": price
        }  
        res.status(201).json({
            "message": "Produit crée",
            "product": product
        });
        }
    );


});

//PATCH
router.patch('/:id',(req,res)=>{
    let fields = [];
    let values = [];

    // récupérer et vérifier l'id
    const prod_id = parseInt(req.params.id)

    //CHekch if the id is correct
    if (isNaN(prod_id)) {
        return res.status(400).json({
            "message" : "Id req.params.id invalde"
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
    if (name!==undefined) {
        fields.push("name = ?");
        values.push(name);
    }
    if (price!=undefined) {
        fields.push("price = ?");
        values.push(price);
    }

    values.push(prod_id);
        db.query(
            `UPDATE products SET ${fields.join(", ")} WHERE id = ?`,
            values,
            (err, results) => {

                // gérer l'erreur
                if (err) {
                    console.error(err);

                    return res.status(500).json({
                        "message" : "Erreur lors du modification du produit"
                    })
                    
                }
                if (results.affectedRows === 0) {
                    return res.status(404).json({
                        message: "Produit " + prod_id + " n'existe pas"
                    });
                }
                // retourner results

                   res.status(200).json({
                    "message" : "Produit modifié avec succés",
                    "product" : {
                        "id" :prod_id,
                        "name" : name,
                        "price" : price
                    }
                })
            }
        );
  

})

//DELETE
router.delete('/:id', (req, res) => {

    // 1. récupérer l'id
    const id_prod=parseInt(req.params.id)

    // 2. vérifier que l'id est valide
    if(isNaN(id_prod)){
        return res.status(400).json({
            "message" :"request mal formé",

        })
    }
    // DELETE MySQL
    db.query(
        "DELETE FROM products WHERE id = ?",
        [id_prod],
        (err, results) => {

            // gérer l'erreur
            if (err) {
                console.error(err);

                return res.status(500).json({
                    "message" : "Une erreur lors du suppression du produit"
                })
            }

            // vérifier si le produit existe
            if (results.affectedRows===0) {
                return res.status(404).json({
                    "message" : "produit n'existe pas"
                })
            }

            // retourner 204
            res.status(204).send()
        }
    );
  




    

});

module.exports = router;

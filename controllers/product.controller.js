const db = require("../config/database")

const getAllProducts =(req,res)=>{
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

}

const getProductById = (req,res)=>{
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

}

const createProduct =(req, res) => {

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


}

module.exports ={getAllProducts,getProductById,createProduct};
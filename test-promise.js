// const promise =  new Promise((resolve, reject) => {
//     console.log("Début ...");
//     reject("Opération non réussit")
    
// });

// promise.then((result) => {
//     console.log(result);
    
// }).catch(function(error){
//     console.log(error);
    
// });

// // const getAllProducts = (callback) => {

// //     db.query(
// //         "SELECT * FROM products",
// //         (err, results) => {

// //             if (err) {
// //                 return callback(err, null);
// //             }

// //             return callback(null, results);
// //         }
// //     );
// // };

// //GetAllProducts Service with promise

// const db = require("../config/database");
// const getAllProducts = () =>  new Promise((resolve, reject) => {
    
//     db.query(
//         "SELECT * FROM products",
//         (err, results) => {

//             if (err) {
//                reject(err)
//                return;
//             }

//             resolve(results)
//         }
//     );

// });

// //GetAllProducts Controller with promise 
// // const getAllProductsC =(req,res)=>{

// //     productService.getAllProducts().then((result) => {
// //         return res.status(200).json({
// //             message : "Liste des produits",
// //             products : result})
// //     }).catch((error)=>{
// //         console.log(error);
// //         return res.status(500).json({
// //             message : "Erreur lors de la récupération des produits",
// //          })
// //     });



// // }

// //GetAllProducts Controller with async await
// const getAllProductsC = async (req,res)=>{

//     try {
//         const  results = await productService.getAllProducts();
//         return res.status(200).json({
//             message : "Liste des produits",
//             products : result})

//     } catch (error) {
//         console.log(error);
//         return res.status(500).json({
//             message : "Erreur lors de la récupération des produits",
//          })
//     }
// }

// ////////////////--------------GetProductById--------------///////////////////
// // const getProductById = (id, callback) => {

// //     db.query(
// //         "SELECT * FROM products WHERE id = ?",
// //         [id],
// //         (err, results) => {

// //             if (err) {
// //                 return callback(err, null);
// //             }

// //             return callback(null, results);
// //         }
// //     );
// // };

// const getProductById =  new Promise((id,resolve, reject) => {
//         db.query(
//         "SELECT * FROM products WHERE id = ?",
//         [id],
//         (err, results) => {

//             if (err) {
//                 reject(err)
//                 return;
//             }

//             resolve(results)
//         }
//     );
// });


// // const getProductById = (req,res)=>{
// //     const id_prod=parseInt(req.params.id)

// //     // verifier que l'id prod est un nombre
// //     if(isNaN(id_prod)){
// //         return res.status(400).json({
// //             "message" :"Le L'id "+req.params.id+" n'est pas valide "
// //         })
// //     }

// //     // . Faire la requête SQL
// //     productService.getProductById(id_prod,(err,results)=>{
// //         if (err) {
// //                 console.log(err)

// //                 return res.status(500).json({
// //                 message: "Erreur lors de la récupération de produit"
// //             });
// //         }
// //     // . Vérifier si aucun produit n'a été trouvé
// //         if (results.length===0) {
// //                 return res.status(404).json({
// //                 message: "Aucun produit trouvé "
                
// //             });
// //         }

// //         //res^ponse
// //         return res.status(200).json({
// //         "message": "Produit demandé",
// //         "id" : id_prod,
// //         "produit" : results[0]
        
// //     })
// //     })

// // }



// /////////-------CreateProduct()----------/////////
//         // productService.createProduct(name.trim(),price,(err,result)=>{
//         //     if (err) {
//         //         console.error(err);
//         //         return res.status(500).json({
//         //             message : "Ereur lors d'insertion produit"
//         //         })
//         //     }
//         // // . Retourner le produit créé
//         // const product = {
//         //     "id": result.insertId,
//         //     "name": name.trim(),
//         //     "price": price
//         // } 
//         // return res.status(201).json({
//         //     "message": "Produit crée",
//         //     "product": product
//         // });
//         // })

// ///////////UpdateProduct()/////////////

//     productService.updateProduct(prod_id,name !== undefined ? name.trim():undefined,price,(err,results)=>{
//         if (err) {
//             console.log(err)
//             return res.status(500).json({
//                 "message" : "Erreur lors du modification du produit"
//             })
//         }
//         console.log('affected rows'+results.affectedRows+"\n")
//         if (results.affectedRows === 0) {
//             return res.status(404).json({
//                 message: "Produit " + prod_id + " n'existe pas"
//             });
//         }

//         //Récupérer le produit modifié
//         productService.getProductById(prod_id,(err,results)=>{
//             if (err) {
//                 console.error(err);

//                 return res.status(500).json({
//                     message: "Produit modifié mais erreur lors de sa récupération"
//                  });               
                
//             }

//             return res.status(200).json({
//                 message: "Produit modifié avec succès",
//                 product: results[0]
//             });
//         })

//     })
        
    
// async function test() {
//     return "Bonjour";
// }

// result = test();
// console.log(result);

// async function main() {
//     res = await test()
//     console.log(res);
// }
// main()

// async function test() {
//     return Promise.resolve(10);
// }

// async function main() {
//     const result = await test();
//     console.log(result);
    
// }
// main()

async function test() {
    throw new Error("Problème !");
}

async function main() {
    try {
        const result = await test();
        console.log(result);
    } catch (error) {
        console.log("Erreur capturée");
    }
}

main();
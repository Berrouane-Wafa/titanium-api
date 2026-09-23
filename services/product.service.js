const db = require("../config/database");

const getAllProducts = () =>  new Promise((resolve, reject) => {
    
    db.query(
        "SELECT * FROM products",
        (err, results) => {

            if (err) {
               reject(err)
               return;
            }

            resolve(results)
        }
    );

});


const getProductById = (id) => new Promise((resolve, reject) => {
        db.query(
        "SELECT * FROM products WHERE id = ?",
        [id],
        (err, results) => {

            if (err) {
                reject(err)
                return;
            }

            resolve(results)
        }
    );
});

const createProduct = (name, price) => new Promise((resolve, reject) => {
    db.query(
        "INSERT INTO products (name, price) VALUES (?, ?)",
        [name, price],
        (err, result) => {

            if (err) {
                reject(err)
                return;
            }

            resolve(result)
        }
    );
});

const updateProduct = (id, name, price) =>  new Promise((resolve, reject) => {
    let fields = [];
    let values = [];

    if (name!==undefined) {
        fields.push("name = ?");
        values.push(name);
    }
    if (price!=undefined) {
        fields.push("price = ?");
        values.push(price);
    }
    values.push(id);

    db.query(
        `UPDATE products SET ${fields.join(", ")} WHERE id = ?`,
        values,
            (err, results) => {
                    // gérer l'erreur
                    if (err) {
                        console.log(err);
                        reject(err)
                        return;
                    }
                    resolve(results)
                }
            );
});


const deleteProduct =(id) => new Promise((resolve, reject) => {
    db.query(
        'DELETE FROM products WHERE id = ?',
        [id], 
        (err,result)=>{
            if (err) {
              reject(err)
              return;  
            }
            resolve(result)
        }
    )
});

module.exports = {
    getAllProducts, getProductById, createProduct, updateProduct,deleteProduct
};


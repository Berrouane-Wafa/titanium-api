const dbPromise =  require("../config/database");

const getAllProducts = async () => {
    const db = await dbPromise;
    
    const [results] = await db.query(
        "SELECT * FROM products"
    );
    return results;
};


const getProductById =  async (id) => {
    const db = await dbPromise;
    const [results] = await db .query(
        "SELECT * FROM products WHERE id = ?",
        [id]
    )

    return results;
    
}


const createProduct = async (name,price) => {
    db = await dbPromise;
    const result = await db.query(
            "INSERT INTO products (name,price) VALUES (? , ?)",
            [name,price]
    )
    return result;
        

    
}

const updateProduct = async (id,name,price) => {
    const fields = [];
    const values = [];

    if (name!==undefined) {
        fields.push("name = ?");
        values.push(name)
    }
    if (price!==undefined) {
        fields.push("price = ?");
        values.push(price)
    }
    values.push(id)

    const db=await dbPromise;

    [result] = await db.query(
         `UPDATE products SET ${fields.join(", ")} WHERE id = ?`,
         values
    )
    return result;

}

const deleteProduct =async (id) => {
    const db = await dbPromise;

    const [result] = await db.query(
        "DELETE FROM products WHERE id = ?",
        id
    )
    return result;
}

module.exports = {
    getAllProducts, getProductById, createProduct, updateProduct,deleteProduct
};


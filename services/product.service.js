const dbPromise =  require("../config/database");

const getAllProducts = async () => {
    const db = await dbPromise;
    
    const [results] = await db.query(
    `SELECT 
        p.id,
        p.name,
        p.price,
        pi.image_path
    FROM products as p 
    LEFT JOIN product_images as pi
        ON p.id =pi.product_id
    ORDER BY p.id`
    );
    return results;
};


const getProductById =  async (id) => {
    const db = await dbPromise;

    const [results] = await db .query(
        "SELECT * FROM products WHERE id = ?",
        [id]
    );

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

const getProductsByIds = async (ids) => {
    const db = await dbPromise;
    const [results] = await db .query(
        "SELECT * FROM products WHERE id in (?)",
        [ids]
    )

    return results;
}

const getProductImages = async (product_id) => {
    const db = await dbPromise;

    // Write your SQL query here
    const [results] = await db.query(
        `SELECT * FROM product_images WHERE product_id = ?`,
        [product_id]
    );
    return results;
};
module.exports = {
    getAllProducts, getProductById, createProduct, updateProduct,deleteProduct, getProductsByIds,getProductImages
};


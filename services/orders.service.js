const dbPromise =  require("../config/database");

const createOrder = async (db,userId,deliveryFee,total,address) => {

    const [result] = await db.query(
        'INSERT INTO orders (user_id,status,total,delivery_fee,address) VALUES (?,?,?,?,?)',
        [
            userId,
            "pending",
            total,
            deliveryFee,
            address
        ]
    );
    return result;

}

const createOrderItem = async (
    db,
    orderId,
    productId,
    quantity,
    unitPrice
) => {

    const [result] = await db.query(
        `INSERT INTO order_items
        (order_id, product_id, quantity, unit_price)
        VALUES (?, ?, ?, ?)`,
        [
            orderId,
            productId,
            quantity,
            unitPrice
        ]
    );

    return result;
};

const startTransaction = async () => {
    const db = await dbPromise;

console.log("Type de db :", typeof db);
console.log("db.query :", typeof db?.query);
console.log("db.commit :", typeof db?.commit);
    await db.beginTransaction();

    return db;
};

const getOrdersByUserId = async (userId) => {
    const db = await dbPromise;
    const [results] = await db.query(
        "SELECT * FROM orders WHERE user_id = ?",
        userId
    );

    return results;
}

const getOrderById = async (id,userId) => {
    const db = await dbPromise;

    const [result] = await db.query(
        "SELECT * FROM orders WHERE id = ? AND user_id = ?",
        [id,userId]
    );
    return result;
}

const getOrderItems = async (order_id) => {
    const db = await dbPromise;

    const [results] = await db.query(
        `SELECT
            oi.product_id,
            p.name,
            oi.quantity,
            oi.unit_price,
            oi.quantity * oi.unit_price AS subtotal
         FROM order_items AS oi
         INNER JOIN products AS p
            ON oi.product_id = p.id
         WHERE oi.order_id = ?`,
        [order_id]
    );
    return results;
}
module.exports = {createOrder,createOrderItem,startTransaction,getOrdersByUserId,  getOrderById, getOrderItems}
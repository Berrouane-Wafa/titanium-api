//PS Il faut donc que les variables du .env soient chargées avant que database.js soit importé.
//parcque database.js utilise ces variable d'environnement 

require("dotenv").config();

const express = require("express")

const app = express()


const productRoutes = require("./routes/product.routes");
const orderRoutes = require("./routes/orders.routes")
const authRoutes = require('./routes/auth.routes');

app.use(express.json())

app.use(express.static("public"));

app.use("/api/products", productRoutes);

app.use("/api/orders", orderRoutes)

app.use("/api/auth", authRoutes);

app.use((error, req, res, next) => {
    console.error(error);

    const statusCode=error.statusCode || 500;

    return res.status(statusCode).json({
        message: error.message
    });
});


 app.listen(3000)

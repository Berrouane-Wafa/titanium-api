//PS Il faut donc que les variables du .env soient chargées avant que database.js soit importé.
//parcque database.js utilise ces variable d'environnement 

require("dotenv").config();

const express = require("express")

const app = express()


const productRoutes = require("./routes/product.routes");

app.use(express.json())

app.use(express.static("public"));

app.use("/api/products", productRoutes);

app.use((error, req, res, next) => {
    console.error(error);

    return res.status(500).json({
        message: "Erreur interne du serveur"
    });
});


 app.listen(3000)

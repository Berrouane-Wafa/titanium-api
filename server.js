//PS Il faut donc que les variables du .env soient chargées avant que database.js soit importé.
//parcque database.js utilise ces variable d'environnement 

require("dotenv").config();

const express = require("express")

const app = express()


const productRoutes = require("./routes/product.routes");

app.use(express.json())

app.use(express.static("public"));

app.use("/api/products", productRoutes);

 app.listen(3000)

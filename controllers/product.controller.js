const productService = require("../services/product.service");

const asyncHandler = require("../middlewares/asyncHandler");

const AppError = require("../errors/AppError");

const getAllProducts = asyncHandler(async (req, res) => {
    const results = await productService.getAllProducts();

    const productsMap = new Map();

    for (const row of results) {
        // Does this product already exist in our Map?
        if (!productsMap.has(row.id)) {
            productsMap.set(row.id, {
                id: row.id,
                name: row.name,
                price: row.price,
                images: []
            });
        }

        // Add the image if one exists
        if (row.image_path !== null) {
            productsMap.get(row.id).images.push({
                image_path: row.image_path
            });
        }
    }

    const products = Array.from(productsMap.values());

    return res.status(200).json({
        message: "Liste des produits",
        products
    });
});

const getProductById = asyncHandler(async (req, res) => {
  const id_prod = parseInt(req.params.id);

  const results = await productService.getProductById(id_prod);

  // . Vérifier si aucun produit n'a été trouvé
  if (results.length === 0) {
    throw new AppError("Aucun produit trouvé ", 404);
  }
  //fetch its images
  const product = results[0];
  const images = await productService.getProductImages(product.id)

  //res^ponse
  return res.status(200).json({
    message: "Produit récupéré avec succès",
    product: {
        ...product,
        images:images
    }
  });
});

const createProduct = asyncHandler(async (req, res) => {
  const name = req.body.name;
  const price = Number(req.body.price);
  const files = req.files || [];
 
  // . Insérer dans MySQL

  const result = await productService.createProduct(name.trim(), price);
  for (const file of files) {
    await productService.createProductImage(result, file.filename);
  }

  const images = await productService.getProductImages(result);

  return res.status(201).json({
    message: "Produit crée",
    product: {
      id: result,
      name: name.trim(),
      price: price,
      images: images,
    },
  });
});

const updateProduct = asyncHandler(async (req, res) => {
  // récupérer et vérifier l'id
  const prod_id = parseInt(req.params.id);

  // récupérer name et price
  const name = req.body.name;
  const price =Number(req.body.price);

  // UPDATE MySQL

  const existingProduct = await productService.getProductById(prod_id);
  if (existingProduct.length === 0) {
    throw new AppError("Aucun produit trouvé", 404);
  }

  await productService.updateProduct(
    prod_id,
    name !== undefined ? name.trim() : undefined,
    price,
  );

  ////Récupérer le produit modifié
  const results = await productService.getProductById(prod_id);

  return res.status(200).json({
    message: "Produit modifié avec succès",
    product: results[0],
  });
});

const deleteProduct = asyncHandler(async (req, res) => {
  // 1. récupérer l'id
  const id_prod = parseInt(req.params.id);

  // DELETE MySQL
  const result = await productService.deleteProduct(id_prod);

  if (result.affectedRows == 0) {
    throw new AppError("Aucun produit trouvé ", 404);
  }
  return res.status(204).send();
});

const getProductImages = asyncHandler(async (req, res) => {
  const product_id = parseInt(req.params.id);

  const results = await productService.getProductImages(product_id);

  return res.status(200).json({
    message: "Les images",
    images: results,
  });
});
module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductImages,
};

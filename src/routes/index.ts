import {
  getProducts,
  addProducts,
  getById,
  updateProduct,
  deleteById,
} from "../controllers/products-controller";
import {
	createCart,
	deleteCart,
	getCartProducts,
	addProductToCart,
	deleteProductFromCart,
} from '../controllers/cart-controller';
import { Router } from "express";
import auth from "../middlewares/role";
const router = Router();

//Products
router.get("/products", getProducts);
router.get("/products/:id", getById);
router.post("/products", auth, addProducts);
router.put("/products/:id", auth, updateProduct);
router.delete("/products/:id", auth, deleteById);

// Cart
router.post('/cart', createCart)
router.delete('/cart/:id', deleteCart )
router.get('/cart/:id/products', getCartProducts)
router.post('/cart/:id/products', addProductToCart)
router.delete('/cart/:id/products/:id_prod', deleteProductFromCart)

export = router;

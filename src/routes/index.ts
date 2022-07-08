import * as express from "express";
import productsController from '../controllers/products-controller'
// import  {postCart, emptyCart, viewCart, addToCart, deleteProductCart} from '../controllers/cart-controller'
import { Router } from "express";
import auth from '../middlewares/role'
const router = Router()

//Products
router.get('/products', productsController.getProducts)
router.get('/products/:id', productsController.getById)
router.post('/products',auth, productsController.addProducts)
router.put('/products/:id',auth, productsController.updateProduct)
router.delete('/products/:id',auth, productsController.deleteById )

//Cart
// router.post('/cart', postCart) 
// router.delete('/cart/:id', emptyCart )
// router.get('/cart/:id/productos', viewCart)
// router.post('/cart/:id/productos', addToCart)
// router.delete('/cart/:id/productos/:id_prod', deleteProductCart)

export = router; 
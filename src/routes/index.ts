import * as express from "express";
import productsController from '../controllers/products-controller'
// import  {postCart, emptyCart, viewCart, addToCart, deleteProductCart} from '../controllers/cart-controller'
import {request, response, Router} from 'express'
let router = express.Router()

//Auth Admin

const auth = (request:any, response:any, next:any)=>{
    const admin = true
    if(admin) {return next()} 
    else {
        let mensajeError={
            error : "-1",
            descripcion: `ruta: ${request.url} método: ${request.method} no autorizado`
        }
        response.status(401).json(mensajeError)
    }
}

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
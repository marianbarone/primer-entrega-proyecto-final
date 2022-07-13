import { Request, response, Response } from 'express'
import { Cart } from '../interfaces/cart'
import { Product } from '../interfaces/product'

import { cartContainer } from '../containers/cart-container'
import dbController from './db-controller'

const saveCart = new cartContainer()

let carts: Cart[] = []
let products: Product[] = []


const readProds = () => {
    dbController.readFile().then(response => {
        products = response
    })
}

readProds()

const createCart = (req: Request, resp: Response) => {
	try {

        if (carts.length === 0) {
            const id = 1
            const newCart: Cart = {
                id: id,
                timestamp: new Date().toLocaleString("es-AR"),
                products: [],
            }
            carts.push(newCart)
            saveCart.addCart(carts)
		    resp.status(201).send(`Carrito creado con éxito, id:${newCart.id}`)

        } else {
            const newId = carts[carts.length - 1].id;
            const id = newId + 1;
            const newCart: Cart = {
                id: id,
                timestamp: new Date().toLocaleString("es-AR"),
                products: [],
            }
            carts.push(newCart)
            saveCart.addCart(carts)
		    resp.status(201).send(`Carrito creado con éxito, id:${newCart.id}`)
        }


	} catch (error) {
		console.log(`Lo sentimos hubo un error ${error}`)
	}
}

const deleteCart = (req: Request, resp: Response) => {
	try {
		const idCart = Number(req.params.id)
		const exists = carts.some(cart => cart.id === idCart)

		if (exists) {
			const newCarts = carts.filter(cart => cart.id !== idCart)
			carts = newCarts
			saveCart.addCart(newCarts)
			resp.status(200).send('Carrito eliminado')
		} else {
			resp.status(503).send('No se pudo encontrar el carrito')
		}
	} catch (error) {
		console.log(`Lo sentimos hubo un error ${error}`)
	}
}


const addProductToCart = (req: Request, resp: Response) => {
	try {
		const cartId = Number(req.params.id) 
		const productId = Number(req.body.id) 
		const productIndex = products.findIndex(p => p.id === productId)
		const productAdd: Product = products.find(p => p.id === productId)! 
		const cartIndex = carts.findIndex(cart => cart.id === cartId)

		if (products[productIndex]) {
			carts[cartIndex].products.push(productAdd)

			saveCart.addCart(carts)
			resp.status(201).send('Producto agregado al carrito con éxito')
		} else {
			resp.status(400).send('No se pudo encontrar el producto')
		}
	} catch (error) {
		console.log(`Lo sentimos hubo un error ${error}`)
	}
}

const getCartProducts = (req: Request, resp: Response) => {
	try {
		const cartId = Number(req.params.id)
		const exists = carts.some(c => c.id === cartId)

		if ( exists ) {
		
		const cartProducts = carts.filter(c => c.id === cartId)
		resp.status(200).send(cartProducts[0].products)

		} else {
			
		resp.status(400).send(`Lo siento no pudimos encontrar el carrito con el id: ${cartId}`)
		}		
		

	} catch (error) {
		console.log(`Lo sentimos hubo un error ${error}`)
	}
}


const deleteProductFromCart = (req: Request, resp: Response) => {
	try {
		const cartId = Number(req.params.id)
		const idProduct = Number(req.params.id_prod)
		const cartIndex = carts.findIndex(cart => cart.id === cartId)
		const productIndexCart = carts[cartIndex].products.findIndex(p => p.id === idProduct)

		const exists = carts.some(c => c.id === cartId)
		const productExists = products.some(p => p.id === idProduct)
		if ( exists && productExists) {
			
			const checkCartProduct = carts[cartIndex].products.some( p => p.id === idProduct)	
			
			if ( checkCartProduct ) {
				
				carts[cartIndex].products.splice(productIndexCart, 1)
				
				saveCart.addCart(carts)
				
				resp.status(200).send('Producto del carrito eliminado con éxito')
			} else {
				resp.status(400).send('Lo sentimos no pudimos encontrar el producto')
			}
		} else {
			resp.status(400).send('El ID del carrito o del Producto no existen')
		}
		
	} catch (error) {
		
		console.log(`Lo sentimos hubo un error ${error}`)
	}
}

export {
	createCart,
	deleteCart,
	getCartProducts,
	addProductToCart,
	deleteProductFromCart,
}

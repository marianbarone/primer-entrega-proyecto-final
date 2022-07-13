import fs from 'fs'
import { Cart } from '../interfaces/cart'

export class cartContainer {

	constructor() {}

	addCart(cart: Cart | Cart[]) {
		try {
			fs.writeFileSync('../primer-entrega-proyecto-final/src/db/carts.json', JSON.stringify(cart))
		} catch (error) {
			console.log(`No pudimos crear el carrito ${error}`)
		}
	}

}

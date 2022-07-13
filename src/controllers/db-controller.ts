import fs from 'fs'
import { Product } from '../interfaces/product'

class dbController {
    fileName: string
    constructor(fileName: string){
        this.fileName = fileName

        if (!fs.existsSync(`./${this.fileName}`)) {
            fs.promises
              .writeFile(`./${this.fileName}`, ``)
              .then(() => console.log(`${this.fileName} created`));
              console.log(this.fileName)
        }   
    }

    public readonly writeFile = async (data: Array<Product>) => {
        try {
            await fs.promises.writeFile(this.fileName, JSON.stringify(data, null, 2))
        } catch (err: any) {
            console.log('Method writeFile: ', err)
        }
    }

    async readFile ()  {
        try {
            const data: any = await fs.promises.readFile(this.fileName, 'utf8')
            let jsonData = JSON.parse(data)
            return jsonData
        } catch (err: any) {
            console.log(err)
            return []
        }
    }
        
    

    // public readonly readProducts = async () => {
	// 	try {
	// 		let data: any = await fs.promises.readFile(
	// 			'./src/data/products.json',
	// 			'utf-8'
	// 		)
	// 		data = JSON.parse(data)

	// 		return data
	// 	} catch (error) {
	// 		console.log(`Lo sentimos hubo un error ${error}`)
	// 	}
	// }

    // public readonly readCarts = async () => {
	// 	try {
	// 		let data: any = await fs.promises.readFile(
	// 			'./src/data/carts.json',
	// 			'utf-8'
	// 		)
	// 		data = JSON.parse(data)

	// 		return data
	// 	} catch (error) {
	// 		console.log(`Lo sentimos hubo un error ${error}`)
	// 	}
	// }
}


export default new dbController ('../primer-entrega-proyecto-final/src/db/products.json');
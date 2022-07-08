import fs from 'fs'
import { product } from '../interfaces/product'

class dbController {
    fileName: string
    constructor(fileName: string){
        this.fileName = fileName

        if (!fs.existsSync(`./${this.fileName}`)) {
            fs.promises
              .writeFile(`./${this.fileName}`, ``)
              .then(() => console.log(`${this.fileName} created`));
    }
}

    public readonly writeFile = async (data: Array<product>) => {
        try {
            await fs.promises.writeFile(this.fileName, JSON.stringify(data, null, 2))
        } catch (err: any) {
            console.log('Method writeFile: ', err)
        }
    }

    public readonly readFile = async () => {

        try {
            console.log('entre bb')

            const hola = await fs.promises.readFile(this.fileName, 'utf8')
            let jsonData = JSON.parse(hola)
            // return (await fs.promises.readFile(this.fileName, 'utf8'))
            //     ? JSON.parse(await fs.promises.readFile(this.fileName, 'utf8'))
            //     : ([])
            console.log('Hello', hola)
            console.log(jsonData)
            return jsonData
        } catch (err: any) {
            console.log(err)
            //Si el archivo NO existe, entonces lo crea.
            // if (err.errno === -2) {
            //     try {
            //         await fs.promises.writeFile(this.fileName, JSON.stringify([]))
            //         return [] as storedProduct[]
            //     } catch (err: any) {
            //         console.error('Could not create file in such directory. ', err)
            //     }
            // } else {
            //     console.log('Method readFile: ', err)

            // }
            // return [] as storedProduct[]
        }
    }
}

export default new dbController ('../primer-entrega-proyecto-final/src/db/products.txt');
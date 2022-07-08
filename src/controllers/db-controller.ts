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
              console.log(this.fileName)
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
            console.log('entre al try')

            const data: any = await fs.promises.readFile(this.fileName, 'utf8')
            let jsonData = JSON.parse(data)
            console.log('Hello', data)
            console.log(jsonData)
            return jsonData
        } catch (err: any) {
            console.log(err)
            // if (err.errno === -2) {
            //     try {
            //         await fs.promises.writeFile(this.fileName, JSON.stringify([]))
            //         return []
            //     } catch (err: any) {
            //         console.error('No se pudo crear el archivo. ', err)
            //     }
            // } else {
            //     console.log('Error en el metodo: ', err)

            // }
            // return []
        }
    }
}

export default new dbController ('../primer-entrega-proyecto-final/src/db/products.txt');
import fs from 'fs'
import dbController from './db-controller';

class productsController {
    constructor() {
    }

    //GetProducts

    public async getProducts() {
        try {
            const data = await dbController.readFile()
            console.log(data)
            return data
        }
        catch {
            console.log('No existen productos')
        }
    } 

    //add

    public async addProducts(req: any, res: any) {
        try{        
            
            let data = await dbController.readFile()
        
            if (data.length === 0) {
                const id = 1
                const {title, description, code, price, thumbnail, timestamp, stock} = req.body
                console.log(req.body)
                const product = data.push({ title, description, code, price, thumbnail, timestamp, stock, id })
                res.json(product)
            } else if (data.length > 0) {
                const newId = data[data.length - 1].id
                const id = newId + 1
                const { title, description, code, price, thumbnail, timestamp, stock } = req.body
                const product = data.push({ title, description, code, price, thumbnail, timestamp, stock, id })
                res.json(product)
            }

        } catch (err: any) {
            return 'No se pudo agregar el producto'
        }
        

    }

    //GetByID

    public async getById(req: any, res: any) {

        let data = await dbController.readFile()

        const id = Number(req.params.id);
        if (data.length > 0) {
            if (!isNaN(id)) {
                let product = data.find(prod => prod.id === id);
                if (product) {
                    res.status(200).json(product);
                } else {
                    res.status(404).json({ error: 'Producto no encontrado!' });
                }
            } else {
                res.status(400).json({ error: 'El ID debe ser un número!' });
            }

        } else {
            res.status(404).json({ error: 'No existen productos' });
        }
    };

    //Update con id

    public async updateProduct(req: any, res: any) {
        let data = await dbController.readFile()

        const id = Number(req.params.id);
        if (data.length > 0) {
            if (!isNaN(id)) {
                const product = data.find(prod => prod.id == id);
                const updatedProducts = data.filter(prod => prod.id !== id);
                if (product) {
                    const { title, description, code, price, thumbnail, timestamp, stock } = req.body;
                    let productToUpdate = {
                        id,
                        title,
                        description,
                        code,
                        price: Number(price),
                        thumbnail,
                        timestamp,
                        stock
                    };

                    data = [...updatedProducts, productToUpdate];
                    res.status(200).send('Producto actualizado!');
                } else {
                    res.status(404).json({ error: 'Producto no encontrado' });
                };
            } else {
                res.status(400).json({ error: 'El ID debe ser un número' });
            };
        } else {
            res.status(404).json({ error: 'No existen productos' });
        }
    }

    //Delete por id

    public async deleteById(req: any, res: any) {

        let data = await dbController.readFile()

        const id = Number(req.params.id);
        if (data.length > 0) {
            if (!isNaN(id)) {
                const updatedProducts = data.filter(product => product.id != req.params.id)
                data = updatedProducts
                res.status(200).send('Película eliminada!');
            } else {
                res.status(400).json({ error: 'El ID debe ser un número' });
            }
        } else {
            res.status(404).json({ error: 'No existen películas' });
        } 

    }
}

export default new productsController
import fs from 'fs'
import { readFileSync } from 'fs';
import path from 'path';

const file = fs.readFileSync(path.join(__dirname, './products.txt'), 'utf-8');
console.log(file)
//getProducts

export const getProducts = async () => {
    try {
        const data = await fs.promises.readFile(`${file}`, 'utf-8')
        console.log(data)
        return JSON.parse(data)
    }
    catch {
        console.log('No existen productos')
    }
}
//add

export const addProducts = async (req: any, res: any) => {
    
    const data = await fs.promises.readFile(`${file}`, 'utf-8')
    const jsonData = JSON.parse(data)

        if (jsonData.length === 0) {
            const id = 1
            const {title, description, code, price, thumbnail, timestamp, stock} = req.body
            console.log(req.body)
            const product = jsonData.push({ title, description, code, price, thumbnail, timestamp, stock, id })
            res.json(product)
        } else if (jsonData.length > 0) {
            const newId = jsonData[data.length - 1].id
            const id = newId + 1
            const { title, description, code, price, thumbnail, timestamp, stock } = req.body
            const product = jsonData.push({ title, description, code, price, thumbnail, timestamp, stock, id })
            res.json(product)
        }
}

//GetByID

export const getById = async (req: any, res: any) => {

    const data = await fs.promises.readFile(`${file}`, 'utf-8')
    const jsonData = JSON.parse(data)

    const id = Number(req.params.id);
    if (jsonData.length > 0) {
        if (!isNaN(id)) {
            let product = jsonData.find(prod => prod.id === id);
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

export const updateProduct = async (req: any, res: any) => {
    const data = await fs.promises.readFile(`${file}`, 'utf-8')
    let jsonData = JSON.parse(data)
    const id = Number(req.params.id);
    if (jsonData.length > 0) {
        if (!isNaN(id)) {
            const product = jsonData.find(data => data.id == id);
            const updatedProducts = jsonData.filter(data => data.id !== id);
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

                jsonData = [...updatedProducts, productToUpdate];
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

export const deleteById = async (req: any, res: any) => {

    const data = await fs.promises.readFile(`../../scr/db/products.txt`, 'utf-8')
    let jsonData = JSON.parse(data)


    const id = Number(req.params.id);
    if (jsonData.length > 0) {
        if (!isNaN(id)) {
            const updatedProducts = jsonData.filter(product => product.id != req.params.id)
            jsonData = updatedProducts
            res.status(200).send('Película eliminada!');
        } else {
            res.status(400).json({ error: 'El ID debe ser un número' });
        }
    } else {
        res.status(404).json({ error: 'No existen películas' });
    } 

}

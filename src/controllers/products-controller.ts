import fs from 'fs'
import { Request, Response } from 'express'
import dbController from './db-controller';


const getProducts = async (req: Request, res: Response) => {
  try {
    let productos = await dbController.readFile();
    res.json(productos);
  } catch (err: any) {
    console.log("No existen productos", err);
  }
};

//add

const addProducts = async (req: any, res: any) => {
  try {
    let data = await dbController.readFile();

    if (data.length === 0) {
      const id = 1;
      const { title, description, code, price, thumbnail, stock } = req.body;
      const timestamp = new Date().toLocaleString("es-AR");
      const product = { title, description, code, price, thumbnail, stock };
      data.push({ ...product, id, timestamp });
      await dbController.writeFile(data);
    } else if (data.length > 0) {
      const newId = data[data.length - 1].id;
      const id = newId + 1;
      const { title, description, code, price, thumbnail, stock } = req.body;
      const timestamp = new Date().toLocaleString("es-AR");
      const product = { title, description, code, price, thumbnail, stock };
      data.push({ ...product, id, timestamp });

      await dbController.writeFile(data);
    }
  } catch (err: any) {
    return "No se pudo agregar el producto";
  }
};

//GetByID

const getById = async (req: any, res: any) => {
  let data = await dbController.readFile();

  const id = Number(req.params.id);
  if (data.length > 0) {
    if (!isNaN(id)) {
      let product = data.find((prod) => prod.id === id);
      if (product) {
        res.status(200).json(product);
      } else {
        res.status(404).json({ error: "Producto no encontrado!" });
      }
    } else {
      res.status(400).json({ error: "El ID debe ser un número!" });
    }
  } else {
    res.status(404).json({ error: "No existen productos" });
  }
};

//Update con id

const updateProduct = async (req: any, res: any) => {
  let data = await dbController.readFile();

  const id = Number(req.params.id);
  if (data.length > 0) {
    if (!isNaN(id)) {
      const product = data.find((prod) => prod.id == id);
      const updatedProducts = data.filter((prod) => prod.id !== id);
      const timestamp = new Date().toLocaleString("es-AR");

      if (product) {
        const { title, description, code, price, thumbnail, stock } = req.body;
        let productToUpdate = {
          id,
          title,
          description,
          code,
          price: Number(price),
          thumbnail,
          timestamp,
          stock,
        };

        data = [...updatedProducts, productToUpdate];
        res.status(200).send("Producto actualizado!");
      } else {
        res.status(404).json({ error: "Producto no encontrado" });
      }
    } else {
      res.status(400).json({ error: "El ID debe ser un número" });
    }
  } else {
    res.status(404).json({ error: "No existen productos" });
  }
};

//Delete por id

const deleteById = async (req: any, res: any) => {
  let data = await dbController.readFile();

  const id = Number(req.params.id);
  if (data.length > 0) {
    if (!isNaN(id)) {
      const updatedProducts = data.filter(
        (product) => product.id != req.params.id
      );
      data = updatedProducts;
      res.status(200).send("Película eliminada!");
    } else {
      res.status(400).json({ error: "El ID debe ser un número" });
    }
  } else {
    res.status(404).json({ error: "No existen películas" });
  }
};

export { getProducts, addProducts, getById, updateProduct, deleteById };
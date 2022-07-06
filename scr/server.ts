import express from 'express' 
import {router} from './routes/index'
import path from 'express'
import {request, response} from 'express'
const app = express()
// const port = process.env.PORT||8080     
const port = 8080

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api', router)

const error404= (request:any, response:any,next:any)=>{
    let mensajeError={
        error : "-2",
        descripcion: `ruta: ${request.url} método: ${request.method} no implementado`
    }
    response.status(404).json( mensajeError)
    next()
} 
//Ruta NO encontrada
app.use(error404)

// app.use((error, req, res) => {
//     res.status(error.httpStatusCode).send(error)
// })

// app.listen((port: any) => {
//     // if (error) {
//     //     console.log(`Se produjo un error al iniciar el servidor ${error}`)
//     // } else {
//         console.log(`El servidor esta escuchando el puerto ${port}`)
//     // }
// })

const server = app.listen(port, ()=> console.log(`Server listening on port: ${port}`));
server.on("error", err => console.log(`Oh no! Something is broken on the server: ${err}`));


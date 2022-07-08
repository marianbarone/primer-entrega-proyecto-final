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

export default auth
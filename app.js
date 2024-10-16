import express, { json } from "express"
import { createMovieRouter } from "./routes/movies.js"
import { corsMiddleware } from "./middlewares/cors.js"

export const createApp = ({movieModel}) => {
    const app = express()
    app.use(json())  //Middleware para poder recibir json
    app.use(corsMiddleware())
    app.disable('x-powered-by')  //Deshabilitando cabecera de express
    
    app.use('/movies', createMovieRouter({movieModel}))
    const PORT = process.env.PORT ?? 3000
    
    app.listen(PORT,()=>{
        console.log(`Server is running on port ${PORT}`)
    })
}

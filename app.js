import express, { json } from "express"
import { randomUUID } from "node:crypto"
import cors from "cors"
import { validateMovie, validatePartialMovie } from "./schemas/movies.js"

import fs from 'node:fs'

const movies = JSON.parse(fs.readFileSync('./movies.json'),'utf-8')

const app = express()
app.use(json())  //Middleware para poder recibir json
app.use(cors({
    origin: (origin, callback) => {
        const ACCEPTED_ORIGINS =[
            'http://localhost:5500',
            'http://localhost:3000',
            'http://localhost:3001',
            'http://movies.com'
        ]
        if(ACCEPTED_ORIGINS.includes(origin)){
            return callback(null, true)
        }

        if(!origin){
            return callback(null, true)
        }
    }
}))
app.disable('x-powered-by')  //Deshabilitando cabecera de express

app.get('/movies',(req, res)=>{
    const {genre} = req.query
    if(genre) {
        const filteredMovies = movies.filter(
            movie => movie.genre.some(g=>g.toLowerCase() === genre.toLowerCase())
        )
        res.json(filteredMovies)
    }
    res.json(movies)
})

app.get('/movies/:id',(req, res)=>{
    const {id} = req.params
    const movie = movies.find(movie => movie.id === id)
    if(movie) return res.json(movie)

    res.status(404).json({message: "Movie not found"})
})

app.post('/movies',(req, res)=>{
    const result = validateMovie(req.body)

    if(result.error) 
        return res.status(400).json(JSON.parse(result.error.message))

    const newMovie = {
        id: randomUUID(),
        ...result.data        
    }
    movies.push(newMovie)
    res.status(201).json(newMovie)
})

app.delete('/movies/:id',(req, res)=>{
    const {id} = req.params
    const movieIndex = movies.findIndex(movie => movie.id === id)
    if(movieIndex === -1) return res.status(404).json({message: "Movie not found"})

    movies.splice(movieIndex,1)
    return res.json({message: "Movie deleted"})
})

app.patch('/movies/:id', (req, res) => {
    const result = validatePartialMovie(req.body)
  
    if (!result.success) {
      return res.status(400).json({ error: JSON.parse(result.error.message) })
    }
  
    const { id } = req.params
    const movieIndex = movies.findIndex(movie => movie.id === id)
  
    if (movieIndex === -1) {
      return res.status(404).json({ message: 'Movie not found' })
    }
  
    const updateMovie = {
      ...movies[movieIndex],
      ...result.data
    }
  
    movies[movieIndex] = updateMovie
  
    return res.json(updateMovie)
})

const PORT = process.env.PORT ?? 3000

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`)
})
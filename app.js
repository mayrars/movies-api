const express =  require("express")
const crypto = require("node:crypto")
const movies = require("./movies.json")

const app = express()
app.use(express.json())  //Middleware para poder recibir json

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
    const {title, genre, year, director, duration, rate, poster} = req.body
    const newMovie = {
        id: crypto.randomUUID(),
        title,
        genre,
        year,
        director,
        duration,
        rate: rate ?? 0,
        poster,        
    }
    movies.push(newMovie)
    res.status(201).json(newMovie)
})


const PORT = process.env.PORT || 3000

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`)
})
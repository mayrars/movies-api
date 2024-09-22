const express =  require("express")
const movies = require("./movies.json")

const app = express()

app.disable('x-powered-by')  //Deshabilitando cabecera de express

app.get('/',(req, res)=>{
    res.json({
        "message": "Hello World"
    })
})

app.get('/movies',(req, res)=>{
    res.json(movies)
})

const PORT = process.env.PORT || 3000

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`)
})
const express =  require("express")

const app = express()

app.disable('x-powered-by')  //Deshabilitando cabecera de express

app.length('/',(req, res)=>{
    res.json({
        "message": "Hello World"
    })
})

const PORT = process.env.PORT || 3000

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`)
})
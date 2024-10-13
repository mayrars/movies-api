import mysql from 'mysql2/promise'

const config = {
    host: 'localhost',
    user: 'root',
    port: 3306,
    password: 'marco1',
    database: 'moviesdb'
}

const connection = await mysql.createConnection(config)

export class MovieModel{
    static async getAll({genre}) {
        if(genre){
            const lowerCaseGenre = genre.toLowerCase()
            const [genres] = await connection.query('SELECT * FROM genre WHERE LOWER(name) = ?;', [lowerCaseGenre])
            if(genres.length === 0) return []

            const [{id}] = genres
            //get all movies ids from database table, the query movie_genres join and get results from movie table
            const [movies] = await connection.query('SELECT *, BIN_TO_UUID(id) id FROM movies INNER JOIN movie_genres ON movies.id = movie_genres.movie_id WHERE movie_genres.genre_id = ?;', [id])
            return movies

        }

        const [movies] = await connection.query('SELECT *, BIN_TO_UUID(id) id FROM movies;')
        return movies
    }

    static async getById({id}) {
        const [movies] = await connection.query(
            `SELECT title, year, director, duration, poster, rate, BIN_TO_UUID(id) id 
            FROM movies WHERE id = UUID_TO_BIN(?);`, 
            [id])
        if(movies.length === 0) return null

        return movies[0]
    }

    static async create({input}) {
        const {
            genre : genreInput,
            title,
            year,
            duration,
            director,
            rate,
            poster
        } = input

        const [uuidResult] = await connection.query('SELECT UUID() uuid;')
        const [{uuid}] = uuidResult
        try{
            await connection.query(
                `INSERT INTO movies(id, title, year, director, duration, poster, rate) 
                VALUES(UUID_TO_BIN("${uuid}"), ?, ?, ?, ?, ?, ?);`,[title, year, director, duration, poster, rate]
            )
        }catch(e){
            console.log(e)
            throw new Error("Error creating movie")
        }
            
        const [movies] = await connection.query(
            `SELECT title, year, director, duration, poster, rate, BIN_TO_UUID(id) id 
            FROM movies WHERE id = UUID_TO_BIN(?);`, [uuid])

        return movies[0]
    }

    static async delete({id}) {
        
    }
    
    static async update({id, input}) {
        
    }
}
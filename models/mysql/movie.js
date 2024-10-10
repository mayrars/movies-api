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

    }

    static async create({input}) {
        
    }

    static async delete({id}) {
        
    }
    
    static async update({id, input}) {
        
    }
}
import { readJSON } from "../utils"

const movies = readJSON('../movies.json')
export class MovieModel{
    static getAll= async ({genre})=>{
        if(genre) {
            return movies.filter(
                movie => movie.genre.some(g=>g.toLowerCase() === genre.toLowerCase())
            )
            res.json(filteredMovies)
        }
        return movies
    }
}
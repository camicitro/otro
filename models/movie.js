import movies from '../movies.json' with {type: 'json'}
import { randomUUID } from 'crypto'


export class MovieModel { //hacemos q sea una clase para que tenga un contrato
    //se hace asincrono pq asi aseguramos que todos los modelos tengan el mismo contrato
    static async getAll ({genre}) {
        try{ //despues no vamos a usar el try catch aca sino en un middleware, pero no olvidar que si hay un async await hay q manejar los errores
            if(genre){
                return movies.filter(
                    movie => movie.genre.some(g => g.toLowerCase() == genre.toLowerCase())
                )
            }
            return movies
        } catch (error){
            res.status(500).json({ message: error.message })
        }
        
    }

    static async getById ({ id }) {
        const movie = movies.find(movie => movie.id === id)
        if(movie) return movie
    }

    static async create ({input}){
        const newMovie = {
            id: randomUUID(),
            ...input
        }

        movies.push(newMovie)

        return newMovie
    }

    static async delete({id}){ //en los parametros usamos objetos ({}) porque luego podria ser mas dificil de extender
    const movieIndex = movies.findIndex(movie => movie.id == id)
    if (movieIndex == -1 ) return false

    movies.splice(movieIndex, 1)
    return true
    }

    static async update({id, input}){
        const movieIndex = movies.findIndex(movie => movie.id == id)
        if(movieIndex === -1) return false

        movies[movieIndex] = {
            ...movies[movieIndex]
            .duration.toFixed.input
        }

        return movies[movieIndex]
    }
}
import mysql from 'mysql2/promise'

const config = {
    host: 'localhost',
    user: 'root',
    port: 3306,
    password: 'Mochila12345',
    database: 'moviesdb'
}

const connection = await mysql.createConnection(config)



export class MovieModel {
    static async getAll({genre}){
        if(genre){
            const lowerCaseGenre = genre.toLowerCase()
            const [genres] = await connection.query(
                'SELECT id, name FROM genre WHERE LOWER(name) = ?;', [lowerCaseGenre] //usarlo asi con el ? y el array pq sino si usamos el ${} podemos sufrir un ataque de SQL injection
            )

            if(genres.length == 0) return []

            const [{id}] = genres //FALTA SEGUIR
            return []
        }
        
        const [movies] = await connection.query(
            'SELECT *, BIN_TO_UUID(id) FROM movie'
        )
        console.log(movies)
    }

    static async getById({id}){
        console.log(id);
        'SELECT *, BIN_TO_UUID(id) FROM movie WHERE id = UUID_TO_BIN(?);', [ id ]
        
    }

    static async create({ input }){
        //const connection = await mysql.createConnection(config);
        

        try{

            const {
                title,
                year,
                director,
                duration,
                poster,
                rate, 
                genre
                
            } = input
            
            const [uuidResult] = await connection.query('SELECT UUID() uuid;')
            const [{ uuid }] = uuidResult

            

            await connection.query(
            `INSERT into movie (id, title, year, director, duration, rate, poster) 
            VALUES
            (UUID_TO_BIN(?),?,?,?,?,?,?);`, [uuid, title, year, director, duration, rate, poster ]
            );

            for (const genreName of genre) {
                const [genreResult] = await connection.query(
                    'SELECT id FROM genre WHERE name = ?;', [genreName]
                );
                const [{ id: genreId }] = genreResult;
                console.log("El id del genero es ",genreId)
                await connection.query(
                    'INSERT INTO movie_genres (movie_id, genre_id) VALUES (UUID_TO_BIN(?), ?);',
                    [uuid, genreId]
                );
            }

            const [movie] = await connection.query(
                'SELECT *, BIN_TO_UUID(id) FROM movie WHERE id = UUID_TO_BIN(?);', [ uuid ]
                )
        
                console.log(movie)
                //await connection.end();
                return movie[0]

        } catch(e){
            console.log("Error xd: ", e)
            throw new Error('Error creating movie')
            
        }

    }

    static async delete({id}){
        
    }

    static async getAll({id, input}){
        
    }
}
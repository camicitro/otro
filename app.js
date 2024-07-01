import express, { json } from 'express'
//como leer un json en ESModules
//import fs from 'node:fs'
//const movies = JSON.parse(fs.readFileSync('./movies.json', 'utf-8'))
//ahora puede q sea:
// import movies from './movies.json' with {type: 'json'}

import { moviesRouter } from './routes/moviesRoute.js'
import { corsMiddleware } from './middlewares/cors.js'



const app = express()
app.use(json())
app.use(corsMiddleware())
app.disable('x-powered-by')

app.use('/movies', moviesRouter)

const PORT = process.env.PORT || 1234

app.listen(PORT, () => {
    console.log(`Server listening on port http://localhost:${PORT}`)
})




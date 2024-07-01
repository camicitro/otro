
import { Router } from "express";
//router permite crear un enrutador a partir del cual vamos a poder responder todos los path

import { MovieController } from "../controllers/movies.js";

//como leer un json en ESModules recomendado por ahora
// import { createRequire } from 'node:module'
// const required = createRequire(import.meta.url) //el import este tiene la direccion del archivo actual
// const movies = required('./movies.json')


export const moviesRouter = Router()

moviesRouter.get('/:id', MovieController.getById)

moviesRouter.get('/', MovieController.getAll)

moviesRouter.post('/', MovieController.create)

moviesRouter.delete('/:id', MovieController.delete)

moviesRouter.patch('/:id',  MovieController.update)



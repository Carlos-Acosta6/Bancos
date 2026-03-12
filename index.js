import express from 'express'
import Bancos from './DB/bancos.js';

const servidor = express();
const PORT = 3000

// MIDDLEWARE

servidor.use(express.json())

// ROUTERS

servidor.use('/banco', rutaCurso)

// ROUTING

servidor.get ('/', (req, res) =>{

    res.send('Bienevenido al Banco')
});

// CURSOS

import rutaCurso from './routers/rutas.js';

servidor.listen (PORT, () =>{
    console.log (`http://localhost:${PORT}`)
});
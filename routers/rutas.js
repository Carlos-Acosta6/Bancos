import express from "express";
import Bancos from "../DB/bancos.js";

const rutaBanco = express.Router();

// MIDDLEWARE

rutaBanco.use(express.json());

// ROUTING

rutaBanco.get("/", (req, res) => {
  res.json(Bancos);
});

rutaBanco.get("/:id", (req, res) => {
  const banco = req.params?.id;
  const resultado = Bancos[banco];

  if (!resultado) {
    res.status(404).send(`Banco ${banco} no encontrado.`);
  }

  res.json(resultado);
});

rutaBanco.get("/:id/:clientes", (req, res) => {

  const { id, clientes } = req.params
  const resultado = Bancos?.[id]?.[clientes];

  if (!Bancos[id]) {
    return res.status(404).send("Banco no encontrado.");
  }

  if (!resultado) {
    return res.status(404).send("Clientes no encontrados.");
  }

  res.json(resultado);
});

rutaBanco.get("/:id/:clientes/:usuario", (req, res) => {

  const { id, clientes, usuario } = req.params

  const resultado = Bancos?.[id]?.[clientes][usuario];

  if (!Bancos[id]) {
    return res.status(404).send(`Banco ${id} no encontrado.`);
  }

  if (!resultado) {
    return res.status(404).send('Ruta invalida.')
  }

  res.json(resultado);

});

// POST

rutaBanco.post('/', (req, res) => {

  const nuevoBanco = req.body;

  if ("" in nuevoBanco) {
    return res.status(400).send('Key invalida')
  }

  Object.assign(Bancos, nuevoBanco);
  res.send('Datos agregados correctamente');

});

rutaBanco.post('/:id/:clientes', (req, res) => {

  const {id, clientes} = req.params
  const nuevoParticipante = req.body;

  if ("" in nuevoParticipante) {
    return res.status(400).send('Nombre invalido/nula')
  }

  Object.assign(Bancos?.[id]?.[clientes], nuevoParticipante);
  res.send('Datos agregados correctamente');

});

// PUT 

rutaBanco.put("/:id/:clientes/:cliente", (req, res) => {

  const {id, clientes, cliente} = req.params
  const parametros = req.body

  if (Object.keys(parametros) == "") {
    return res.status(400).send('Estado invalido.')
  }

  let ruta = Bancos[id][clientes][cliente]

  if (!Bancos[id]){
    res.status(404).send(`Banco ${id} no encontrado.`)
  }

  let estadoUsuario = Object.entries(Bancos[id][clientes][cliente] = parametros)

  Object.assign(Bancos, estadoUsuario)
  res.send(estadoUsuario)

});

// DELETE

rutaBanco.delete("/:id/:participantes/:estudiante", (req, res) => {
  const id = req.params.id;
  const participantes = req.params.participantes;
  const estudiante = req.params.estudiante;

  const ruta = Bancos[id][participantes][estudiante];

  if (estudiante.match(" ")) {

    return res.status(400).send("Nombre invalido")

  } else if (!ruta) {
    return res.status(404).send(`El estudiante ${estudiante} no ha sido encontrado.`)

  }

  delete Bancos[id][participantes][estudiante]
  res.end(`${estudiante} ha sido eliminado`)

});

export default rutaBanco
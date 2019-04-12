const express = require('express');
const multer = require('multer');
const multerConfig = require('./config/multer');

const routes = express.Router();
const boxController = require('./controllers/boxController');
const fileController = require('./controllers/fileController');

routes.post('/boxes', boxController.store); //cria
routes.get('/boxes', boxController.store); //lista todos
routes.get('/boxes/:id', boxController.show); //busca por id
routes.put('/boxes/:id', boxController.store); //atualiza
routes.delete('/boxes/:id', boxController.store); //exclui

routes.post('/boxes/:id/files', multer(multerConfig).single('file'), fileController.store); //cria

module.exports = routes;
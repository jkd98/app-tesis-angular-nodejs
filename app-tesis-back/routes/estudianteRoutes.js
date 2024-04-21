import express from 'express';
import {
    crearEstudiante,
    listarEstudiantes,
    obtenerUnEstudiante,
    editarEstudiante,
    borrarEstudiante,
} 
from "../controllers/estudianteController.js"; // metodos del controlador

const router = express.Router(); // Esto es para poder usar los metodos http (post,put,delete,...)


router.post('/add',crearEstudiante); // Primer seccion se ruta para insertar
router.get('/list',listarEstudiantes); // Para listar registros
router.get('/one/:id',obtenerUnEstudiante); // Obtener un solo registro
router.put('/edit/:id',editarEstudiante); // Para editar registros
router.delete('/delete/:id',borrarEstudiante); // para borra registro


// asi se exporta el router para poder ser usado en el index (rutas principales)
export default router;
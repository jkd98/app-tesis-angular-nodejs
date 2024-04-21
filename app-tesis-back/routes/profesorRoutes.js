import express from 'express';
import {
    crearProfesor,
    listarProfesores,
    obtenerUnProfesor,
    editarProfesor,
    borrarProfesor,
} 
from "../controllers/profesorController.js"; // metodos del controlador

const router = express.Router(); // Esto es para poder usar los metodos http (post,put,delete,...)


router.post('/add',crearProfesor); // Primer seccion se ruta para insertar
router.get('/list',listarProfesores); // Para listar registros
router.get('/one/:id',obtenerUnProfesor); // Obtener un solo registro
router.put('/edit/:id',editarProfesor); // Para editar registros
router.delete('/delete/:id',borrarProfesor); // para borra registro


// asi se exporta el router para poder ser usado en el index (rutas principales)
export default router;
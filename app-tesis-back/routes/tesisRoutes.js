import express from 'express';
import {
    crearTesis,
    listarTesis,
    obtenerUnaTesis,
    editarTesis,
    borrarTesis,
    buscarTesis,
    obtenerCategorias,
} 
from "../controllers/tesisController.js"; // metodos del controlador

const router = express.Router(); // Esto es para poder usar los metodos http (post,put,delete,...)


router.post('/add',crearTesis); // Primer seccion se ruta para insertar
router.get('/list',listarTesis); // Para listar registros
router.get('/one/:id',obtenerUnaTesis); // Obtener un solo registro
router.put('/edit/:id',editarTesis); // Para editar registros
router.delete('/delete/:id',borrarTesis); // para borra registro
router.get('/buscar',buscarTesis) // para filtros
router.get('/categorias',obtenerCategorias)


// asi se exporta el router para poder ser usado en el index (rutas principales)
export default router;
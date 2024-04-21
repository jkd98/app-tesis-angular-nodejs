import Tesis from "../models/Tesis.js";

/**
 * Esta función crea una nueva tesis
 */
const crearTesis = async (req, res) => {
    try {
        // Verificar si todos los campos están presentes en la solicitud
        console.log(req.body)
        const nuevaTesis = new Tesis(req.body); // Crear un objeto de tipo Tesis
        nuevaTesis.fechaPublicacion = new Date(req.body.fechaPublicacion);
        const guardado = await nuevaTesis.save(); // Guardar el objeto en la base de datos
        console.log(guardado);
        return res.json({ msg: "Tesis creada correctamente" });
    } catch (error) {
        return res.json({ msg: "Faltan datos o error al guardar la tesis" });
    }
}

/**
 * Esta función lista todas las tesis
 */
const listarTesis = async (req, res) => {
    try {
        const tesis = await Tesis.find();
        return res.json({ msg: "Lista de tesis:", datos: tesis });
    } catch (error) {
        return res.json({ msg: "Error al obtener la lista de tesis" });
    }
}

/**
 * Esta función obtiene una tesis por su ID
 */
const obtenerUnaTesis = async (req, res) => {
    const { id } = req.params;
    try {
        const unaTesis = await Tesis.findById(id);
        if(unaTesis){
            return res.json(unaTesis);
        }else{
            return res.json({msg:"No existe la tesis"})
        }
    } catch (error) {
        return res.json({ msg: "Error al obtener la tesis" });
    }
}

/**
 * Esta función actualiza una tesis por su ID
 */
const editarTesis = async (req, res) => {
    const { id } = req.params;
    try {
        const existeTesis = await Tesis.findById(id);
        if (!existeTesis) {
            return res.json({ msg: "No se encontró la tesis" });
        }
        // Actualizar los campos de la tesis
        //if (existeTesis === req.body){console.log("iguales")}
        Object.assign(existeTesis, req.body);
        const tesisEditada = await existeTesis.save();
        return res.json({ msg: "Tesis actualizada correctamente",antes:existeTesis, resultado:tesisEditada });
    } catch (error) {
        return res.json({ msg: "Error al actualizar la tesis. No se encontró la tesis" });
    }
}

/**
 * Esta función elimina una tesis por su ID
 */
const borrarTesis = async (req, res) => {
    const { id } = req.params;
    try {
        const exist = await Tesis.findById(id);
        if(exist){
            const tesisEliminada = await Tesis.findByIdAndDelete(id);
            if (tesisEliminada) {
                console.log(tesisEliminada);
            }
            return res.json({ msg: "Tesis eliminada correctamente" });
        }else{
            return res.json({msg:"No existe la tesis"})
        }
    } catch (error) {
        return res.json({ msg: "Error al eliminar la tesis" });
    }
}


/**
 * Esta función realiza una búsqueda de tesis aplicando filtros
 */
const buscarTesis = async (req, res) => {
    try {
        let filtros = {};

        // Obtener los filtros de la solicitud
        const { autor,areaEstudio, grado, fechaInicio, fechaFin} = req.query;

        // Aplicar los filtros según corresponda
        if (autor) {
            filtros.autores = {
                $in:[autor]
            };
        }
        if (areaEstudio) {
            filtros.areaEstudio = areaEstudio;
        }
        if (grado) {
            filtros.grado = grado;
        }
        if (fechaInicio!=undefined && fechaFin!=undefined) {
            console.log(fechaInicio);
            console.log(fechaFin);
            // Convertir las fechas de inicio y fin en objetos Date
            const fechaInicioObj = new Date(fechaInicio);
            const fechaFinObj = new Date(fechaFin);

            // Filtrar por un rango de fechas
            filtros.fechaPublicacion = {
                $gte: fechaInicioObj, // Mayor o igual que la fecha de inicio
                $lte: fechaFinObj // Menor o igual que la fecha de fin
            };
        }

        // Realizar la búsqueda de tesis aplicando los filtros
        ///buscar?areaEstudio=Informática&grado=Maestría&fechaPublicacion=2024-01-01)
        console.log(filtros);
        const tesis = await Tesis.find(filtros);

        return res.json({ msg: "Resultados de búsqueda:", datos: tesis });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ msg: "Error en el servidor" });
    }
}

const obtenerCategorias = async (req,res) => {
    try {
        //const tesis = await Tesis.find({},{areaEstudio:1,_id:0});
        const tesis = await Tesis.aggregate([
            // Agrupar documentos por la propiedad "areaEstudio"
            {
              $group: {
                _id: "$areaEstudio", // Campo por el que se agrupará
                tesis: { $push: "$$ROOT" } // Se guarda todo el documento en un arreglo llamado "tesis"
              }
            }
          ])
        return res.json({ msg: "Lista de tesis:", datos: tesis });
    } catch (error) {
        return res.json({ msg: "Error al obtener la lista de tesis" });
    }
}

export {
    crearTesis,
    listarTesis,
    obtenerUnaTesis,
    editarTesis,
    borrarTesis,
    buscarTesis,
    obtenerCategorias,
}

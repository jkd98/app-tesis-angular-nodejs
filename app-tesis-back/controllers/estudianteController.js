import Estudiante from "../models/Estudiante.js";

/**
 * Esta función crea un nuevo estudiante
 */
const crearEstudiante = async (req, res) => {
    try {
        // Verificar si todos los campos están presentes en la solicitud
        const nuevoEstudiante = new Estudiante(req.body); // Crear un objeto de tipo Estudiante
        const guardado = await nuevoEstudiante.save(); // Guardar el objeto en la base de datos
        console.log(guardado);
        return res.json({ msg: "Estudiante creado correctamente" });
    } catch (error) {
        return res.json({ msg: "Faltan datos o el email ya está registrado" });
    }
}

/**
 * Esta función lista todos los estudiantes
 */
const listarEstudiantes = async (req, res) => {
    try {
        const estudiantes = await Estudiante.find();
        return res.json({ msg: "Lista de estudiantes:", datos: estudiantes });
    } catch (error) {
        return res.json({ msg: "Error al obtener la lista de estudiantes" });
    }
}

/**
 * Esta función obtiene un estudiante por su ID
 */
const obtenerUnEstudiante = async (req, res) => {
    const { id } = req.params;
    try {
        const unEstudiante = await Estudiante.findById(id);
        if (unEstudiante) {
            return res.json(unEstudiante);
        } else {
            return res.json({ msg: "No existe el estudiante" });
        }
    } catch (error) {
        return res.json({ msg: "Error al obtener el estudiante" });
    }
}

/**
 * Esta función actualiza un estudiante por su ID
 */
const editarEstudiante = async (req, res) => {
    const { id } = req.params;
    try {
        const existeEstudiante = await Estudiante.findById(id);
        if (!existeEstudiante) {
            return res.json({ msg: "No se encontró el estudiante" });
        }
        // Actualizar los campos del estudiante
        Object.assign(existeEstudiante, req.body);
        const estudianteEditado = await existeEstudiante.save();
        return res.json({ msg: "Estudiante actualizado correctamente", antes: existeEstudiante, resultado: estudianteEditado });
    } catch (error) {
        return res.json({ msg: "Error al actualizar el estudiante" });
    }
}

/**
 * Esta función elimina un estudiante por su ID
 */
const borrarEstudiante = async (req, res) => {
    const { id } = req.params;
    try {
        const existe = await Estudiante.findById(id);
        if (existe) {
            const estudianteEliminado = await Estudiante.findByIdAndDelete(id);
            if (estudianteEliminado) {
                console.log(estudianteEliminado);
            }
            return res.json({ msg: "Estudiante eliminado correctamente" });
        } else {
            return res.json({ msg: "No existe el estudiante" });
        }
    } catch (error) {
        return res.json({ msg: "Error al eliminar el estudiante" });
    }
}

export {
    crearEstudiante,
    listarEstudiantes,
    obtenerUnEstudiante,
    editarEstudiante,
    borrarEstudiante
}

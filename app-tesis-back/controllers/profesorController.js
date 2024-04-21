import Profesor from "../models/Profesor.js";

/**
 * Esta función crea un nuevo profesor
 */
const crearProfesor = async (req, res) => {
    try {
        // Verificar si todos los campos están presentes en la solicitud
        const nuevoProfesor = new Profesor(req.body); // Crear un objeto de tipo Profesor
        const guardado = await nuevoProfesor.save(); // Guardar el objeto en la base de datos
        console.log(guardado);
        return res.json({ msg: "Profesor creado correctamente" });
    } catch (error) {
        return res.json({ msg: "Faltan datos o el email ya esta registrado" });
    }
}

/**
 * Esta función lista todos los profesores
 */
const listarProfesores = async (req, res) => {
    try {
        const profesores = await Profesor.find();
        return res.json({ msg: "Lista de profesores:", datos: profesores });
    } catch (error) {
        return res.json({ msg: "Error al obtener la lista de profesores" });
    }
}

/**
 * Esta función obtiene un profesor por su ID
 */
const obtenerUnProfesor = async (req, res) => {
    const { id } = req.params;
    try {
        const unProfesor = await Profesor.findById(id);
        if (unProfesor) {
            return res.json(unProfesor);
        } else {
            return res.json({ msg: "No existe el profesor" });
        }
    } catch (error) {
        return res.json({ msg: "Error al obtener el profesor" });
    }
}

/**
 * Esta función actualiza un profesor por su ID
 */
const editarProfesor = async (req, res) => {
    const { id } = req.params;
    try {
        const existeProfesor = await Profesor.findById(id);
        if (!existeProfesor) {
            return res.json({ msg: "No se encontró el profesor" });
        }
        // Actualizar los campos del profesor
        Object.assign(existeProfesor, req.body);
        const profesorEditado = await existeProfesor.save();
        return res.json({ msg: "Profesor actualizado correctamente", antes: existeProfesor, resultado: profesorEditado });
    } catch (error) {
        return res.json({ msg: "Error al actualizar el profesor" });
    }
}

/**
 * Esta función elimina un profesor por su ID
 */
const borrarProfesor = async (req, res) => {
    const { id } = req.params;
    try {
        const existe = await Profesor.findById(id);
        if (existe) {
            const profesorEliminado = await Profesor.findByIdAndDelete(id);
            if (profesorEliminado) {
                console.log(profesorEliminado);
            }
            return res.json({ msg: "Profesor eliminado correctamente" });
        } else {
            return res.json({ msg: "No existe el profesor" });
        }
    } catch (error) {
        return res.json({ msg: "Error al eliminar el profesor" });
    }
}

export {
    crearProfesor,
    listarProfesores,
    obtenerUnProfesor,
    editarProfesor,
    borrarProfesor
}

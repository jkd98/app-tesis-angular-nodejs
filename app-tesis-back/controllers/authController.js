import Profesor from "../models/Profesor.js";
import Estudiante from "../models/Estudiante.js";

const iniciarSesion = async (req, res) => {
    const { email, pass, rol } = req.body;

    try {
        let usuario;

        if (rol === 'Profesor') {
            usuario = await Profesor.findOne({ email });
        } else if (rol === 'Alumno') {
            usuario = await Estudiante.findOne({ email });
        } else if (rol === 'adm') {
            usuario = await Estudiante.findOne({ email }).where({rol:"adm"});
        } else {
            return res.json({ msg: "Rol de usuario no válido" });
        }

        if (!usuario) {
            return res.json({ msg: "Credenciales incorrectas" });
        }

        // Verificar la contraseña
        const contraseñaValida = (usuario.pass === pass);
        if (!contraseñaValida) {
            return res.json({ msg: "Credenciales incorrectas" });
        }

        // Si las credenciales son válidas, iniciar sesión
        // Aquí podrías generar un token de autenticación u otro identificador de sesión
        return res.json({ msg: "Inicio de sesión exitoso", usr:{rol:usuario.rol,username:usuario.email} });

    } catch (error) {
        console.error(error);
        return res.json({ msg: "Error en el servidor" });
    }
}

export { iniciarSesion };

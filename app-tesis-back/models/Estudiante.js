import mongoose from "mongoose";

// Definir el esquema del estudiante
const estudianteSchema = mongoose.Schema({
    nombre: {
        type: String,
        required: true,
        trim: true
    },
    apellido: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    pass: {
        type: String,
        //required: true,
        trim: true,
        default:'12345'

    },
    carrera: {
        type: String,
        required: true,
        trim: true
    },
    semestre: {
        type: Number,
        required: true
    },
    promedio: {
        type: Number,
        default:8
    },
    rol: {
        type:String,
        default:'Alumno'
    }
});

// Definir el modelo de Estudiante
const Estudiante = mongoose.model('Estudiante', estudianteSchema);

export default Estudiante;

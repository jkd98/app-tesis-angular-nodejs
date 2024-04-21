import mongoose from "mongoose";

// Definir el esquema del profesor
const profesorSchema = mongoose.Schema({
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
        required: true,
        trim: true,
    },
    departamento: {
        type: String,
        required: true,
        trim: true
    },
    especialidad: {
        type: String,
        required: true,
        trim: true
    },
    gradoAcademico: {
        type: String,
        required: true,
        trim: true
    },
    experiencia: {
        type: Number,
        trim: true
    },
    rol: {
        type:String,
        default:'Profesor'
    }
});

// Definir el modelo de Profesor
const Profesor = mongoose.model('Profesor', profesorSchema);

export default Profesor;

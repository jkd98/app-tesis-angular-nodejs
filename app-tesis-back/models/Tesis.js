import mongoose from "mongoose";

// Definir el esquema de la tesis
const tesisSchema = mongoose.Schema({
    titulo: {
        type: String,
        required: true,
        trim:true
    },
    autores: [{
        type: String,
        required: true,
        trim:true
    }],
    fechaPublicacion: {
        type: Date,
        required: true,
        trim:true

    },
    institucion: {
        type: String,
        required: true,
        trim:true
    },
    areaEstudio: {
        type: String,
        required: true,
        trim:true
    },
    palabrasClave: [{
        type: String,
        trim:true
    }],
    resumen: {
        type: String,
        required: true,
        trim:true
    },
    idioma: {
        type: String,
        required: true,
        trim:true
    },
    formato: {
        type: String,
        required: true,
        trim:true
    },
    asesores: [{
        type: String,
        trim:true
    }],
    grado: {
        type: String,
        required: true,
        trim:true
    }
});

// Definir el modelo de Tesis
const Tesis = mongoose.model('Tesis', tesisSchema);

export default Tesis;



let data = [];

function crearData(){
  let i=11; 
  let objt={};
  let count=1;
  for(count;count<29;count++){ 
    objt={
    "titulo":`Tesis ${i}`,
    "autores": [`Autor ${i++}`,`Autor ${i+3}`],
    "fechaPublicacion": new Date(`2024-06-${count}`),
    "institucion": "UTNG",
    "areaEstudio": "Informática",
    "palabrasClave": ["Seguridad","Sistemas","Linux"],
    "resumen": `Esta es un pequeño resumen que se mostrara al dar clic en el boton de ver mas, ademas de otros datos que pertenecen a este documento ${i}`,
    "idioma": "Español",
    "formato": "Impreso",
    "asesores": [`Asesor A${i+8}`],
    "grado":"Maestría"
     }
     data.push(objt);
    };
 };

 function insertarData(){
  //Para usuario administrdaor 
    let user = { 
      nombre: 'JK98', 
      apellido: 'Front Adm', 
      email: '99@email.com', 
      pass: '12345', 
      carrera: 'Soporte', 
      semestre: 6, 
      promedio: 8, 
      rol: 'adm' 
    };
  crearData();
  db.teses.insertMany(data);
  db.estudiantes.insertOne(user);
 }
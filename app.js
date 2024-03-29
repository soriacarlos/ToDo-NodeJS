require('colors');

const { guardarDB, leerDB } = require('./helpers/guardarArchivo');
const { 
  inquirerMenu, 
  pausa,
  leerInput,
  listadoTareasBorrar,
  confirmar,
  mostrarListadoCheckList
} = require('./helpers/inquirer');

const Tareas = require('./models/tareas');

const main = async() => {

  let opt = '';
  const tareas = new Tareas();
  const tareasDB = leerDB();
  
  if(tareasDB){ // cargar tareas
    tareas.cargarTareasFromArray(tareasDB);
    tareas.listadoCompleto();
  }

  do {
    // Imprimir el menú
    opt = await inquirerMenu();
    
    switch(opt){
      case '1':
        // Crear opción
        const desc = await leerInput('Descripción: ');
        tareas.crearTarea(desc);
      break;

      case '2': // Listar tareas
        // console.log(tareas.listadoArr);
        tareas.listadoCompleto();
      break;

      case '3': // Listar tareas completadas
        tareas.listarPendientesCompletadas(true);
      break;

      case '4': // Listar tareas pendientes
        tareas.listarPendientesCompletadas(false);
      break;

      case '5': // Completar tareas
        const ids = await mostrarListadoCheckList( tareas.listadoArr );
        tareas.toggleCompletadas(ids);
      break;

      case '6': // Borrar tareas
        const id = await listadoTareasBorrar(tareas.listadoArr);
        
        if(id !== '0'){
          const ok = await confirmar('¿Está seguro?');
          // TODO: preguntar si está seguro de borrar
          // console.log({ok});
  
          if(ok){
            tareas.borrarTarea(id);
            console.log('Tarea borrada');
          }

        }
      break;
    }

    guardarDB( tareas.listadoArr );

    await pausa();

  } while( opt !== '0');

}

main();
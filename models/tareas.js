const Tarea = require('./tarea');
const colors = require('colors');
/**
 * _listado:
 *      {'uuid-23252-423423-42342: { id:12, desc: asdasfadas, completadoEn: 202020}},
 */

class Tareas {
  _listado = {};

  get listadoArr() {
    const listado = [];
    Object.keys(this._listado).forEach( key => {
      const tarea = this._listado[key];
      listado.push(tarea);
    });

    return listado;
  }

  constructor() {
    this._listado = {};
  }

  borrarTarea ( id = '' ) {
    if ( this._listado[id]) {
      delete this._listado[id];
    }
  }

  cargarTareasFromArray( tareas = [] ) {
    tareas.forEach( tarea => {
      this._listado[tarea.id] = tarea;
    })
  }

  crearTarea( desc = '' ) {

    const tarea = new Tarea(desc);
    this._listado[tarea.id] = tarea;

  }

  listadoCompleto() {
    // console.log(this._listado);
    // console.log(this.listadoArr);
   
    // 1: verder
    // Completada: verde
    // Pendiente: rojo

    // 1. Alma :: Completada | Pendiente
    // 2. Realidad :: Completada | Pendiente
    // 3. Poder :: Completada | Pendiente

    console.log();
    this.listadoArr.forEach((tarea, i) => {
      const idx = `${i+1}.`.green;
      const { desc, completadoEn } = tarea;
      const estado = (completadoEn) ? 'Completado'.green : 'Pendiente'.red;
      console.log(`${idx} ${desc} :: ${estado}`);
    });
    console.log();

  }

  listarPendientesCompletadas (completadas = true) {

    console.log();
    let contador = 0;
    this.listadoArr.forEach(tarea => {
      
      const { desc, completadoEn } = tarea;
      const estado = (completadoEn) ? 'Completada'.green : 'Pendiente'.red ;
              
      if(completadas){
        // mostrar completadas
        if(completadoEn){
          contador += 1;
          console.log(`${(contador.toString() + '.').green} ${desc} :: ${completadoEn.green}`);
        }
      }else{
        // mostrar pendientes
        if(!completadoEn){
          contador += 1;
          console.log(`${(contador.toString() + '.').green} ${desc} :: ${estado}`);
        }
      }
    });
    console.log();
    
  }

  toggleCompletadas(ids = []) {

    ids.forEach(id => {    

      const tarea = this._listado[id];
      if(!tarea.completadoEn){
        tarea.completadoEn = new Date().toISOString();
      }

    });

    this.listadoArr.forEach(tarea => {

      if(!ids.includes(tarea.id)){
        this._listado[tarea.id].completadoEn = null;
      }

    });

  }

}

module.exports = Tareas;
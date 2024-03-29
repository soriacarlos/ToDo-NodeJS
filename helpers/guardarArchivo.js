const fs = require('fs');

const archivo = './db/data.json';

const guardarDB = ( data ) => {
  fs.writeFileSync( archivo, JSON.stringify(data) );
}

const leerDB = () => {
  // Verificamos si el archivo existe
  if( !fs.existsSync(archivo) ){
    return null;
  }

  const info = fs.readFileSync( archivo, { encoding: 'utf-8' } );
  const data = JSON.parse(info);

  // console.log(data);

  // return null;
  return data;

}

module.exports = {
  guardarDB, 
  leerDB
}
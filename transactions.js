const dbName = 'campusParking'
const session = db.getMongo().startSession()
session.startTransaction()

try {
  const dbSession = session.getDatabase(dbName)

//Aqui definimos los IDs que vendrian del frontend/backend...
const zonaObjetivo = dbSession.zonas.findOne({ nombre: 'Zona A - Carros'})
const vahiculosObjetivo = dbSession.vehiculos.findOne({ placa: 'ABCD123'})

if (zonaObjetivo.cuposDisponibles <= 0) {
  throw new Error('No hay cupos disponibles en esta zona.')
}

2. //Insertamos el documento...
dbSession.parqueos.insertOne({
  vehiculoID: vehiculoObjetivo._id,
  zonaID: zonaObjetivo._id,
  horaEntrada: new Date(),
  horaSalida: null,
  costoTotal: null
})

// Despues descontamos el cupo de la zona...
dbSession.zonas.updateOne(
  { _id: zonaObjetivo._id },
  { $inc: { cuposDisponibles: -1}}
)

// Luego confirmamos la transaccion...
session.commitTransaction()
print('Ingreso registrado exitosamente. Transaccion Completada!!!...')
} 
catch (error) {
  //En caso de cualquier error, entonces revertimos los cambios con la funcion abortar-transaccion...
session.abortTransaction()
print('Transaccion interrumpida debido a un erro: ' + error.message )
} 
finally {
//finalizamos la sesion...
  session.endSession()
}

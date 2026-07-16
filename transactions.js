// // transactions.js
// // Ejecutar en mongosh

// const dbName = "campus_parking";
// const session = db.getMongo().startSession();
// session.startTransaction();

// try {
//   const dbSession = session.getDatabase(dbName);
  
//   // 1. Definir los IDs (En un entorno real, estos vienen del frontend/backend)
//   const zonaObjetivo = dbSession.zonas.findOne({ nombre: "Zona A - Carros" });
//   const vehiculoObjetivo = dbSession.vehiculos.findOne({ placa: "ABC123" });

//   if (zonaObjetivo.cupos_disponibles <= 0) {
//     throw new Error("No hay cupos disponibles en esta zona.");
//   }

//   // 2. Insertar el documento de ingreso
//   dbSession.parqueos.insertOne({
//     vehiculo_id: vehiculoObjetivo._id,
//     zona_id: zonaObjetivo._id,
//     hora_entrada: new Date(),
//     hora_salida: null,
//     costo_total: null
//   });

//   // 3. Descontar el cupo de la zona
//   dbSession.zonas.updateOne(
//     { _id: zonaObjetivo._id },
//     { $inc: { cupos_disponibles: -1 } }
//   );

//   // 4. Confirmar transacción
//   session.commitTransaction();
//   print("Ingreso registrado exitosamente. Transacción completada.");

// } catch (error) {
//   // En caso de cualquier error, revertir todos los cambios
//   session.abortTransaction();
//   print("Transacción abortada debido a un error: " + error.message);
// } finally {
//   session.endSession();
// }
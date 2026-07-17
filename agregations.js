// aggregations.js
db = db.getSiblingDB("campus_parking");

// 1. Parqueos registrados por sede en el último mes
db.parqueos.aggregate([
  { $match: { hora_entrada: { $gte: new Date(new Date().setMonth(new Date().getMonth() - 1)) } } },
  { $lookup: { from: "zonas", localField: "zona_id", foreignField: "_id", as: "zona_info" } },
  { $unwind: "$zona_info" },
  { $group: { _id: "$zona_info.sede_id", total_parqueos: { $sum: 1 } } }
]);

// 2. Zonas más ocupadas en cada sede (basado en registros históricos)
db.parqueos.aggregate([
  { $group: { _id: "$zona_id", total_usos: { $sum: 1 } } },
  { $sort: { total_usos: -1 } }
]);

// 3. Ingreso total generado por parqueo en cada sede
db.parqueos.aggregate([
  { $match: { costo_total: { $ne: null } } },
  { $lookup: { from: "zonas", localField: "zona_id", foreignField: "_id", as: "zona_info" } },
  { $unwind: "$zona_info" },
  { $group: { _id: "$zona_info.sede_id", ingresos_totales: { $sum: "$costo_total" } } }
]);

// 4. Cliente que ha usado más veces el parqueadero
db.parqueos.aggregate([
  { $lookup: { from: "vehiculos", localField: "vehiculo_id", foreignField: "_id", as: "vehiculo_info" } },
  { $unwind: "$vehiculo_info" },
  { $group: { _id: "$vehiculo_info.cliente_id", visitas: { $sum: 1 } } },
  { $sort: { visitas: -1 } },
  { $limit: 1 }
]);

/*5. Historial de parqueos dado un cliente (Ejemplo genérico, requiere ObjectId real)
Reemplaza "ID_DEL_CLIENTE" con un ObjectId válido.
*/
db.vehiculos.aggregate([
  { $match: { cliente_id: ObjectId("ID_DEL_CLIENTE") } },
  { $lookup: { from: "parqueos", localField: "_id", foreignField: "vehiculo_id", as: "historial" } },
  { $unwind: "$historial" },
  { $project: { placa: 1, tipo: 1, entrada: "$historial.hora_entrada", salida: "$historial.hora_salida", costo: "$historial.costo_total" } }
]);

//6. Vehículos parqueados actualmente en cada sede
db.parqueos.aggregate([
  { $match: { hora_salida: null } },
  { $lookup: { from: "vehiculos", localField: "vehiculo_id", foreignField: "_id", as: "vehiculo" } },
  { $unwind: "$vehiculo" }
]);



db = db.getSiblingDB("campusParking")

1. // Parqueos registrados por sede en el último mes

db.parqueos.aggregate([
    { $match: { hora_entrada: { $gte: new Date(new Date().setMonth(new Date().getMonth() -1)) }} },
    { $lookup: { from: 'zonas', localField: 'zona_ID', foreignField: '_id', as: 'zonaInfo'}},
    { $unwind: '$zonaInfo'},
    { $group: { _id: '$zonaInfo.sede_ID', totalParqueos: { $sum: 1 } }}
])

2. // Zonas mas ocupadas en cada sede (basado en registros historicos)

db.parqueos.aggregate([
    { $group: { _id: '$zona_ID', totalUsos: { $sum: 1 } }},
    { $sort: { totalUsos: -1}}
])
3. // Ingreso total generado por parqueo en cada sede.

db.parqueos.aggregate([
    { $match: { costoTotal: { $ne: null}}},
    { $lookup: { from: 'zonas', localField: 'zona_ID', foreignField: '_id', as: 'zonaInfo'}},
    { $unwind: '$zonaInfo'},
    { $group: { _id: '$zonaInfo.sede_ID', ingresosTotales: { $sum: '$costoTotal' }}
    }
])
4. // Clientes que han usado mas veces el parqueadero.

db.parqueos.aggregate([
    { $lookup: { from: 'vehiculos', localField: 'vehiculo_ID', foreignField: '_id', as: 'vehiculoInfo'}}, 
    { $unwind: '$vehiculoInfo'},
    { $group: { _id: '$vehiculoInfo.cliente_ID', visitas: { $sum: 1}}},
    { $sort: { visitas: -1}},
    { $limit: 1}
])

5. // Que tipo de vehiculo es mas frecuente por sede?

db.parqueos.aggregate([
    { $match: { cliente_ID: ObjectId ('ID_DEL_CLIENTE') }},
    { $lookup: { from: 'parqueos', localField: '_id', foreignField: 'vehiculo_ID', as: "historial "}},
    { $unwind: '$historial'},
    { $project: { placa: 1, tipo: 1, entrada: '$historial.horaEntrada', salida: '$historial.horaSalida', costo: '$historial.costoTotal'} }
])


6. // En base a un cliente: Historial de parqueos incluyendo: ( fecha, sede, zona, tipo de vehiculo, tiempo y costo).

db.vehiculos.aggregate([
    { $match: { clienteID: ObjectId('ID_DEL_CLIENTE')}},
    { $lookup: { from: 'parqueos', localField: '_id', foreignField: 'vehiculo_ID', as: 'historial'}},
    { $unwind: '$historial'},
    { $project: { placa: 1, tipo: 1, entrada: '$historial.horaEntrada', salida: '$historial.horaSalida', costo: '$historial.costoTotal'}}

])
7. // Vehiculos parqueados actualmente en cada sede.

db.parqueosaggregate([
    { $match: { horaSalida: null }},
    { $lookup: { from: 'vehiculos', localField: 'vehiculo_ID', foreignField: '_id', as: 'vehiculo'}},
    { $unwind: '$vehiculo'}
])
8. // Listado de zonas que han excedido su capacidad de parqueo en algun momento.




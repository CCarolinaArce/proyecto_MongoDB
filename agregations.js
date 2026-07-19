db = db.getSiblingDB("campusParking")

// 1. Parqueos registrados por sede en el último mes
const ultimoMes = new Date()
ultimoMes.setMonth(ultimoMes.getMonth() - 1)

db.parqueos.aggregate([
    { $match: { horaEntrada: { $gte: ultimoMes } } },
    { $lookup: { from: 'zonas', localField: 'zonaID', foreignField: '_id', as: 'zonaInfo' } },
    { $unwind: '$zonaInfo' },
    { $group: { _id: '$zonaInfo.sede_ID', totalParqueos: { $sum: 1 } } }
])

// 2. Zonas mas ocupadas en cada sede (basado en registros historicos)
db.parqueos.aggregate([
    { $lookup: { from: 'zonas', localField: 'zonaID', foreignField: '_id', as: 'zonaInfo' } },
    { $unwind: '$zonaInfo' },
    { $group: { _id: { sede: '$zonaInfo.sede_ID', zona: '$zonaID' }, totalUsos: { $sum: 1 } } },
    { $sort: { totalUsos: -1 } }
])

// 3. Ingreso total generado por parqueo en cada sede.
db.parqueos.aggregate([
    { $match: { costoTotal: { $ne: null } } },
    { $lookup: { from: 'zonas', localField: 'zonaID', foreignField: '_id', as: 'zonaInfo' } },
    { $unwind: '$zonaInfo' },
    { $group: { _id: '$zonaInfo.sede_ID', ingresosTotales: { $sum: '$costoTotal' } } }
])

// 4. Clientes que han usado mas veces el parqueadero.
db.parqueos.aggregate([
    { $lookup: { from: 'vehiculos', localField: 'vehiculoID', foreignField: '_id', as: 'vehiculoInfo' } }, 
    { $unwind: '$vehiculoInfo' },
    { $group: { _id: '$vehiculoInfo.clienteID', visitas: { $sum: 1 } } },
    { $sort: { visitas: -1 } },
    { $limit: 5 } 
])

// 5. Que tipo de vehiculo es mas frecuente por sede?
db.parqueos.aggregate([
    { $lookup: { from: 'zonas', localField: 'zonaID', foreignField: '_id', as: 'zona' } },
    { $unwind: '$zona' },
    { $lookup: { from: 'vehiculos', localField: 'vehiculoID', foreignField: '_id', as: 'vehiculo' } },
    { $unwind: '$vehiculo' },
    { $group: { _id: { sede: '$zona.sede_ID', tipo: '$vehiculo.tipo' }, cantidad: { $sum: 1 } } },
    { $sort: { '_id.sede': 1, cantidad: -1 } }
])

// 6. En base a un cliente: Historial de parqueos incluyendo: ( fecha, sede, zona, tipo de vehiculo, tiempo y costo).

//PASO 1: Buscamos cliente dinamicamente:
const clienteMaria = db.usuarios.findOne({ cedula: '3001' }); 

//paso 2: fILTRAMOS y usamos ID del cliente en la agregacion:
db.vehiculos.aggregate([
    { $match: { clienteID: clienteMaria._id } },
    { $lookup: { from: 'parqueos', localField: '_id', foreignField: 'vehiculoID', as: 'historial' } },
    { $unwind: '$historial' },
    { $lookup: { from: 'zonas', localField: 'historial.zonaID', foreignField: '_id', as: 'zonaInfo' } },
    { $unwind: '$zonaInfo' },
    { $project: { 
        placa: 1,
        tipo: 1,
        sede: '$zonaInfo.sede_ID', 
        zona: '$zonaInfo.nombre',
        entrada: '$historial.horaEntrada',
        salida: '$historial.horaSalida', 
        costo: '$historial.costoTotal'
    }}
])

// 7. Vehiculos parqueados actualmente en cada sede.
db.parqueos.aggregate([
    { $match: { horaSalida: null } },
    { $lookup: { from: 'zonas', localField: 'zonaID', foreignField: '_id', as: 'zonaInfo' } },
    { $unwind: '$zonaInfo' },
    { $lookup: { from: 'vehiculos', localField: 'vehiculoID', foreignField: '_id', as: 'vehiculoInfo' } },
    { $unwind: '$vehiculoInfo' },
    { $group: { _id: '$zonaInfo.sede_ID', vehiculosActuales: { $push: '$vehiculoInfo.placa' } } }
])

// 8. Listado de zonas que han excedido su capacidad de parqueo en algun momento.
db.zonas.aggregate([
    { $lookup: { from: 'parqueos', let: { idDeLaZona: '$_id' }, pipeline: [
        { $match: { $expr: { $eq: ['$zonaID', '$$idDeLaZona'] }, horaSalida: null } }
    ], as: 'ocupacionActual' } },
    { $project: { nombre: 1, capacidadMaxima: 1, totalOcupado: { $size: '$ocupacionActual' } } },
    { $match: { $expr: { $gt: ['$totalOcupado', '$capacidadMaxima'] } } }
])

/* MONGO  -------> SQL
    match   ---    WHERE / HAVING, filtra las filas/documentos que cumplen una condicion antes de procesarlos.
    lookup  ---    JOIN, tambien mete los datos en un arreglo.
    unwind  ---    Desempaca los datos sacandolos del arreglo.
    group   ---    GROUP BY, Agrupa documentos por un campo en especifico el id por ejemplo.
    project ---    SELECT, Selecciona que colummnas/campos especificos mostrar. Esta es la estacion/etapa final. Da forma al documento de salida decidiedo que campos mostrar con 1, y cuales ocultar con 0 ó renombrar variables. 
    sort    ---    ORDER BY, Ordena los resultados desde 1 ascendente y -1 en descendente.
    limit   ---    LIMIT, Recorta la lista para mostrar solo los primeros resultados.
*/
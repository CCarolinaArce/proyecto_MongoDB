const dbName = 'campusParking'
db = db.getSiblingDB(dbName)

db.createCollection('usuarios', {
    validator: {
        $jsonSchema: {
            bsonType: 'object',
            required: ['nombre', 'cedula', 'rol'],
            properties: {
                nombre: { bsonType: 'string', description: 'Requerido y debe ser string'},
                cedula: { bsonType: 'string', description: 'Requerido y unico'},
                rol: { enum: ['Administrador', 'Empleado', 'Cliente'], description: 'Roles permitidos'},
                sedeID: { bsonType: 'objectId', description: 'Requerido solo para empleados'}
            }
        }
    }
})

db.usuarios.createIndex({ cedula: 1 }, { unique: true })

db.createCollection('vehiculos', {
    validator: {
        $jsonSchema: {
            bsonType: 'object',
            required: ['placa', 'tipo', 'clienteID'], 
            properties: {
                placa: { bsonType: 'string'},
                tipo: { enum: ['Carro', 'Moto', 'Bicicleta', 'Camion']},
                clienteID: { bsonType: 'objectId'} 
            }
        }
    }
})

db.createCollection('sedes', {
    validator: {
        $jsonSchema: {
            bsonType: 'object',
            required: ['nombre', 'ciudad'],
            properties: {
                nombre: { bsonType: 'string'},
                ciudad: { bsonType: 'string'}
            }
        }
    }
})

db.createCollection('zonas', {
    validator: {
        $jsonSchema: {
            bsonType: 'object',
            required: [ 'nombre', 'sede_ID', 'capacidadMaxima', 'cuposDisponibles', 'tarifaHora' ],
            properties: {
                nombre: { bsonType: 'string' },
                sede_ID: { bsonType: 'objectId'},
                capacidadMaxima: { bsonType: 'number'},
                cuposDisponibles: { bsonType: 'number' },
                tarifaHora: { bsonType: 'number'},
                tiposPermitidos: { bsonType: 'array', items: { bsonType: 'string'}}
            }
        }
    }
})

db.zonas.createIndex({ sede_ID: 1, nombre: 1})

db.createCollection('parqueos', { 
   validator: {
    $jsonSchema: {
        bsonType: 'object',
        required: [ 'vehiculoID', 'zonaID', 'horaEntrada'], 
        properties: {
            vehiculoID: { bsonType: 'objectId' }, 
            zonaID: { bsonType: 'objectId' },
            horaEntrada: { bsonType: 'date'},
            horaSalida: { bsonType: [ 'date', 'null']},
            costoTotal: { bsonType: [ 'number', 'null']}
        }
    }
   } 
})

db.parqueos.createIndex({ vehiculoID: 1}) 
db.parqueos.createIndex({ zonaID: 1, horaSalida: 1})
const dbName = 'campusParking'
db = db.getSiblingDB(dbName)

db.createCollection('usuarios', {
    validator: {
        $jsonSchema: {
            bsonType: 'object',
            required: ['nombre', 'cedula', 'rol'],
    //PORQUE EL TIPO DE DATOS DE CEDULA TIENE QUE SER STRING Y NO NUMERO???
            properties: {
                nombre: { bsonType: 'string', description: 'Requerido y debe ser string'},
                cedula: { bsonType: 'string', description: 'Requerido y unico'},
                rol: { enum: ['Administrador', 'Empleado', 'Cliente'], description: 'Roles permitidos'},
                sedeID: { bsonType: 'objectID', description: 'Requerido solo para empleados'}
            }
        }
    }
})

db.ususarios.createIndex({ cedula: 1 }, { unique: true })

db.createCollection('vehiculos', {
    validator: {
        $jsonSchema: {
            bsonType: 'object',
            required: ['placa', 'tipo', 'cliente_ID'],
            properties: {
                placa: { bsonType: 'string'},
                tipo: { enum: ['Carro', 'Moto', 'Bicicleta', 'Camion']},
                cliente_ID: { bysonType: 'objectID'}
            }
        }
    }
})

db.createCollection('sedes', {
    validator: {
        $jsonSchema: {
            bysonType: 'object',
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
                sede_ID: { bsonType: 'objectID'},
                capacidadMaxima: { bsonType: objec},
                cursosDisponibles: { bysonType: 'string' },
                tarifaHora: { bsonType: 'number'},
                tiposPermitidos: { bsonType: 'array', items: { bsonType: 'string'}}
            }
        }
    }
})

db.createIndex({ sede_ID: 1, nombre: 1})

db.createCollection('parqueos', { 
   validator: {
    $jsonSchema: {
        bsonType: 'object',
        required: [ 'vehiculo_ID', 'zona_ID', 'horaEntrada'],
        properties: {
            vehiculo_ID: { bsonType: 'objectID' },
            zona_ID: { bsonType: 'objectID' },
            horaEntrada: { bsonType: 'date'},
            horaSalida: { bsonType: [ 'date', 'null']},
            costoTotal: { bsonType: [ 'number', 'null']}
        }
    }
   } 
})

db.parqueos.createIndex({ vehiculo_ID: 1})
db.parqueos.createIndex({ zona_ID: 1, horaSalida: 1})


db = db.getSiblingDB('campusParking')

//Admin rol...
db.createRole({
    role: 'RolAdministrador', 
    privileges: [
        { resource: { db: 'campusParking', collection: "" },
          actions: [ 'find', 'insert', 'update', 'remove', 'createCollection', 'createIndex' ]}
        ],
    roles: []
})

//Rol de empleado...
db.createRole({
    role: 'RolEmpleado',
    privileges: [
        { resource: { db: 'campusParking', collection: 'usuarios' }, actions: [ 'find' ]}, 
        { resource: { db: 'campusParking', collection: 'vehiculos'}, actions: [ 'find' ]}, 
        { resource: { db: 'campusParking', collection: 'parqueos'}, actions:  [ 'find', 'insert', 'update' ]}
        ], 
    roles: []
})

//Rol de usuario...
db.createRole({
    role: 'RolUsuario',
    privileges: [
        { resource: { db: 'campusParking', collection: 'parqueos'}, actions: [ 'find' ]}, 
        { resource: { db: 'campusParking', collection: 'zonas'}, actions: [ 'find' ]}
    ],
    roles: []
})
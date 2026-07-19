db = db.getSiblingDB('campusParking')
 //Admin rol...

db.createRole({
    role: 'RolAdminatrador',
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
        { resource: { db: 'campusParking', collection: 'clientes' }, actions: [ 'find ']},
        { resouurce: { db: 'campusParking', collection: 'vehiculos'}, actions: [ 'find']},
        { resource: { db: 'campusParking', collection: 'parqueos'}, actions:  [ 'find', 'insert', 'update']}
        ], 
          roles: []
})

//Rol de usuario...
db.createRole({
    role: 'RoleUsuario',
    priveleges: [
        { resource: { db: 'campusParking', collection: 'parqueos'}, actions: [ 'find' ]},
        { resource: { db: 'campusParking', collection: 
        'zonas'}, actions: [ 'find' ]}
    ],
    roles: []
})


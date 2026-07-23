

// EL ROL PRINCIPAL 'adminGeneral' TIENE  EL PROPOSITO DE ADMINISTRAR LA BASE DE DATOS COMPLETA INCLUYENDO TODAS LAS COLECCIONES CREADAS, TENIENDO ACCESO A TODAS LAS ACCIONES SIGUIENTES:  filtrar, buscar, mostrar, leer, escribir, insertar, actualizar, crear colecciones e indices.  En conclusion este rol tiene accesso a todas las acciones permitidas para poder manipular la base de datos.
db.createRole({
    role: 'adminGeneral',
    privileges:  [
        { resources:  { db: 'campusParking', collection: ''}},
        { actions:  [ 'find', 'readWrite', 'insert', 'update', 'remove', 'createCollection', 'createIndex']}
    ],
    roles: []
})

// EL ROL SECUNDARIO 'empleadoZona' TIENE EL PROPOSITO DE ADMINISTRAR LAS COLECCIONES A LAS QUE TIENE ACCESO PARA PODER REALIZAR SU TRABAJO CORRECTAMENTE, POR LO TANTO TIENE PERMITIDAS LAS ACCIONES SIGUIENTES:  filtrar, buscar, mostrar, leer, escribir, insertar y actualizar limitandose de las acciones crear colecciones e indices que le corresponden solo al rol administrador General.
db.createRole({
    role:  'empleadoZona',
    privileges:  [
        { resources:  { db: 'campusParking', collection: 'zonas'}}, { actions: [ 'find', 'readWrite', 'insert', 'update']},
        { resources:  { db: 'campusParking', collection: 'sedes'}}, { actions:  [ 'find', 'readWrite', 'insert', 'update']},
        { resources: { db: 'campusParking', collection: 'vehiculos'}}, { actions: [ 'find', 'readWrite', 'insert', 'update']},
        { resources: { db: 'campusParking', collection: 'parqueos'}}, { actions: [ 'find', 'readWrite', 'insert', 'update']},
        { resources:  { db: 'campusParking', collection: 'parqueos'}}, { actions: [ 'find', 'readWrite', 'insert', 'update']}
    ],
    roles: []
})

// POR ULTIMO TENEMOS EL ROL 'clienteZona' QUE TIENE COMO PROPOSITO GARANTIZAR ACCESO A filtrar y leer unicamente  para poder tener acceso a sus propios movimientos en el parqueo ya que  no es necesario que tenga otras acciones permitidas como las de empleado: insertar, actualizar.
db.createROle({
    role: 'clienteZona',
    privileges:  [
        { resources: { db: 'campusParking', collection: 
            'zonas'}},
        { actions:  [ 'find']}
    ],
    roles: []
})

db.createUser(
    { 
        user: 'CarolinaAdmin',
        pwd:  'admin123',
        roles: [ { role: 'adminGeneral', db: 'campusParking' }]

    }
)

db.createUser(
    {
        user: 'PablitoEmployee',
        pwd: 'pablito123',
        roles: [ {role: 'empleadoZona', db: 'campusParking'}]
    }
)

db.createUser(
    {
        user: 'jorgeCliente',
        pwd: 'jorge123456',
        roles:  [ { role: 'clienteZona', db:
            'campusParking'
        }]
    }
)



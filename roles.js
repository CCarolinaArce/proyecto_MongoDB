// // roles.js
// db = db.getSiblingDB("campus_parking");
// // Rol Administrador
// db.createRole({
//   role: "RolAdministrador",
//   privileges: [
//     { resource: { db: "campus_parking", collection: "" }, actions: ["find", "insert", "update", "remove", "createCollection", "createIndex"] }
//   ],
//   roles: []
// });
// // Rol Empleado
// db.createRole({
//   role: "RolEmpleado",
//   privileges: [
//     { resource: { db: "campus_parking", collection: "clientes" }, actions: ["find"] },
//     { resource: { db: "campus_parking", collection: "vehiculos" }, actions: ["find"] },
//     { resource: { db: "campus_parking", collection: "parqueos" }, actions: ["find", "insert", "update"] }
//   ],
//   roles: []
// });
// // Rol Cliente
// db.createRole({
//   role: "RolCliente",
//   privileges: [
//     { resource: { db: "campus_parking", collection: "zonas" }, actions: ["find"] },
//     { resource: { db: "campus_parking", collection: "parqueos" }, actions: ["find"] }
//   ],
//   roles: []
// });
db = db.getSiblingDB('campusParking')
 //Admin rol...

db.createRole({
    role: 'RolAdminatrador',
    privileges: [{
            resource: { db: 'campusParking', collection: "" },
            actions: 
                [ 'find', 'insert', 'update', 'remove', 'createCollection', 'createIndex' ]
        }],
    roles: []
})



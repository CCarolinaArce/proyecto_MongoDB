db = db.getSiblingDB('campusParking')

//AQUI VAN 3 SEDES DISTINTAS.....
const sedes = db.sedes.insertMany([
    { nombre: 'Sede Norte', ciudad: 'Bogota'},
    { nombre: 'Sede Centro', ciudad: 'Medellin'},
    { nombre: 'Sede Sur', ciudad: 'Cali'}
])

const sedeNorteID = sedes.insertedIds[0]
const sedeCentroID = sedes.insertedIds[1]


//COMPLETAR HASTA 5 ZONAS POR SEDE....
const zonas = db.zonas.insertMany([
    { 
      nombre: 'Zona A - Carros', 
      sede_ID: sedeNorteID, 
      capacidadMaxima: 50,
      cuposDisponibles: 45,
      tarifaHora: 5000,
      tiposPermitidos: ['Carro', 'Camion'] 
    },
    {
      nombre: 'Zona B - Motos',
      sede_ID: sedeNorteID,
      capacidadMaxima: 30,
      cuposDisponibles: 30,
      tarifaHora: 2000,
      tiposPermitidos: [ 'Moto']
    },
    {
      nombre: 'Zona VIP',
      sede_ID: sedeCentroID,
      capacidadMaxima: 20,
      cuposDisponibles: 20,
      tarifaHora: 8000, 
      tiposPermitidos: ['Carro']  
    }
])

const zonaCarrosID = zonas.insertedIds[0]


//COMPLETAR HASTA 15 CLIENTES CON SUS DATOS COMPLETOS Y 10 EMPLEADOS DISTRIBUIDOS ENTERE LAS SEDES....
const usuarios = db.usuarios.insertMany([
    {
        nombre: 'Admin Principal',
        cedula: '1001', 
        rol: 'Administrador'
    },
    {
        nombre: 'Juan Empleado',
        cedula: '2001',
        rol: 'Empleado',
        sede_ID: sedeNorteID
    },
    {
        nombre: 'Maria Cliente',
        cedula: '3001',
        rol: 'Cliente'
    }
])

const clienteMariaID = usuarios.insertedIds[2]


//COMPLETAR HASTA 30 VEHICULOS DE AL MENOS 4 TIPOS DIFERENTES, ASIGNADOS A LOS CLIENTES....
const vehiculos = db.vehiculos.insertMany([
    {
        placa: 'ABC123',
        tipo: 'Carro',
        clienteID: clienteMariaID  
    },
    {
        placa: 'XYZ789',
        tipo: 'Moto',
        clienteID: clienteMariaID  
    }
]) 

const carroMariaID = vehiculos.insertedIds[0]


//ACA VAN 50 REGISTROS DE PARQUEOS, MEZCLANDO SEDES, ZONAS Y TIPOS DE VEHICULOS.  ALGUNOS DEBEN ESTAR ACTUALMENTE ACTIVOS (SIN HORA DE SALIDA).....
db.parqueos.insertMany([
   // historico ( ya salio)
    {
        vehiculoID: carroMariaID, 
        zonaID: zonaCarrosID, 
        horaEntrada: new Date("2023-10-01T08:00:00Z"),
        horaSalida: new Date("2023-10-01T10:00:00Z"), 
        costoTotal: 10000 
    },
  // Activo (Aún parqueado)
    {
        vehiculoID: carroMariaID, 
        zonaID: zonaCarrosID,
        horaEntrada: new Date(),
        horaSalida: null, 
        costoTotal: null
    }
])

// Indices optimizadores...
db.parqueos.createIndex({ horaEntrada: -1 })
db.parqueos.createIndex({ horaSalida: 1, zonaID: 1 })
db.parqueos.createIndex({ costoTotal: 1 })
db.parqueos.createIndex({ vehiculoID: 1 }) 

db.vehiculos.createIndex({ clienteID: 1 }) 
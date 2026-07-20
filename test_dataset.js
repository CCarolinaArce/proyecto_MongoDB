db = db.getSiblingDB('campusParking')

//AQUI VAN 3 SEDES DISTINTAS.....
const sedes = db.sedes.insertMany([
    { nombre: 'Sede Norte', ciudad: 'Bogota'},
    { nombre: 'Sede Centro', ciudad: 'Medellin'},
    { nombre: 'Sede Sur', ciudad: 'Cali'}
])

const sedeNorteID = sedes.insertedIds[0]
const sedeCentroID = sedes.insertedIds[1]
const sedeSurID = sedes.insertedIds[2]

//COMPLETAR HASTA 5 ZONAS POR SEDE....
const zonas = db.zonas.insertMany([
    // Zonas Sede Norte
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
      tiposPermitidos: ['Moto'] 
    },
    { 
      nombre: 'Zona C - Mixta', 
      sede_ID: sedeNorteID, 
      capacidadMaxima: 20, 
      cuposDisponibles: 20, 
      tarifaHora: 3000, 
      tiposPermitidos: ['Carro', 'Moto'] 
    },
    { 
      nombre: 'Zona D - VIP', 
      sede_ID: sedeNorteID, 
      capacidadMaxima: 10, 
      cuposDisponibles: 10, 
      tarifaHora: 8000, 
      tiposPermitidos: ['Carro'] 
    },
    { 
      nombre: 'Zona E - Bicis', 
      sede_ID: sedeNorteID, 
      capacidadMaxima: 40, 
      cuposDisponibles: 40, 
      tarifaHora: 500, 
      tiposPermitidos: ['Bicicleta'] 
    },

    // Zonas Sede Centro
    { 
      nombre: 'Zona VIP', 
      sede_ID: sedeCentroID, 
      capacidadMaxima: 20, 
      cuposDisponibles: 20, 
      tarifaHora: 8000, 
      tiposPermitidos: ['Carro'] 
    },
    { 
      nombre: 'Zona Central A', 
      sede_ID: sedeCentroID, 
      capacidadMaxima: 40, 
      cuposDisponibles: 40, 
      tarifaHora: 6000, 
      tiposPermitidos: ['Carro'] 
    },
    { 
      nombre: 'Zona Central B', 
      sede_ID: sedeCentroID, 
      capacidadMaxima: 50, 
      cuposDisponibles: 50, 
      tarifaHora: 2500, 
      tiposPermitidos: ['Moto'] 
    },
    { 
      nombre: 'Zona Central C', 
      sede_ID: sedeCentroID, 
      capacidadMaxima: 30, 
      cuposDisponibles: 30, 
      tarifaHora: 500, 
      tiposPermitidos: ['Bicicleta'] 
    },
    { 
      nombre: 'Zona Central D', 
      sede_ID: sedeCentroID, 
      capacidadMaxima: 5, 
      cuposDisponibles: 5, 
      tarifaHora: 10000, 
      tiposPermitidos: ['Camion'] 
    },

    // Zonas Sede Sur
    { 
      nombre: 'Zona Sur A', 
      sede_ID: sedeSurID, 
      capacidadMaxima: 60, 
      cuposDisponibles: 60, 
      tarifaHora: 4500, 
      tiposPermitidos: ['Carro'] 
    },
    { 
      nombre: 'Zona Sur B', 
      sede_ID: sedeSurID, 
      capacidadMaxima: 40, 
      cuposDisponibles: 40, 
      tarifaHora: 1500, 
      tiposPermitidos: ['Moto'] 
    },
    { 
      nombre: 'Zona Sur C', 
      sede_ID: sedeSurID, 
      capacidadMaxima: 20, 
      cuposDisponibles: 20, 
      tarifaHora: 500, 
      tiposPermitidos: ['Bicicleta'] 
    },
    { 
      nombre: 'Zona Sur D', 
      sede_ID: sedeSurID, 
      capacidadMaxima: 25, 
      cuposDisponibles: 25, 
      tarifaHora: 3000, 
      tiposPermitidos: ['Carro', 'Moto'] 
    },
    { 
      nombre: 'Zona Sur VIP', 
      sede_ID: sedeSurID, 
      capacidadMaxima: 15, 
      cuposDisponibles: 15, 
      tarifaHora: 7000, 
      tiposPermitidos: ['Carro'] 
    }
])

const zonaCarrosID = zonas.insertedIds[0]

//COMPLETAR HASTA 15 CLIENTES CON SUS DATOS COMPLETOS Y 10 EMPLEADOS DISTRIBUIDOS ENTERE LAS SEDES....
const usuarios = db.usuarios.insertMany([
    { nombre: 'Eduardo Mendoza', cedula: '1001', rol: 'Administrador' },
    
    { nombre: 'Juan Perez', cedula: '2001', rol: 'Empleado', sede_ID: sedeNorteID },
    { nombre: 'Ana Morales', cedula: '2002', rol: 'Empleado', sede_ID: sedeNorteID },
    { nombre: 'Luis Castillo', cedula: '2003', rol: 'Empleado', sede_ID: sedeNorteID },
    { nombre: 'Carlos Gomez', cedula: '2004', rol: 'Empleado', sede_ID: sedeCentroID },
    { nombre: 'Diana Torres', cedula: '2005', rol: 'Empleado', sede_ID: sedeCentroID },
    { nombre: 'Elena Ruiz', cedula: '2006', rol: 'Empleado', sede_ID: sedeCentroID },
    { nombre: 'Fernando Castro', cedula: '2007', rol: 'Empleado', sede_ID: sedeCentroID },
    { nombre: 'Gabriela Soto', cedula: '2008', rol: 'Empleado', sede_ID: sedeSurID },
    { nombre: 'Hugo Pineda', cedula: '2009', rol: 'Empleado', sede_ID: sedeSurID },
    { nombre: 'Irene Vega', cedula: '2010', rol: 'Empleado', sede_ID: sedeSurID },

    { nombre: 'Maria Coronado', cedula: '3001', rol: 'Cliente' },
    { nombre: 'Pedro Sevilla', cedula: '3002', rol: 'Cliente' },
    { nombre: 'Sofia Rivas', cedula: '3003', rol: 'Cliente' },
    { nombre: 'Andres Ocampo', cedula: '3004', rol: 'Cliente' },
    { nombre: 'Laura Suarez', cedula: '3005', rol: 'Cliente' },
    { nombre: 'Camilo Vargas', cedula: '3006', rol: 'Cliente' },
    { nombre: 'Paula Mejia', cedula: '3007', rol: 'Cliente' },
    { nombre: 'Jorge Rojas', cedula: '3008', rol: 'Cliente' },
    { nombre: 'Lucia Bernal', cedula: '3009', rol: 'Cliente' },
    { nombre: 'Diego Ortiz', cedula: '3010', rol: 'Cliente' },
    { nombre: 'Valeria Rios', cedula: '3011', rol: 'Cliente' },
    { nombre: 'Esteban Franco', cedula: '3012', rol: 'Cliente' },
    { nombre: 'Camila Salazar', cedula: '3013', rol: 'Cliente' },
    { nombre: 'Oscar Luna', cedula: '3014', rol: 'Cliente' },
    { nombre: 'Natalia Silva', cedula: '3015', rol: 'Cliente' }
])

const clienteMariaID = usuarios.insertedIds[11]

//COMPLETAR HASTA 30 VEHICULOS DE AL MENOS 4 TIPOS DIFERENTES, ASIGNADOS A LOS CLIENTES....
let vehiculosData = [];
const tipos = ['Carro', 'Moto', 'Bicicleta', 'Camion'];

for (let i = 0; i < 15; i++) {
    let idClienteActual = usuarios.insertedIds[11 + i];
    vehiculosData.push({ placa: `ABC10${i}`, tipo: tipos[i % 4], clienteID: idClienteActual });
    vehiculosData.push({ placa: `XYZ90${i}`, tipo: tipos[(i + 1) % 4], clienteID: idClienteActual });
}

const vehiculos = db.vehiculos.insertMany(vehiculosData)
const carroMariaID = vehiculos.insertedIds[0]

//ACA VAN 50 REGISTROS DE PARQUEOS, MEZCLANDO SEDES, ZONAS Y TIPOS DE VEHICULOS.  ALGUNOS DEBEN ESTAR ACTUALMENTE ACTIVOS (SIN HORA DE SALIDA).....
let parqueosData = [];
let vIds = Object.values(vehiculos.insertedIds);
let zIds = Object.values(zonas.insertedIds);

const zonasMapeadas = [
    { id: zIds[0], t: 5000, tipos: ['Carro', 'Camion'] },
    { id: zIds[1], t: 2000, tipos: ['Moto'] },
    { id: zIds[2], t: 3000, tipos: ['Carro', 'Moto'] },
    { id: zIds[3], t: 8000, tipos: ['Carro'] },
    { id: zIds[4], t: 500, tipos: ['Bicicleta'] },
    { id: zIds[5], t: 8000, tipos: ['Carro'] },
    { id: zIds[6], t: 6000, tipos: ['Carro'] },
    { id: zIds[7], t: 2500, tipos: ['Moto'] },
    { id: zIds[8], t: 500, tipos: ['Bicicleta'] },
    { id: zIds[9], t: 10000, tipos: ['Camion'] },
    { id: zIds[10], t: 4500, tipos: ['Carro'] },
    { id: zIds[11], t: 1500, tipos: ['Moto'] },
    { id: zIds[12], t: 500, tipos: ['Bicicleta'] },
    { id: zIds[13], t: 3000, tipos: ['Carro', 'Moto'] },
    { id: zIds[14], t: 7000, tipos: ['Carro'] }
];

for (let i = 0; i < 50; i++) {
    let vehiculoActual = vehiculosData[i % 30];
    let vId = vIds[i % 30];
    let zonaPermitida = zonasMapeadas.find(z => z.tipos.includes(vehiculoActual.tipo));
    
    let fEntrada = new Date();
    fEntrada.setDate(fEntrada.getDate() - (i % 10)); 
    fEntrada.setHours(8 + (i % 8)); 
    
    if (i < 15) {
        parqueosData.push({
            vehiculoID: vId,
            zonaID: zonaPermitida.id,
            horaEntrada: fEntrada,
            horaSalida: null,
            costoTotal: null
        });
    } else {
        let hEstadia = 2 + (i % 5);
        let fSalida = new Date(fEntrada);
        fSalida.setHours(fEntrada.getHours() + hEstadia);
        
        parqueosData.push({
            vehiculoID: vId,
            zonaID: zonaPermitida.id,
            horaEntrada: fEntrada,
            horaSalida: fSalida,
            costoTotal: hEstadia * zonaPermitida.t
        });
    }
}

db.parqueos.insertMany(parqueosData);

// Indices optimizadores...
db.parqueos.createIndex({ horaEntrada: -1 })
db.parqueos.createIndex({ horaSalida: 1, zonaID: 1 })
db.parqueos.createIndex({ costoTotal: 1 })
db.parqueos.createIndex({ vehiculoID: 1 }) 
db.vehiculos.createIndex({ clienteID: 1 })
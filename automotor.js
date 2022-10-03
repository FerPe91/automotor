"use strict";
exports.__esModule = true;
var fs = require("fs");
var readFileSync = require("readline-sync");
var Auto = /** @class */ (function () {
    function Auto(marca, modelo, año, patente) {
        this.marca = marca;
        this.modelo = modelo;
        this.año = año;
        this.patente = patente;
    }
    Auto.prototype.getMarca = function () {
        return this.marca;
    };
    Auto.prototype.getModelo = function () {
        return this.modelo;
    };
    Auto.prototype.getAño = function () {
        return this.año;
    };
    Auto.prototype.getPatente = function () {
        return this.patente;
    };
    Auto.prototype.setMarca = function (valor) {
        this.marca = valor;
        return this.marca;
    };
    Auto.prototype.setModelo = function (valor) {
        this.modelo = valor;
        return this.modelo;
    };
    Auto.prototype.setAño = function (valor) {
        this.año = valor;
        return this.año;
    };
    Auto.prototype.setPatente = function (valor) {
        this.patente = valor;
        return this.patente;
    };
    Auto.prototype.mostrarInfo = function () {
        return "Auto ".concat(this.marca, ", modelo: ").concat(this.modelo, ", a\u00F1o ").concat(this.año, ", patente ").concat(this.patente);
    };
    return Auto;
}());
var RegistroAutomotor = /** @class */ (function () {
    function RegistroAutomotor(listaAutos) {
        this.listaAutos = listaAutos;
    }
    RegistroAutomotor.prototype.getListaAutos = function () {
        return this.listaAutos;
    };
    RegistroAutomotor.prototype.setListaAutos = function (arreglo) {
        this.listaAutos = arreglo;
    };
    RegistroAutomotor.prototype.mostrarAutos = function () {
        var cadena = "";
        for (var i = 0; i < arrayAuto.length; i++) {
            cadena += i + 1 + ") " + arrayAuto[i].getMarca() + "-" + arrayAuto[i].getModelo() + "-" + arrayAuto[i].getAño() + "-" + arrayAuto[i].getPatente() + "\n";
        }
        console.log(cadena);
    };
    RegistroAutomotor.prototype.borrarAuto = function (position) {
        console.log("-------------------------LISTADO---------------------------");
        console.log("SE ELIMINO" + arrayAuto[position].getMarca() + "-" + arrayAuto[position].getModelo() + "-" + arrayAuto[position].getAño() + "-" + arrayAuto[position].getPatente());
        this.listaAutos.splice(position, 1);
    };
    //para dar de alta hice lo mismo que en modificar Auto pero esta vez agregando nuevoAuto al array original
    RegistroAutomotor.prototype.darDeAlta = function (listaAutos) {
        console.log("---------------DAR DE ALTA-----------------------");
        var marca = readFileSync.question("Ingrese el MARCA: ");
        var modelo = readFileSync.question("Ingrese el MODELO: ");
        var año = Number(readFileSync.question("Ingrese el ANIO: "));
        var patente = readFileSync.question("Ingrese la PATENTE: ");
        var nuevoAuto = new Auto(marca, modelo, año, patente);
        listaAutos.push(nuevoAuto);
    };
    return RegistroAutomotor;
}());
var GestorDeArchivos = /** @class */ (function () {
    function GestorDeArchivos(txtFileLocation) {
        var archivoTxt = fs.readFileSync(txtFileLocation, 'utf-8');
        this.arregloString = archivoTxt.split(';'); //vamoS a tener nuestro "objetos" separados por ;
    }
    GestorDeArchivos.prototype.mostrarArreglo = function () {
        console.log(this.arregloString);
    };
    GestorDeArchivos.prototype.getArregloString = function () {
        return this.arregloString;
    };
    return GestorDeArchivos;
}());
function modificarAuto(listaAutos, auto) {
    //editar un auto en el arreglo
    console.log("---------------MODIFICAR AUTO-----------------------");
    registro1.mostrarAutos();
    console.log("Opciones a modificar:\n 1)MARCA \n2)MODELO \n3)ANIO \n4)PATENTE");
    var op = Number(readFileSync.question("INGRESE LA OPCION: "));
    switch (op) {
        case 1:
            var marca = readFileSync.question("Ingrese el MARCA: ");
            arrayAuto[auto].setMarca(marca);
            break;
        case 2:
            var modelo = readFileSync.question("Ingrese el MODELO: ");
            arrayAuto[auto].setModelo(modelo);
            break;
        case 3:
            var año = Number(readFileSync.question("Ingrese el AÑO: "));
            arrayAuto[auto].setAño(año);
            break;
        case 4:
            var patente = readFileSync.question("Ingrese la PATENTE: ");
            arrayAuto[auto].setPatente(patente);
            break;
        default:
            break;
    }
}
function crearAuto(vehiculo, arrayVehiculo) {
    var propiedadAuto = vehiculo.split(',');
    var marca = propiedadAuto[0];
    var modelo = propiedadAuto[1];
    var año = Number(propiedadAuto[2]);
    var patente = propiedadAuto[3];
    var nuevoAuto = new Auto(marca, modelo, año, patente);
    //inserto el elemento de tipo Auto en el arreglo recibido
    arrayVehiculo.push(nuevoAuto);
}
//Inicio programa
var datos = new GestorDeArchivos('autos.txt'); // devuelve un arreglo de strings con "elementos" de Autos.
var arrayAuto = [];
for (var i = 0; i < datos.getArregloString().length; i++) {
    //Creo auto, uno por uno, leyendo el txt
    crearAuto(datos.getArregloString()[i], arrayAuto);
}
var registro1 = new RegistroAutomotor(arrayAuto);
console.log("--------------AUTOS REGISTRADOS----------------");
console.log("lista de vehiculos");
registro1.mostrarAutos();
console.log("MENU:\n1)DAR DE ALTA \n2)BORRAR REGISTRO \n3)MODIFICAR REGISTRO \n4)VER LISTADO  \n0)SALIR");
var op = Number(readFileSync.question("INGRESE LA OPCION: "));
while (op <= 4) {
    switch (op) {
        case 1:
            registro1.darDeAlta(arrayAuto);
            registro1.mostrarAutos();
            break;
        case 2:
            registro1.mostrarAutos();
            var valor = Number(readFileSync.question("INGRESE LA OPCION: "));
            registro1.borrarAuto(valor - 1);
            break;
        case 3:
            registro1.mostrarAutos();
            var valor2 = Number(readFileSync.question("INGRESE LA OPCION: "));
            modificarAuto(arrayAuto, valor2 - 1);
            break;
        case 4:
            console.log("-------------------------LISTADO---------------------------");
            registro1.mostrarAutos();
            break;
        default:
            break;
    }
    console.log("------------------------------------------------------------------");
    console.log("MENU:\n1)DAR DE ALTA \n2)BORRAR REGISTRO \n3)MODIFICAR REGISTRO \n4)VER LISTADO  \n0)SALIR");
    op = Number(readFileSync.question("INGRESE LA OPCION: "));
}

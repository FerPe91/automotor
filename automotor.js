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
    Auto.prototype.getPatente = function () {
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
        console.log(this.listaAutos);
    };
    RegistroAutomotor.prototype.borrarAuto = function (position) {
        var autoBorrado = +this.listaAutos.splice(position, 1);
    };
    RegistroAutomotor.prototype.modificarAuto = function (listaAutos) {
        //editar un auto en el arreglo
        console.log("Opciones a modificar:\n 1)MARCA \n2)MODELO \n3)ANIO \n4) PATENTE");
        var op = Number(readFileSync.question("INGRESE LA OPCION: "));
        switch (op) {
            case 1:
                console.log();
                var marca = readFileSync.question("Ingrese el MARCA: ");
                break;
            case 2:
                var modelo = readFileSync.question("Ingrese el MODELO: ");
                break;
            case 3:
                var año = Number(readFileSync.question("Ingrese el AÑO: "));
                break;
            case 4:
                var patente = readFileSync.question("Ingrese la PATENTE: ");
                break;
            default:
                // 
                break;
        }
    };
    //para dar de alta hice lo mismo que en modificar Auto pero esta vez agregando nuevoAuto al array original
    RegistroAutomotor.prototype.darDeAlta = function (listaAutos) {
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
        this.arregloString = archivoTxt.split(';'); //vamos a tener nuestro "objetos" separados por ;
    }
    GestorDeArchivos.prototype.mostrarArreglo = function () {
        console.log(this.arregloString);
    };
    GestorDeArchivos.prototype.getArregloString = function () {
        return this.arregloString;
    };
    return GestorDeArchivos;
}());
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
console.log(arrayAuto);
//registro1.borrarAuto(0)
console.log("--------------AUTOS REGISTRADOS----------------");
//console.log(arrayAuto)
registro1.modificarAuto(arrayAuto);
console.log(arrayAuto);
registro1.darDeAlta(arrayAuto);
console.log(arrayAuto);

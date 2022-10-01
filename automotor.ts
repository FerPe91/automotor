import * as fs from 'fs';
import * as readFileSync from 'readline-sync'
​
class Auto{
    public marca:string;
    public modelo:string;
    public año:number;
    public patente:string;
    
    public constructor (marca:string, modelo:string, año:number, patente:string){
        this.marca=marca
        this.modelo=modelo
        this.año=año
        this.patente=patente
    }

    public getMarca(){
        return this.marca
    }


    public getPatente(){
        return this.patente
    }


    public mostrarInfo(){
        return `Auto ${this.marca}, modelo: ${this.modelo}, año ${this.año}, patente ${this.patente}`
    }

}

class RegistroAutomotor{
    private listaAutos: Array<Auto>;
    public constructor (listaAutos:Array<Auto>){
        this.listaAutos=listaAutos
    }
    public getListaAutos(){
        return this.listaAutos
    }
    public setListaAutos(arreglo: Array<Auto>){
        this.listaAutos = arreglo;
    }

    public mostrarAutos() {
        console.log(this.listaAutos)
    }
    public borrarAuto(position: number) :void {
        let autoBorrado =+ this.listaAutos.splice(position,1)
    }
    public modificarAuto(listaAutos:Array<Auto>){
        //editar un auto en el arreglo
        console.log("Opciones a modificar:\n 1)MARCA \n2)MODELO \n3)ANIO \n4)PATENTE")
        let op: number = Number(readFileSync.question("INGRESE LA OPCION: "));

        switch ( op ) {
            case 1:
                console.log()
                let marca: string = readFileSync.question("Ingrese el MARCA: ")
                break;
            case 2:
                let modelo = readFileSync.question("Ingrese el MODELO: ");
                break;
            case 3:
                let año: number = Number(readFileSync.question("Ingrese el AÑO: "));
                break;
            case 4:
                let patente: string = readFileSync.question("Ingrese la PATENTE: ");
                break;
            default: 
                // 
                break;
        }    
        
    }


    //para dar de alta hice lo mismo que en modificar Auto pero esta vez agregando nuevoAuto al array original

    public darDeAlta(listaAutos:Array<Auto>){
        let marca: string = readFileSync.question("Ingrese el MARCA: ")
        let modelo = readFileSync.question("Ingrese el MODELO: ");
        let año: number = Number(readFileSync.question("Ingrese el ANIO: "));
        let patente: string = readFileSync.question("Ingrese la PATENTE: ");
        let nuevoAuto: Auto = new Auto(marca,modelo,año,patente);
        listaAutos.push(nuevoAuto);

    }

}

class GestorDeArchivos {

    private arregloString: string[];

    constructor(txtFileLocation: string) {

        let archivoTxt: string = fs.readFileSync(txtFileLocation, 'utf-8');
        this.arregloString = archivoTxt.split(';');  //vamos a tener nuestro "objetos" separados por ;
        
    }


    public mostrarArreglo(): void {
        console.log(this.arregloString);
    }

    public getArregloString(): string[] {
        return this.arregloString;
    } 

}


function crearAuto(vehiculo:string, arrayVehiculo: Array<Auto>): void {

  
    let propiedadAuto = vehiculo.split(',');
    let marca: string = propiedadAuto[0];
    let modelo: string = propiedadAuto[1];
    let año: number = Number(propiedadAuto[2]);
    let patente: string = propiedadAuto[3];
    let nuevoAuto : Auto = new Auto(marca,modelo,año, patente);

    //inserto el elemento de tipo Auto en el arreglo recibido
    arrayVehiculo.push(nuevoAuto);
}

//Inicio programa
let datos: GestorDeArchivos = new GestorDeArchivos('autos.txt'); // devuelve un arreglo de strings con "elementos" de Autos.
let arrayAuto: Array<Auto> = [];

for (let i: number = 0; i < datos.getArregloString().length; i++) {

    //Creo auto, uno por uno, leyendo el txt
    crearAuto(datos.getArregloString()[i], arrayAuto);

}

let registro1 :RegistroAutomotor = new RegistroAutomotor(arrayAuto)
console.log(arrayAuto)
//registro1.borrarAuto(0)
console.log("--------------AUTOS REGISTRADOS----------------")
//console.log(arrayAuto)
registro1.modificarAuto(arrayAuto)
console.log(arrayAuto)
registro1.darDeAlta(arrayAuto)
console.log(arrayAuto)

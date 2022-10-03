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

    public getModelo(){
        return this.modelo
    }

    public getAño(){
        return this.año
    }
    public getPatente(){
        return this.patente
    }

    public setMarca(valor:string){
        this.marca=valor
        return this.marca
    }

    public setModelo(valor:string){
        this.modelo=valor
        return this.modelo
    }

    public setAño(valor:number){
        this.año=valor
        return this.año
    }
    public setPatente(valor:string){
        this.patente=valor
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
        let cadena:string=""
        for(let i=0;i<arrayAuto.length; i++){
            cadena+= i+1 +") "+ arrayAuto[i].getMarca()+"-"+ arrayAuto[i].getModelo()+"-"+ arrayAuto[i].getAño()+"-"+ arrayAuto[i].getPatente()+"\n"
        }
        console.log(cadena)
    }
    public borrarAuto(position: number) :void {
        console.log("-------------------------LISTADO---------------------------")
        console.log("SE ELIMINO"+arrayAuto[position].getMarca()+"-"+ arrayAuto[position].getModelo()+"-"+ arrayAuto[position].getAño()+"-"+ arrayAuto[position].getPatente())
        this.listaAutos.splice(position,1)
    }
    
    //para dar de alta hice lo mismo que en modificar Auto pero esta vez agregando nuevoAuto al array original

    public darDeAlta(listaAutos:Array<Auto>){
        console.log("---------------DAR DE ALTA-----------------------")
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
        this.arregloString = archivoTxt.split(';');  //vamoS a tener nuestro "objetos" separados por ;
        
    }


    public mostrarArreglo(): void {
        console.log(this.arregloString);
    }

    public getArregloString(): string[] {
        return this.arregloString;
    } 

}



function modificarAuto(listaAutos:Array<Auto>, auto:number){
    //editar un auto en el arreglo
    console.log("---------------MODIFICAR AUTO-----------------------")
    registro1.mostrarAutos()
    console.log("Opciones a modificar:\n 1)MARCA \n2)MODELO \n3)ANIO \n4)PATENTE")
    let op: number = Number(readFileSync.question("INGRESE LA OPCION: "));
    switch ( op ) {
        case 1:
            let marca: string = readFileSync.question("Ingrese el MARCA: ")
            arrayAuto[auto].setMarca(marca)
            break;
        case 2:
            let modelo = readFileSync.question("Ingrese el MODELO: ");
            arrayAuto[auto].setModelo(modelo)
            break;
        case 3:
            let año: number = Number(readFileSync.question("Ingrese el AÑO: "));
            arrayAuto[auto].setAño(año)
            break;
        case 4:
            let patente: string = readFileSync.question("Ingrese la PATENTE: ");
            arrayAuto[auto].setPatente(patente)
            break;
        default:  
            break;
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

console.log("--------------AUTOS REGISTRADOS----------------")
console.log("lista de vehiculos")
registro1.mostrarAutos()

console.log("MENU:\n1)DAR DE ALTA \n2)BORRAR REGISTRO \n3)MODIFICAR REGISTRO \n4)VER LISTADO  \n0)SALIR")
let op: number = Number(readFileSync.question("INGRESE LA OPCION: "));
while(op<=4){
    switch ( op ) {
        case 1:
            registro1.darDeAlta(arrayAuto)
            registro1.mostrarAutos()
            break
        case 2:
            registro1.mostrarAutos()
            let valor: number = Number(readFileSync.question("INGRESE LA OPCION: "));
            registro1.borrarAuto(valor-1)
            break
        case 3:
            registro1.mostrarAutos()
            let valor2: number = Number(readFileSync.question("INGRESE LA OPCION: "));
            modificarAuto(arrayAuto,valor2-1)
            break
        case 4:
            console.log("-------------------------LISTADO---------------------------")
            registro1.mostrarAutos()
            break
        default:  
            break;
    }
    console.log("------------------------------------------------------------------")
    console.log("MENU:\n1)DAR DE ALTA \n2)BORRAR REGISTRO \n3)MODIFICAR REGISTRO \n4)VER LISTADO  \n0)SALIR")
    op = Number(readFileSync.question("INGRESE LA OPCION: "));
}



let input = document.getElementById("text-input");
let resultado = document.getElementById("result");
let boton = document.getElementById("check-btn");
let arreglo = [];
let arreglo2 = [];

function validar(palabra){
    const palabraLower = palabra.toLowerCase();
    let regex = /[,./()_-\s]/g;
    const nuevaPalabra = palabraLower.replace(regex,"");

    for(const letra of nuevaPalabra){
        arreglo.push(letra)
        arreglo2.unshift(letra);
    }
    let esPalindromo = true;

    for(let i = 0; i < arreglo.length;i++){
        if(arreglo[i] !== arreglo2[i]){
            esPalindromo = false;
        }
    }

    if (esPalindromo){
        return true;
    }else{
        return false;
    }

}


console.log(validar("never odd or even"))
console.log(arreglo);
console.log(arreglo2)
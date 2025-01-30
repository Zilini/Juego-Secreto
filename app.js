//DOM = Document Object Model permite conectar con HTML
//CamelCase = Una función con varias palabras y cada palabra con letra matuscula al inicio
/*let titulo = document.querySelector('h1');
titulo.innerHTML = 'Juego del Número Secreto'; // Asigna nombre al título
let parrafo = document.querySelector('p');
parrafo.innerHTML = 'Ingresa un número del 1 al 10.';// Asigna el texto del parrafo*/
let listaNumeroSorteados = [];
let numeroMaximo = 10;
let numeroSecreto = 0;
let intentos = 0;

//console.log(numeroSecreto);

function asignarTextoElemento(elemento, texto){
    let elementoHTML = document.querySelector(elemento);
    elementoHTML.innerHTML = texto;
    return;
}

function verificarIntento() {
    let numeroUsuario = parseInt(document.getElementById('valorUsuario').value);// parseInt fuerza al string a convertirse en número
    //console.log(typeof(numeroUsuario));// Verifica el tipo de dato ingresado al input
    //console.log(numeroSecreto === numeroUsuario);// triple igual compara el valor tanto en su tipo como valor
    
    if(numeroUsuario === numeroSecreto) {
        asignarTextoElemento('p', `Acertaste el número en ${intentos} ${(intentos === 1) ? 'intento.' : 'intentos.'}`);
        document.getElementById('reiniciar').removeAttribute('disabled');
        document.querySelector('#intentar').setAttribute('disabled', 'true');//Deshabilita botón de intentar despues de acertar.
    } else {
        //Si el usuario no acertó.
        if (numeroUsuario > numeroSecreto) {
            asignarTextoElemento('p', 'El número secreto es menor.');
        } else {
            asignarTextoElemento('p', 'El número secreto es mayor.');
        }
        intentos ++;
        limpiarCaja();
    }
    return;
}

function limpiarCaja(){
    /*Metodo 1.
    let valorCaja =document.querySelector('#valorUsuario');
    valorCaja.value = '';*/

    document.querySelector('#valorUsuario').value = '';
}

function generarNumeroSecreto() {
    let numeroGenerado = Math.floor(Math.random()*numeroMaximo+1);

    console.log(numeroGenerado);
    console.log(listaNumeroSorteados);
    //Si ya sorteamos todos los números
    if (listaNumeroSorteados.length == numeroMaximo) {
        asignarTextoElemento('p', 'Ya se sortearon todos los números posibles.');
    } else {
        //Si el Número generado está incluido en la lista
        if (listaNumeroSorteados.includes(numeroGenerado)) {
            return generarNumeroSecreto();
        } else {
            listaNumeroSorteados.push(numeroGenerado);
            return numeroGenerado;
        }
    }
}

function condicionesIniciales(){
    asignarTextoElemento('h1', 'Juego del Número Secreto');
    asignarTextoElemento('p', `Ingresa un número del 1 al ${numeroMaximo}:`);
    numeroSecreto = generarNumeroSecreto();
    intentos = 1;
}

function reiniciarJuego() {
    //Limpiar la caja.
    limpiarCaja();
    //Indicar mensaje de intervalo de números.
    //Generar número aleatorio.
    //Deshabilitar el botón de nuevo juego.
    condicionesIniciales();
    //Inicializar el número de intentos.
    document.querySelector('#reiniciar').setAttribute('disabled', 'true');
    document.querySelector('#intentar').removeAttribute('disabled');
}

condicionesIniciales();
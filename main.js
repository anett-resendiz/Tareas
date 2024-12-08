// Comentario

// Variable
// var
// let nombreDeAlumno;
// console.log(nombre);
// nombre = "Anett";

// Hola Mundo desde la consola
// console.log("Hola Mundo desde la consola!!!")
// Hola mundo desde un alert
// alert("hola mundo desde un alert!!!");
// // tipos de datos
// // string
// let texto = "soy un texto";
// // Number
// let numero = 42;
// // Boolean 2 datos, ejemplo true o false
// let verdadero = true;
// // undefined
// let undefined;
// // null
// let vacio = null;

// Definir mis constantes y mis variables
// ''
// Código JS
// Variables y constantes
const fecha = document.querySelector('#fecha');
const lista = document.querySelector('#lista');
const input = document.querySelector('#input');
const botonAgregar = document.querySelector('#botonAgregar');
const check = 'bi-record-circle';
const tachado = 'tachado';
const uncheck = 'bi-circle';
let LIST;
let id;

// Mostrar la fecha actual
const FECHA = new Date();
fecha.innerHTML = FECHA.toLocaleDateString('es-MX', {
    weekday: 'long',
    month: 'short',
    day: 'numeric',
});

// Agregar tarea
function agregarTarea(tarea, id, hecho, eliminar) {
    if (eliminar) return;

    const realizado = hecho ? check : uncheck;
    const LINE = hecho ? tachado : '';
    const elemento = `
    <li id="elemento">
        <i id="${id}" data="hecho" class="bi ${realizado}"></i>
        <p class="tarea-lista text ${LINE}">${tarea}</p>
        <i id="${id}" data="eliminar" class="bi bi-x"></i>
    </li>`;
    lista.insertAdjacentHTML("beforeend", elemento);
}

// Marcar tarea como realizada
function tareaRealizada(element) {
    element.classList.toggle(check);
    element.classList.toggle(uncheck);
    const textElement = element.parentNode.querySelector('.text');
    if (textElement) {
        textElement.classList.toggle(tachado);
    } else {
        console.error('No se encontró el elemento con clase .text');
    }
    if (LIST[element.id]) {
        LIST[element.id].realizado = !LIST[element.id].realizado;
    }
}

// Eliminar tarea
function tareaEliminada(element) {
    const parent = element.parentNode;
    parent.parentNode.removeChild(parent);
    if (LIST[element.id]) {
        LIST[element.id].eliminar = true;
    }
}

// Agregar tareas al hacer clic
botonAgregar.addEventListener("click", () => {
    const tarea = input.value;
    if (tarea) {
        agregarTarea(tarea, id, false, false);
        LIST.push({
            nombre: tarea,
            id: id,
            hecho: false,
            eliminar: false,
        });
        localStorage.setItem("TODO", JSON.stringify(LIST));
        id++;
        input.value = "";
    }
});

// Manejar eventos de lista
lista.addEventListener("click", (event) => {
    const element = event.target;
    const elementData = element.attributes.data ? element.attributes.data.value : null;
    if (!elementData) return;

    if (elementData === "hecho") {
        tareaRealizada(element);
    } else if (elementData === "eliminar") {
        tareaEliminada(element);
    }
    localStorage.setItem("TODO", JSON.stringify(LIST));
});

// Cargar lista desde localStorage
let data = localStorage.getItem("TODO");
if (data) {
    LIST = JSON.parse(data);
    id = LIST.length;
    cargarLista(LIST);
} else {
    LIST = [];
    id = 0;
}

// Cargar tareas existentes
function cargarLista(array) {
    array.forEach(item => {
        agregarTarea(item.nombre, item.id, item.hecho, item.eliminar);
    });
}

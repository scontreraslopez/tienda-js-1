/* ============================================================
   FASE 6: TechShop en el navegador — DOM
   ============================================================
   Archivo: js/main.js
   Abre main.html en el navegador para ver el resultado.
   ============================================================ */


/* ============================================================
   *** ANTES DE EMPEZAR — PASO OBLIGATORIO ***
   ============================================================
   Esta fase reutiliza las funciones que ya escribiste en
   UP10-actividades.js (Fase 5). Cópialas aquí abajo para
   poder usarlas en el navegador.

   Abre js/UP10-actividades.js y copia EXACTAMENTE estas 5 cosas
   en el bloque reservado que encontrarás justo debajo:

     1. const IVA = 0.21
        (está al principio del archivo, en la Fase 1)

     2. function calcularSubtotal(precio, cantidad) { ... }
        (Fase 5)

     3. function aplicarIVA(subtotal) { ... }
        (Fase 5)

     4. function aplicarDescuento(total, porcentaje) { ... }
        (Fase 5)

     5. function calcularPorcentajeDescuento(importe) { ... }
        (está definida en la Fase 3, se usa también en Fase 5)

   Sin estas funciones el resto del código no funcionará.
   ============================================================ */

/* --- PEGA AQUÍ TUS FUNCIONES DE LA FASE 5 (empieza abajo) --- */



/* --- FIN DEL BLOQUE DE FUNCIONES COPIADAS ------------------- */


/* ============================================================
   PASO 1 — Seleccionar elementos del DOM
   ============================================================
   Obtenemos referencias a los elementos HTML que vamos
   a modificar desde JavaScript.

   Métodos:
     document.getElementById("id")       → un único elemento
     document.querySelectorAll(".clase")  → colección de elementos
   ============================================================ */

// Lista donde aparecerán los artículos añadidos al carrito
const listaCarrito = document.getElementById("lista-carrito");

// Spans del resumen de precios
const spanSubtotal = document.getElementById("subtotal");
const spanIVA      = document.getElementById("iva");
const spanTotal    = document.getElementById("total");

// Botón para vaciar todo el carrito
const btnVaciar = document.getElementById("btn-vaciar");

// Todos los botones "Añadir al carrito" del catálogo
const botonesAñadir = document.querySelectorAll(".btn-añadir");


// TODO EJ 6.1 - Step 1. En este punto vamos a seleccionar un elemento del DOM para luego actualizar su texto con el número de artículos en el carrito (EJ. 6.1)
// Tienes dos posibles aproximaciones para seleccionar el <h2> del carrito:
// 1) Seleccionar el <h2> directamente con querySelector() usando su clase o su posición relativa a otros elementos.
// 2) Seleccionar la sección del carrito (con id "carrito-section") y luego usar querySelector() sobre esa sección para encontrar el <h2> dentro de ella.
// Elige la que te resulte más cómoda, o haz ambas para practicar. Luego guarda la referencia en una variable llamada h2Carrito.

/* --- INICIO BLOQUE DE RESPUESTA --- */



/* --- FIN BLOQUE DE RESPUESTA --- */


/* ============================================================
   PASO 2 — Array de datos del carrito
   ============================================================
   Igual que en la Fase 4, un array guarda los artículos.
   Cada objeto tiene { nombre, precio }.
   Se actualiza cada vez que el usuario añade o elimina algo.
   ============================================================ */

let itemsCarrito = [];   // empieza vacío


/* ============================================================
   PASO 3 — Función actualizarResumen()
   ============================================================
   Recorre itemsCarrito, acumula el subtotal y usa las
   funciones que copiaste (calcularPorcentajeDescuento,
   aplicarDescuento, aplicarIVA) para calcular el total.
   Después actualiza los tres <span> del resumen.

   ¡Fíjate en que llamamos exactamente a las mismas funciones
   que usabas en imprimirTicket() de la Fase 5!
   ============================================================ */

function actualizarResumen() {
    // Acumulamos el subtotal (patrón del Fase 4)
    let subtotal = 0;
    for (let i = 0; i < itemsCarrito.length; i++) {
        subtotal += itemsCarrito[i].precio;
    }

    // Aplicamos descuento y luego IVA — usando TUS funciones de Fase 5
    let pct            = calcularPorcentajeDescuento(subtotal);
    let subtotalConDto = aplicarDescuento(subtotal, pct);
    let total          = aplicarIVA(subtotalConDto);
    let iva            = total - subtotalConDto;

    // Actualizamos el texto de los <span> en el HTML
    spanSubtotal.textContent = subtotalConDto.toFixed(2) + " €";
    spanIVA.textContent      = iva.toFixed(2)            + " €";
    spanTotal.textContent    = total.toFixed(2)          + " €";

    // TODO EJ. 6.1 — Completa primero la selección de h2Carrito (busca
    //                "EJ. 6.1" en el Paso 1), luego escribe aquí la lógica:

    // TODO EJ. 6.2 — Muestra u oculta el mensaje "El carrito está vacío.":
    // Escribe aquí:


}

/* ============================================================
   PASO 4 — Función añadirAlCarrito(nombre, precio)
   ============================================================
   Se ejecuta cada vez que el usuario hace clic en
   "Añadir al carrito". Hace cinco cosas:
     a) Guarda el artículo en itemsCarrito (el array)
     b) Crea un elemento <li> con el texto del artículo
     c) Crea un botón ✕ y le añade el evento "eliminar"
     d) Monta el <li> y lo añade a la lista del DOM
     e) Llama a actualizarResumen() para refrescar los totales
   ============================================================ */

function añadirAlCarrito(nombre, precio) {
    // --- a) Guardar en el array ---
    itemsCarrito.push({ nombre: nombre, precio: precio });

    // --- b) Crear el <li> ---
    const li = document.createElement("li");

    const textoSpan = document.createElement("span");
    textoSpan.textContent = `${nombre} — ${precio.toFixed(2)} €`;

    // --- c) Botón eliminar ---
    const btnEliminar = document.createElement("button");
    btnEliminar.textContent = "✕";
    btnEliminar.classList.add("btn-eliminar");

    btnEliminar.addEventListener("click", function () {
        // Buscamos el índice del artículo en el array
        let indice = itemsCarrito.findIndex(function (item) {
            return item.nombre === nombre && item.precio === precio;
        });
        if (indice !== -1) {
            itemsCarrito.splice(indice, 1);   // lo quitamos del array
        }
        li.remove();            // lo quitamos del DOM
        actualizarResumen();
    });

    // --- d) Montar y añadir a la lista ---
    li.appendChild(textoSpan);
    li.appendChild(btnEliminar);
    listaCarrito.appendChild(li);

    // --- e) Refrescar totales ---
    actualizarResumen();
}


/* ============================================================
   PASO 5 — Conectar los botones del catálogo
   ============================================================
   Recorremos los botones ".btn-añadir" con un for y
   añadimos un evento "click" a cada uno.
   El nombre y el precio están en los atributos data-* del
   div padre (.producto), que leemos con dataset.
   ============================================================ */

for (let i = 0; i < botonesAñadir.length; i++) {
    botonesAñadir[i].addEventListener("click", function () {
        let divProducto = botonesAñadir[i].parentElement;
        let nombre = divProducto.dataset.nombre;
        let precio  = parseFloat(divProducto.dataset.precio);

        añadirAlCarrito(nombre, precio);
    });
}


/* ============================================================
   PASO 6 — Botón "Vaciar carrito"
   ============================================================ */

btnVaciar.addEventListener("click", function () {
    itemsCarrito = [];
    listaCarrito.innerHTML = "";
    actualizarResumen();
});


/* ============================================================
   EJERCICIOS
   ============================================================ */

/* -------------------------------------------------------
   EJERCICIO 6.1
   Muestra el número de artículos en el título "Carrito":
     - 0 artículos → "Carrito"
     - 1 artículo  → "Carrito (1 artículo)"
     - N artículos → "Carrito (N artículos)"

   Pistas:
     - Declara h2Carrito arriba, en el Paso 1 (busca "TODO EJ. 6.1 - Step 1").
     - Actualiza su textContent dentro de actualizarResumen() (busca "TODO EJ. 6.1 - Step 2").
     - Usa itemsCarrito.length para saber cuántos hay.
   ------------------------------------------------------- */


/* -------------------------------------------------------
   EJERCICIO 6.2
   Si el carrito está vacío, muestra el texto
   "El carrito está vacío." dentro de la lista lista-carrito (ya seleccionada en la const listaCarrito).
   En cuanto haya artículos, ese mensaje debe desaparecer.

   Pistas:
     - Comprueba itemsCarrito.length === 0 en actualizarResumen().
     - Puedes añadir un <li class="carrito-vacio"> cuando esté
       vacío y eliminarlo cuando se añada el primer artículo.
     - Escribe la lógica dentro de actualizarResumen() (busca "TODO EJ. 6.2").
   ------------------------------------------------------- */


/* -------------------------------------------------------
   EJERCICIO 6.3
   Evita duplicados: si el producto ya está en el carrito,
   incrementa la cantidad en vez de añadir una línea nueva.

   El texto de la línea debería cambiar así:
     "Teclado mecánico — 79,99 €"   → primera vez
     "Teclado mecánico x2 — 159,98 €" → segunda vez

   Pistas:
     - En añadirAlCarrito(), usa findIndex() para saber si
       el artículo ya existe antes de hacer push().
     - Si existe, incrementa su propiedad cantidad y
       actualiza el textContent del <span> del DOM.
     - Necesitarás guardar la referencia al <span> de cada
       línea para poder modificarla después.
   ------------------------------------------------------- */

// Este ejercicio requiere reescribir añadirAlCarrito().
// Cuando estés listo, comenta o borra la función original
// y escribe la nueva versión aquí abajo.

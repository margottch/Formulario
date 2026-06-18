const form = document.getElementById("formulario");
const nombre = document.getElementById("nombre");
const correo = document.getElementById("correo");
const telefono = document.getElementById("telefono");
const exito = document.getElementById("exito");
const lista = document.getElementById("lista");
const contador = document.getElementById("count");
const limpiar = document.getElementById("limpiar");
const container = document.querySelector(".container");
const campos = [nombre, correo, telefono];

// VALIDAR NOMBRE
function validarNombre() {
    const valor = nombre.value.trim();

    if (valor === "") {
        mostrarError(nombre, "El nombre es obligatorio");
        return false;
    }

    if (valor.length < 3) {
        mostrarError(nombre, "Mínimo 3 caracteres");
        return false;
    }

    mostrarOk(nombre);
    return true;
}

// VALIDAR CORREO
function validarCorreo() {
    const valor = correo.value.trim();
    const regex = /^[a-z0-9._%+-]+@itpm\.edu\.bo$/i;

    if (valor === "") {
        mostrarError(correo, "El correo es obligatorio");
        return false;
    }

    if (!regex.test(valor)) {
        mostrarError(correo, "Debe ser correo institucional");
        return false;
    }

    mostrarOk(correo);
    return true;
}

// VALIDAR TELEFONO (7 DIGITOS)
function validarTelefono() {
    const valor = telefono.value.trim();
    const regex = /^[0-9]{7}$/;

    if (valor === "") {
        mostrarError(telefono, "El teléfono es obligatorio");
        return false;
    }

    if (!regex.test(valor)) {
        mostrarError(telefono, "Debe tener 7 números");
        return false;
    }

    mostrarOk(telefono);
    return true;
}

// MOSTRAR ERROR
function mostrarError(input, mensaje) {
    input.classList.add("errorInput");
    input.classList.remove("valido");
    input.nextElementSibling.textContent = mensaje;
}

// MOSTRAR OK
function mostrarOk(input) {
    input.classList.remove("errorInput");
    input.classList.add("valido");
    input.nextElementSibling.textContent = "";
}

// ACTUALIZAR CONTADOR
function actualizarContador() {
    contador.textContent = lista.querySelectorAll("tr").length;
}

// CREAR FILA
function crearFila(nombreValor, correoValor, telefonoValor) {
    const fila = document.createElement("tr");
    fila.innerHTML = `
        <td>${nombreValor}</td>
        <td>${correoValor}</td>
        <td>${telefonoValor}</td>
        <td><button type="button" class="delete-row" title="Eliminar fila"><i class="fas fa-trash-alt"></i></button></td>
    `;
    lista.appendChild(fila);
    fila.classList.add("added");
    setTimeout(() => fila.classList.remove("added"), 300);
    actualizarContador();
}

// ELIMINAR FILA
function eliminarFila(button) {
    const fila = button.closest("tr");
    if (!fila) return;
    fila.classList.add("remove");
    setTimeout(() => {
        fila.remove();
        actualizarContador();
    }, 240);
}

// SOLO NUMEROS EN TELEFONO
telefono.addEventListener("keypress", (e) => {
    if (!/[0-9]/.test(e.key)) {
        e.preventDefault();
    }
});

// VALIDAR AL ENVIAR
form.addEventListener("submit", function(e) {
    e.preventDefault();

    const v1 = validarNombre();
    const v2 = validarCorreo();
    const v3 = validarTelefono();

    if (v1 && v2 && v3) {
        crearFila(nombre.value.trim(), correo.value.trim(), telefono.value.trim());
        exito.style.display = "block";
        form.reset();

        campos.forEach((input) => {
            input.classList.remove("valido");
        });

        setTimeout(() => {
            exito.style.display = "none";
        }, 3000);
    }
});

// ELIMINAR FILA CON DELEGACION
lista.addEventListener("click", (e) => {
    const boton = e.target.closest(".delete-row");
    if (boton) {
        eliminarFila(boton);
    }
});

// LIMPIAR TODA LA TABLA
limpiar.addEventListener("click", () => {
    if (lista.children.length === 0) return;
    lista.innerHTML = "";
    actualizarContador();
});

// VALIDACION DINAMICA Y FOCO
campos.forEach((input) => {
    input.addEventListener("focus", () => {
        input.closest(".campo").classList.add("focused");
    });

    input.addEventListener("blur", () => {
        const campo = input.closest(".campo");
        campo.classList.remove("focused");

        if (input.value.trim() !== "") {
            if (input === nombre) validarNombre();
            if (input === correo) validarCorreo();
            if (input === telefono) validarTelefono();
        }
    });
});

// EFECTO TILTED EN EL CONTENEDOR
container.addEventListener("mousemove", (e) => {
    const rect = container.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateY = ((x - centerX) / centerX) * 8;
    const rotateX = ((centerY - y) / centerY) * 8;
    container.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
});

container.addEventListener("mouseleave", () => {
    container.style.transform = "";
});
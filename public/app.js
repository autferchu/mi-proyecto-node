const form = document.getElementById("empleado-form");
const tablaBody = document.getElementById("empleados-body");
const mensaje = document.getElementById("mensaje");
const tituloFormulario = document.getElementById("form-title");
const botonSubmit = document.getElementById("submit-button");
const botonCancelar = document.getElementById("cancel-edit");
const botonBorrarTodo = document.getElementById("delete-all");
const statsContainer = document.getElementById("stats");

let empleadoEditandoId = null;
const camposObligatorios = ["nombre", "apellido", "email", "puesto", "tipo_documento"];

function validarCamposObligatorios() {
  let valido = true;

  camposObligatorios.forEach((campo) => {
    const input = form.elements[campo];
    if (!input) return;

    const valor = String(input.value || "").trim();
    const estaVacio = valor.length === 0;

    input.classList.toggle("is-invalid", estaVacio);
    input.setAttribute("aria-invalid", String(estaVacio));

    if (estaVacio) {
      valido = false;
    }
  });

  if (!valido) {
    mostrarMensaje("Este campo es obligatorio", "error");
  }

  return valido;
}

function renderStats(empleados) {
  const tipos = new Set(empleados.map((empleado) => empleado.tipo_documento || "Sin tipo"));
  const puestos = new Set(empleados.map((empleado) => empleado.puesto));

  const cards = [
    { label: "Empleados", value: empleados.length },
    { label: "Tipos de doc.", value: tipos.size },
    { label: "Puestos", value: puestos.size },
    { label: "Estado", value: "Activo" }
  ];

  statsContainer.innerHTML = cards
    .map(
      (card) => `
        <article class="stat-card">
          <span class="label">${card.label}</span>
          <span class="value">${card.value}</span>
        </article>
      `
    )
    .join("");
}

async function cargarEmpleados() {
  try {
    const response = await fetch("/api/empleados");
    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.error || "No se pudieron cargar los empleados");
    }

    const empleados = result.data || [];
    renderStats(empleados);

    if (!empleados.length) {
      tablaBody.innerHTML = '<tr><td colspan="7" class="empty">No hay empleados registrados.</td></tr>';
      return;
    }

    tablaBody.innerHTML = empleados
      .map(
        (empleado) => `
          <tr>
            <td>${empleado.id}</td>
            <td>${empleado.nombre}</td>
            <td>${empleado.apellido}</td>
            <td>${empleado.email}</td>
            <td>${empleado.puesto}</td>
            <td>${empleado.tipo_documento || "Sin tipo"}</td>
            <td class="actions-cell">
              <button type="button" class="action-btn edit" data-id="${empleado.id}">Editar</button>
              <button type="button" class="action-btn delete" data-id="${empleado.id}">Borrar</button>
            </td>
          </tr>
        `
      )
      .join("");

    document.querySelectorAll(".action-btn.edit").forEach((boton) => {
      boton.addEventListener("click", () => prepararEdicion(Number(boton.dataset.id)));
    });

    document.querySelectorAll(".action-btn.delete").forEach((boton) => {
      boton.addEventListener("click", () => borrarEmpleado(Number(boton.dataset.id)));
    });
  } catch (error) {
    tablaBody.innerHTML = '<tr><td colspan="7" class="empty">Error al cargar empleados.</td></tr>';
    mostrarMensaje(error.message, "error");
  }
}

function mostrarMensaje(texto, tipo) {
  mensaje.textContent = texto;
  mensaje.className = `mensaje ${tipo}`;
}

function resetFormulario() {
  form.reset();
  camposObligatorios.forEach((campo) => {
    const input = form.elements[campo];
    if (input) {
      input.classList.remove("is-invalid");
      input.setAttribute("aria-invalid", "false");
    }
  });
  empleadoEditandoId = null;
  tituloFormulario.textContent = "Agregar empleado";
  botonSubmit.textContent = "Guardar empleado";
  botonCancelar.classList.add("hidden");
}

async function prepararEdicion(id) {
  try {
    const response = await fetch(`/api/empleados/${id}`);
    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.error || "No se pudo cargar la información del empleado");
    }

    const empleado = result.data;
    empleadoEditandoId = empleado.id;
    tituloFormulario.textContent = "Editar empleado";
    botonSubmit.textContent = "Actualizar empleado";
    botonCancelar.classList.remove("hidden");

    form.nombre.value = empleado.nombre;
    form.apellido.value = empleado.apellido;
    form.email.value = empleado.email;
    form.puesto.value = empleado.puesto;
    form.tipo_documento.value = empleado.tipo_documento || "Cédula";
    window.scrollTo({ top: 0, behavior: "smooth" });
  } catch (error) {
    mostrarMensaje(error.message, "error");
  }
}

async function borrarEmpleado(id) {
  const confirmar = window.confirm("¿Seguro que querés borrar este empleado?");
  if (!confirmar) return;

  try {
    const response = await fetch(`/api/empleados/${id}`, {
      method: "DELETE"
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.error || "No se pudo borrar el empleado");
    }

    mostrarMensaje("Empleado eliminado correctamente", "success");
    if (empleadoEditandoId === id) {
      resetFormulario();
    }
    cargarEmpleados();
  } catch (error) {
    mostrarMensaje(error.message, "error");
  }
}

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  if (!validarCamposObligatorios()) {
    return;
  }

  const formData = new FormData(form);
  const payload = Object.fromEntries(formData.entries());

  payload.salario = 0;

  try {
    const url = empleadoEditandoId ? `/api/empleados/${empleadoEditandoId}` : "/api/empleados";
    const method = empleadoEditandoId ? "PUT" : "POST";

    const response = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.error || "No se pudo guardar el empleado");
    }

    mostrarMensaje(
      empleadoEditandoId ? "Empleado actualizado con éxito" : "Empleado creado con éxito",
      "success"
    );

    resetFormulario();
    cargarEmpleados();
  } catch (error) {
    mostrarMensaje(error.message, "error");
  }
});

async function borrarTodosLosEmpleados() {
  const confirmar = window.confirm("¿Seguro que querés borrar todos los empleados?");
  if (!confirmar) return;

  try {
    const response = await fetch("/api/empleados", {
      method: "DELETE"
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.error || "No se pudo borrar la lista completa");
    }

    mostrarMensaje("Se borraron todos los empleados", "success");
    resetFormulario();
    cargarEmpleados();
  } catch (error) {
    mostrarMensaje(error.message, "error");
  }
}

botonCancelar.addEventListener("click", resetFormulario);
botonBorrarTodo.addEventListener("click", borrarTodosLosEmpleados);

cargarEmpleados();

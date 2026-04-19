const inputProducto = document.getElementById("inputProducto");
const btnAgregar = document.getElementById("btnAgregar");
const listaEl = document.getElementById("lista");
const errorEl = document.getElementById("error");
const contadorEl = document.getElementById("contador");

function actualizarContador() {
  const cantidad = listaEl.children.length;
  contadorEl.textContent = `${cantidad} producto${cantidad !== 1 ? "s" : ""} en la lista`;
}

function agregarProducto() {
  const nombre = inputProducto.value.trim();

  if (nombre === "") {
    errorEl.textContent = "⚠ Ingresá el nombre del producto.";
    return;
  }

  errorEl.textContent = "";

  const li = document.createElement("li");

  const span = document.createElement("span");
  span.textContent = nombre;

  const btnEliminar = document.createElement("button");
  btnEliminar.textContent = "Eliminar";

  btnEliminar.addEventListener("click", () => {
    li.remove();
    actualizarContador();
  });

  li.appendChild(span);
  li.appendChild(btnEliminar);
  listaEl.appendChild(li);

  inputProducto.value = "";
  inputProducto.focus();
  actualizarContador();
}

btnAgregar.addEventListener("click", agregarProducto);

inputProducto.addEventListener("keydown", (e) => {
  if (e.key === "Enter") agregarProducto();
});
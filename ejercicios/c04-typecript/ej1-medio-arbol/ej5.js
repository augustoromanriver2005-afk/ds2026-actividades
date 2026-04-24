const btnGenerar = document.getElementById("btnGenerar");
const inputAltura = document.getElementById("altura");
const arbolEl = document.getElementById("arbol");
const errorEl = document.getElementById("error");

function generarMedioArbol(altura) {
  let resultado = "";
  for (let i = 1; i <= altura; i++) {
    let fila = "";
    for (let j = 0; j < i; j++) {
      fila += "*";
    }
    resultado += fila + "\n";
  }
  return resultado;
}

btnGenerar.addEventListener("click", () => {
  const valor = inputAltura.value;

  if (valor === "" || Number(valor) < 1) {
    errorEl.textContent = "Ingresá un número mayor o igual a 1.";
    arbolEl.textContent = "";
    return;
  }

  errorEl.textContent = "";
  arbolEl.textContent = generarMedioArbol(Number(valor));
});
export {};
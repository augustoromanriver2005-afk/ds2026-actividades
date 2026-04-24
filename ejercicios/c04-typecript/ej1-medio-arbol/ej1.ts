function generarAsteriscos(altura: number): string {
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
export {};
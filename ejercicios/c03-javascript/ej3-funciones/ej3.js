function calcularPrecioFinal(monto, medioPago) {
  if (monto < 200) {
    return monto;
  }

  if (monto >= 200 && monto <= 400) {
    if (medioPago === "E") return monto * 0.70; // 30% off
    if (medioPago === "D") return monto * 0.80; // 20% off
    if (medioPago === "C") return monto * 0.90; // 10% off
  }

  if (monto > 400) {
    return monto * 0.60; // 40% off para todos
  }

  return monto;
}

// Pruebas
const casos = [
  { monto: 150, medioPago: "E" },
  { monto: 300, medioPago: "E" },
  { monto: 300, medioPago: "D" },
  { monto: 300, medioPago: "C" },
  { monto: 500, medioPago: "E" },
];

for (const { monto, medioPago } of casos) {
  const final = calcularPrecioFinal(monto, medioPago);
  console.log(`Monto: $${monto} | Pago: ${medioPago} | Final: $${final.toFixed(2)}`);
}
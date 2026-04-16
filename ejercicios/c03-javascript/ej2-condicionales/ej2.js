function clasificarNota(nota) {
  if (nota >= 8){
    return "promocionado"
  } else {
    if(nota < 4 ){
        return "desaprobado"
    } else{
        return "aprobado"
    }
  }
}

console.log(clasificarNota(3));


function diaDeLaSemana(num) {
  switch (num){
    case 1: console.log("lunes");break;
    case 2: console.log("martes");break;
    case 3: console.log("miercoles");break;
    case 4: console.log("jueves");break;
    case 5: console.log("viernes");break;
    case 6: console.log("sabado. fin de semana");break;
    case 7: console.log("domingo, fin de semana");break;
    default: console.log("dia invalido");
  }
}
console.log(diaDeLaSemana(6));

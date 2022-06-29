const multiplosEjercicio7 = () => {
    const num1 = document.getElementById("ej7_num1").value * 1;
    const num2 = document.getElementById("ej7_num2").value * 1;
    const resultado = document.getElementById("resultado_ej7");
    resultado.textContent = "";
  
    let menor = Math.min(num1, num2);
    let mayor = Math.max(num1, num2);
  
    while (menor <= mayor) {
      let calculo = menor % 3;
      if (calculo === 0) {
        resultado.textContent = resultado.innerHTML + " | " + menor;
      }
      menor++;
    }
  };
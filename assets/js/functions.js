function ResultadoEj1() {
      
    let n1=parseFloat( document.getElementById("n1").value)
    let n2=parseFloat( document.getElementById("n2").value)
    let n3=parseFloat( document.getElementById("n3").value)
    //puse una variable a los numeros
    if ((n1>n2)&& (n1>n3)){
        document.getElementById("Resultadoej1").value= "El mayor es el n 1"}
        if ((n2>n1)&& (n2>n3)){
        document.getElementById("Resultadoej1").value= "El mayor es el n 2"}
        if ((n3>n2)&& (n3>n1)){
        document.getElementById("Resultadoej1").value= "El mayor es el n 3"}
    //comprare los nemeros y hice la accion de que suelte el mayor
}

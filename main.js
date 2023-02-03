const Aportes = {
  jubilacion: 0.11,
  obraSocial: 0.03,
  pami: 0.03,
};

let historial = JSON.parse(localStorage.getItem("historial")) || [];

const form = document.getElementById("form");
const sueldoBrutoInput = document.getElementById("sueldoBruto");
const historialDiv = document.getElementById("historial");
const plantillaDivResultado = document.createElement("div");

form.addEventListener("submit", function (event) {
  event.preventDefault();
  calcularSueldoNeto();
});

function calcularSueldoNeto() {
  let sueldoBruto = Number(sueldoBrutoInput.value).toFixed(2);
  let timestamp = new Date().toLocaleString();

  if (isNaN(sueldoBruto) || sueldoBruto <= 0) {
    Swal.fire({
      title: "¡Por favor ingrese un valor numérico y positivo!",
      showClass: {
        popup: "animate__animated animate__fadeInDown",
      },
      hideClass: {
        popup: "animate__animated animate__fadeOutUp",
      },
      allowOutsideClick: false,
      confirmButtonText: "Aceptar",
      timer: 3000,
    });
    form.reset();
    return;
  }

  const componentesSueldoNeto = {
    sueldoBruto: sueldoBruto,
  };

  let sueldoNeto = sueldoBruto;

  for (let descuento in Aportes) {
    componentesSueldoNeto[descuento] = (
      sueldoBruto * Aportes[descuento]
    ).toFixed(2);
    sueldoNeto -= componentesSueldoNeto[descuento];
  }

  componentesSueldoNeto.sueldoNeto = sueldoNeto.toFixed(2);

  let resultado = `  
    <div><span class="timestamp"> Fecha y hora del calculo: </span> <span class="timestampResultado">${timestamp}</span></div>
    <div><span class="sueldoBruto"> Sueldo Bruto Ingresado: </span> <span class="sueldoBrutoResultado">$${componentesSueldoNeto.sueldoBruto}</span></div>
    <div><span class="aportes"> Jubilacion: </span> <span class="aportesResultado">-$${componentesSueldoNeto.jubilacion}</span></div>
    <div><span class="aportes"> Obra Social: </span> <span class="aportesResultado">-$${componentesSueldoNeto.obraSocial}</span></div>
    <div><span class="aportes"> PAMI: </span> <span class="aportesResultado">-$${componentesSueldoNeto.pami}</span></div>
    <div><span class="sueldoNeto"> Sueldo neto: </span> <span class="sueldoNetoResultado">$${componentesSueldoNeto.sueldoNeto}</span></div>
    `;

  if (document.getElementById("netoADolar").checked) {
    let resultadoBlue = (sueldoNeto / valorBlueVenta).toFixed(2);
    let resultadoOficial = (sueldoNeto / valorOficialVenta).toFixed(2);

    resultado += `  
    <div><span class="sueldoNeto"> Sueldo neto a dólar Oficial: </span> <span class="sueldoNetoResultado">$${resultadoOficial}</span></div>
    <div><span class="sueldoNeto"> Sueldo neto a dólar Blue: </span> <span class="sueldoNetoResultado">$${resultadoBlue}</span></div>
      `;
  }
  historial.push(resultado);
  agregarAlHistorial(historial);
  form.reset();
}

function agregarAlHistorial(historial) {
  historialDiv.innerHTML = "";

  for (let i = historial.length - 1; i >= 0; i--) {
    let divResultado = plantillaDivResultado.cloneNode();
    divResultado.innerHTML = historial[i];
    divResultado.classList.add("divHistorial");
    historialDiv.appendChild(divResultado);
  }
  localStorage.setItem("historial", JSON.stringify(historial));
}

agregarAlHistorial(historial);

document.addEventListener("keydown", function (event) {
  if (event.code === "Delete") {
    limpiarHistorial();
  }
});

function limpiarHistorial() {
  historial = [];
  form.reset();
  historialDiv.innerHTML = "";
  localStorage.removeItem("historial");
}
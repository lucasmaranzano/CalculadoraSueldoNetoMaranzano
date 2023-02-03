let valorBlueVenta;
let valorOficialVenta;

fetch("https://api.bluelytics.com.ar/v2/latest")
.then((response) => response.json())
.then((data) => {
    const blue = data.blue;
    const oficial = data.oficial;
    valorBlueVenta = blue.value_sell;
    valorOficialVenta = oficial.value_sell;
    document.getElementById("valorBlueVenta").innerHTML = "$" + valorBlueVenta;
    document.getElementById("valorOficialVenta").innerHTML = "$" + valorOficialVenta;
});
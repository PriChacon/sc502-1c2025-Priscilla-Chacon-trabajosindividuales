document.getElementById('calcularBtn').addEventListener('click', function() {
    const sBruto = parseFloat(document.getElementById('salarioBruto').value);
    
    if (isNaN(salarioBruto) || salarioBruto <= 0) {
        alert("Por favor, ingrese un salario bruto válido.");
        return;
    }
    
    // Cálculo de cargas sociales (26.33%)
    const cargasSociales = sBruto * 0.2633;

    // Cálculo del impuesto sobre la renta
    let impuestoRenta = 0;
    if (sBruto > 1000000) {
        impuestoRenta = (sBruto - 1000000) * 0.15; // 15% sobre el excedente
    }

    // Cálculo del salario neto
    const salarioNeto = sBruto - cargasSociales - impuestoRenta;

    // Resultados
    document.getElementById('cargasSociales').innerText = `Cargas Sociales: ₡${cargasSociales.toFixed(2)}`;
    document.getElementById('impuestoRenta').innerText = `Impuesto sobre la Renta: ₡${impuestoRenta.toFixed(2)}`;
    document.getElementById('salarioNeto').innerText = `Salario Neto: ₡${salarioNeto.toFixed(2)}`;
});
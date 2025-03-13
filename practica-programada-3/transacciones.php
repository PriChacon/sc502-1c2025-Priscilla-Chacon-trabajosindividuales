<?php
// Definimos un arreglo para almacenar las transacciones
$transacciones = [];

// Función para registrar una transacción
function registrarTransaccion(&$transacciones, $id, $descripcion, $monto) {
    // Creamos un arreglo asociativo para la nueva transacción
    $transaccion = [
        'id' => $id,
        'descripcion' => $descripcion,
        'monto' => $monto
    ];
    
    // Usamos array_push para agregar la transacción al final del arreglo
    array_push($transacciones, $transaccion);
}

// Función para generar el estado de cuenta en formato TXT y mostrarlo en pantalla
function generarEstadoDeCuentaTXT($transacciones) {
    $montoTotal = 0;

    // Recorremos el arreglo de transacciones y sumamos los montos
    foreach ($transacciones as $transaccion) {
        $montoTotal += $transaccion['monto'];
    }

    // Calcular el monto total con interés del 2.6%
    $interes = 0.026; // 2.6%
    $montoConInteres = $montoTotal * (1 + $interes);

    // Calcular el cashback del 0.1%
    $cashbackPorcentaje = 0.001; // 0.1%
    $cashback = $montoTotal * $cashbackPorcentaje;

    // Generar el contenido del archivo TXT
    $contenido = "Estado de Cuenta\n";
    $contenido .= str_repeat("=", 30) . "\n";
    $contenido .= "ID\tDescripción\tMonto\n";
    $contenido .= str_repeat("-", 30) . "\n";

    // Mostrar el detalle de cada transacción
    foreach ($transacciones as $transaccion) {
        $contenido .= "{$transaccion['id']}\t{$transaccion['descripcion']}\t" . number_format($transaccion['monto'], 2) . "\n";
    }

    // Mostrar el resumen
    $contenido .= str_repeat("-", 30) . "\n";
    $contenido .= "Monto Total: " . number_format($montoTotal, 2) . "\n";
    $contenido .= "Monto Total con Intereses: " . number_format($montoConInteres, 2) . "\n";
    $contenido .= "Cashback: " . number_format($cashback, 2) . "\n";
    $contenido .= "Monto Final a Pagar: " . number_format($montoConInteres - $cashback, 2) . "\n";

    // Mostrar el contenido en pantalla
    echo nl2br($contenido); // nl2br convierte los saltos de línea en <br> para HTML

    // Guardar el contenido en un archivo TXT
    file_put_contents('estado_de_cuenta.txt', $contenido);
}

// Ejemplo de uso
registrarTransaccion($transacciones, 1, 'Pricesmart', 256780);
registrarTransaccion($transacciones, 2, 'Spotify.com', 7500);
registrarTransaccion($transacciones, 3, 'BreadHouse', 20135);

// Generar el estado de cuenta en formato TXT y mostrarlo en pantalla
generarEstadoDeCuentaTXT($transacciones);
?>
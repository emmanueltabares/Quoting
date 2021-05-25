class Cotizador {
  constructor(año, valor) {
    this._año = año;
    this._valor = valor;
  }

  cotizarSeguro = function (año, valor) {
    var seguroTotal = 0;
    var date = new Date();

    var transcurso = date.getFullYear() - parseInt(año);

    if (transcurso >= 8) {
      seguroTotal = valor * 0.005;
    } else {
      seguroTotal = valor * 0.008;
    }

    return seguroTotal;
  };

  insertarDatos = function (cotizacionFinal, nombre, datos) {

    var descuento = 0.80

    $('#datosUsuario').prepend('<p>Hola ' + nombre + '! Estos son los planes que tenemos para vos: </p>');
    $('#resultadoFinal1').prepend('<p>$' + (cotizacionFinal*descuento)*descuento + ' por mes</p>');
    $('#resultadoFinal2').prepend('<p>$' + cotizacionFinal*descuento + ' por mes</p>');
    $('#resultadoFinal3').prepend('<p>$' + cotizacionFinal + ' por mes</p>');
    $('#datosAuto').prepend('<p class="lead text-center">' + datos.marca + ' / ' + datos.modelo + ' / ' + datos.año + '</p>')
  };

}

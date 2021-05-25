$(document).ready( function() {
  obtenerDatosAlmacenados();
})

function activar() {

  var mail = document.getElementById("inputEmail").value;
  
  if(mail != null && mail != '') {
    $('#cotizar').attr('disabled', false)
  } else {
    $('#cotizar').attr('disabled', true)
  }
}

$("#cotizar").click(function () {

  var nombre = document.getElementById("inputNombre").value;
  var selectMarca = document.getElementById("selectMarca");
  var marca = selectMarca.options[selectMarca.selectedIndex].textContent;
  var selectModelo = document.getElementById("selectModelo");
  var modelo = selectModelo.options[selectModelo.selectedIndex].textContent;
  var selectAño = document.getElementById("selectAño");
  var año = selectAño.options[selectAño.selectedIndex].textContent;
  var valor = document.getElementById("inputValor").value;
  var mail = document.getElementById("inputEmail").value;

  let cotizacion = new Cotizador(año, valor);
  let cotizacionFinal = cotizacion.cotizarSeguro(año, valor);

  var datosAutomovil = {
     'nombre': nombre,
     'email': mail,
     'marca': marca,
     'modelo': modelo,
     'año': año,
     'valor': valor,
     'cotizacion': cotizacionFinal
  };

  cotizacion.insertarDatos(cotizacionFinal, nombre, datosAutomovil);
  
  $('#guardarCotizacion').click( function() {
    localStorage.setItem('datosCotizacion', JSON.stringify(datosAutomovil))
  })
  animar();
  
});

$('#recotizar').click(function() {
  eliminarDatos();
  $('html, body').animate({scrollTop: $('#titulo_principal').offset().top}, function(){
    location.reload();
  })
  
})

$(".btnContratar").click( function() {

  var mail = document.getElementById("inputEmail").value;

  if(mail == " ") {
    var dato = localStorage.getItem('datosCotizacion');
    var datoJSON = JSON.parse(dato);
    mail = datoJSON.email;
  } else {
    $("#datosEnviados").prepend('<div class="alert alert-success" role="alert"><h4 class="alert-heading">Gracias por confiar en nosotros!</h4><p> Hemos enviado un archivo adjunto con tu nueva poliza de seguro a <b>' + mail + '</b> para que puedas continuar con la contratación.</p></div>')
                      .fadeIn( function() {
                        $('html, body').animate({scrollTop: $('#datosEnviados').offset().top});
                      })
  }
})

//FUNCIONES//

function obtenerDatosAlmacenados(){
  var datosGuardados = localStorage.getItem('datosCotizacion');
  if(datosGuardados != null) {
    insertarDatosGuardados(JSON.parse(datosGuardados));
  }
}

function insertarDatosGuardados(datos) {
  animar();

  var descuento = 0.80;
  $('#datosUsuario').prepend('<p>Hola ' + datos.nombre + '! Estos son los planes que tenemos para vos: </p>');
  $('#resultadoFinal1').prepend('<p>$' + (datos.cotizacion*descuento)*descuento + ' por mes</p>');
  $('#resultadoFinal2').prepend('<p>$' + datos.cotizacion*descuento + ' por mes</p>');
  $('#resultadoFinal3').prepend('<p>$' + datos.cotizacion + ' por mes</p>');
  $('#datosAuto').prepend('<p class="lead text-center">' + datos.marca + ' / ' + datos.modelo + ' / ' + datos.año + '</p>')
}

function eliminarDatos(){
  localStorage.clear()
}

function animar() {
  $("#cotizar").fadeOut();
  
  $('.mostrar').fadeIn(function(){
    $('html, body').animate({scrollTop: $('.mostrarOcultar').offset().top});
  });
}

//DATA//
const url = '../data/vehiculos.json' 

$.getJSON(url, (data) => {
  for (let vehiculo of data) {
    $('#selectMarca').prepend('<option>' + vehiculo.Marca  + '</option>');
    $('#selectModelo').prepend('<option>' + vehiculo.Modelo + '</option>');
  }
})


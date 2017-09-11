const app = {
	configuracion : {
		mapa : undefined, //objeto de mi mapa
		confMapa : undefined, 
		container : undefined,

		//posición actual de latitud y altitud
		actualPosicion : {
			lat : 0,
			lng : 0
		},
		obtenerPosicion : undefined, //para obtener la posicion del boton
		// botonCercaLugares : undefined
	},
	//funcion para inicializar la aplicación
	init : function( confUsuario = {} ){
		console.log('inicializo ')

		//cambiando la posicion por defecto
		app.actualPosicion = (confUsuario.actualPosicion == undefined) ? {
			lat: -9.1191427,
			lng: -77.0349046
		} : confUsuario.actualPosicion;

		//cambiando botom
		app.obtenerPosicion = (confUsuario.obtenerPosicion == undefined) ? $('#encuentrame') : confUsuario.obtenerPosicion;

		app.setup();
		
	},
	setup : function(){

		app.container = document.getElementById("map"), 
		app.obtenerPosicion.click( app.obtPosicionActual );
		app.confMapa = {
			zoom: 5, //nivel de profundidad
			center: app.actualPosicion, //se mostrara las coordenadas en el  mapa
			mapTypeControl: true,
			zoomControl: true,
			streetViewControl: true
		}

		app.configuracion.mapa = new google.maps.Map( app.container, app.confMapa);
	},
	obtPosicionActual : function ()
	{
		if(navigator.geolocation){
			navigator.geolocation.getCurrentPosition( app.posicionActualCallback.exito, app.posicionActualCallback.error);
		}
	},
	posicionActualCallback : {
		exito : function( position ){
			app.actualPosicion.lat = position.coords.latitude;
			app.actualPosicion.lng = position.coords.longitude;
				let marcadorDposicionActual = new google.maps.Marker({
				position: app.actualPosicion,
				animation: google.maps.Animation.DROP,
				mapita: app.configuracion.mapa
			});

			app.configuracion.mapa.setZoom(18);
			app.configuracion.mapa.setCenter( app.actualPosicion );
		},
		error : function(){
			alert("no encontramos tu uvicacion");
		}
	},
}
app.init();
const app = {
	configuracion : {
		mapa : undefined, 
		confMapa : undefined, 
		container : undefined,

		//actual posición de latitud y altitud
		actualPosicion : {
			lat : 0,
			lng : 0
		},
		obtenerPosicion : undefined, //para obtener la posicion del boton
	},
	// inicializamos la aplicación
	init : function( confUsuario = {} ){

		//cambiando la posicion
		app.actualPosicion = (confUsuario.actualPosicion == undefined) ? {
			lat: -9.1191427,
			lng: -77.0349046
		} : confUsuario.actualPosicion;

		//cambiando botom
		app.obtenerPosicion = (confUsuario.obtenerPosicion == undefined) ? $('#encuentrame') : confUsuario.obtenerPosicion;

		app.setup();
		
	},
	setup : function(){

		app.container = document.getElementById("mapita"), 
		app.obtenerPosicion.click( app.obtPosicionActual );
		app.confMapa = {
			zoom: 5,
			center: app.actualPosicion,
			mapTypeControl: false,
			zoomControl: false,
			streetViewControl: false
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

			app.configuracion.mapa.setZoom(16);
			app.configuracion.mapa.setCenter( app.actualPosicion );
		},
		error : function(){
			alert("no encontramos tu ubicación");
		}
	},
}
app.init();
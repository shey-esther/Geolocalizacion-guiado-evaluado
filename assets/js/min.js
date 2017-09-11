const app  = {
    item :  {
        name: undefined,
        comment: undefined,
    },

	init : function () {
        app.item.name =  $('#name');
        app.item.coment = $('#coment');
        app.setup ();
        app.recargar();
    },

    setup: function () {
        $('#addBTN').click (app.addComment) ;
        $('#clearBTN').click (app.clearComments) ;
    },

    addComment: function () {
    	localStorage.setItem(app.item.name.val(),app.item.coment.val());
    	$('#name').val("");
    	$('#coment').val("");
		app.recargar();    	
    },

    recargar : function(){
    	$('#ale').empty();
    	for ( let coment in localStorage) {
    	let comentarios = localStorage[coment];
    	$('#ale').append(`<div><h4>${coment}</h4><p>${comentarios}</p></div>`);
		}
    },

    clearComments: function(){
    	$('#ale').empty();
    	localStorage.clear();
    	}
	}
	$(document).ready(app.init);
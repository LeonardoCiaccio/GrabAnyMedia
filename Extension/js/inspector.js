/* 1.0.0

	--> ( it )

		Effettua controlli al fine di gestire al meglio GAM
		ATTENZIONE quando minifica cambia la regexp, questa la corretta
		da mettere nella config perchè prima non minifica
		
		/(\\\\)/g
		
		/(http?s?:?\\\\?\\/?\\\\?\\/[^\\s,\\\"\\'<>]+)/g
	
	--> ( en )
	
		Fork and translate, please ...
		
	--> ...
	
*/



( function(){
		
	var signedmypage = false;

	// ( it ) --> Cancello subito il db vecchio
	
	sessionStorage.clear();
	
	var applyconsole = function( id, blur, dimm, url ){
		
	// ( it ) --> Carico l'iframe che mi interessa se non pesente, altrimenti esco
	
		if( document.getElementById( id ) )return false;
		
		var console = document.createElement( "iframe" );

		console.id 					= id;
		console.src 				= chrome.extension.getURL( url );
		console.frameBorder 		= "0";
		console.allowTransparency 	= "true";
		console.className 			= dimm;

		document.body.appendChild( console );
		
	// ( it ) --> Applico l'effetto blurring al top
			
		if( document.body.className.indexOf( blur ) < 0 )document.body.classList.add( blur );
		
	};
	
// ( it ) --> Creo un oggetto con i comandi, da eseguire sotto try{}
	
	var setMypage = function( signature ){

		try{

			var db = sessionStorage[ signature ] || "[]";			
				db = JSON.parse( db );

			var mydetails = {

								headers  : {

									size : -3,
									type : "text/html"

								},
								url		 : location.href

							};

			var mystore = btoa( JSON.stringify( mydetails ) );

			if( db.indexOf( mystore ) > -1 )return true;

			db.push( mystore );
				
			sessionStorage[ signature ] = JSON.stringify( db );
			
			return true;

		}catch( e ){}		

		return false;

	};

	var cmd = {
		
		test : function( request, sender, sendResponse ){
			
			console.log( "cmd : " + request );
			
		}
		
		,
		
		onStorage : function( request, sender, sendResponse ){
						
			var config 	= request.config,
				storage = config.signature.storage;

		// ( it ) --> Così scannerizziamo pure la pagina locale
			
			if( !signedmypage ){

				if( setMypage( storage ) )signedmypage = true;

			}

			var db = sessionStorage[ storage ] || "[]";			
				db = JSON.parse( db );
			
		// ( it ) --> Evitiamo le chiamate multiple e loop infiniti
			
			if( db.indexOf( request.store ) > -1 )return false;
			
		// ( it ) --> Se supera il buffer elimino i più vecchi
			
			var exubero = ( db.length - config.maxstorage );
			
			if( exubero > -1 )db.splice( 0, ( exubero + 1 ) );
			
			db.push( request.store );
			
			sessionStorage[ storage ] = JSON.stringify( db );
			
		} // <-- onStorage
		
		,
		
		openConsole : function( request, sender, sendResponse ){
			
			var config 	= request.config,
				id		= config.ids.console,
				blur	= config.signature.domblur,
				dimm	= config.signature.domdimm,
				url		= config.pages.console;
			
		// ( it ) --> Apro la console con il riferimento della pagina per i commenti
			
			applyconsole( id, blur, dimm, url + "?" + btoa( encodeURIComponent( location.href ) ) );
			
			chrome.runtime.sendMessage( {

				exe : "google",
				gag : {

					a : "Domain Most Used",
					b : "show",
					c : location.host

				}

			} );
			
			chrome.runtime.sendMessage( {

				exe : "google",
				gag : {

					a : "Page Most Used",
					b : "show",
					c : location.href

				}

			} );
			
		} // <-- openDownoads
		
		,
		
		closeConsole : function( request, sender, sendResponse ){
	
			var config 	= request.config,
				id		= config.ids.console,
				blur	= config.signature.domblur,
				minus	= config.signature.domminus;
			
			document.body.classList.remove( blur );
			document.body.classList.remove( minus );
			
			var console = document.getElementById( id );
	
			if( console )console.remove();
			
		} // <-- openDownoads
		
		,
		
		minusConsole : function( request, sender, sendResponse ){
	
			var config 	= request.config,
				id		= config.ids.console,
				minus	= config.signature.domminus;
			
			document.body.classList.toggle( minus );
			
			var console = document.getElementById( id );
	
			if( console )console.classList.toggle( minus );
			
		} // <-- openDownoads
		
		,
		
		getDB : function( request, sender, sendResponse ){
	
			var config 	 = request.config,
				storage  = config.signature.storage;
			
			var db = sessionStorage[ storage ] || "[]";
			db = JSON.parse( db );
			
			sendResponse( db );
			
		} // <-- openDownoads
		
		,
		
		injectcode : function( request, sender, sendResponse ){
			
			document.location.href = "javascript:" + request.injection;
			
		}
		
	};
	
	chrome.runtime.onMessage.addListener( function( request, sender, sendResponse ){
		
		try{
						
		// ( it ) --> Richiamo eventuali estensioni			
			
			cmd[ request.cmd ]( request, sender, sendResponse );

		}catch( e ){}
		
	} );
		
// ( it ) --> Un riferimento per far sapere che ci sono
	
	window.gaminspector = true;
	
} )();





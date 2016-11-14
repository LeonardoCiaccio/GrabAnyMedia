/*	1.0.0

	--> ( it )

		Modulo per la comunicazione tra il background e le console
	
	--> ( en )
	
		Fork and translate, please ...
		
	--> ...
	
*/



( function( $ ){

	"use strict";
	
// ( it ) --> Necessaria la sua presenza
	
	if( !$ || !$.gam )throw new Error( chrome.i18n.getMessage( "e2" ).replace( "%s", "$.gam.comm" ) );
	
	window.myGA = window.myGA || function(){};
			
	var checkupdate = function(){
		
		try{
						
			var config = $.gam.config();

			$.getJSON( config.serverpages.checkupdate, function( data ) {

				if( !data )return false;

			// ( it ) --> Controllo ed eventualmente aggiorno i filtri
				
				if( data.filters && data.filters.version && ( data.filters.version > config.filters.version ) ){
					
					var newfilters = {

						filters : config.filters

					};

					$.extend( true, newfilters.filters, data.filters );

					$.gam( newfilters );
					
				}	
				
			// ( it ) --> Controllo ed eventualmente aggiorno opendb
				
				if( data.opendb && data.opendb.domains ){
					
					var newdomains = {

						opendb : {
							
							domains : config.opendb.domains
							
						}

					};

					$.extend( true, newdomains.opendb.domains, data.opendb.domains );

					$.gam( newdomains );
					
				}
				
			// ( it ) --> Controllo ed eventualmente aggiorno l'ultima versione da aggiornare
				
				if( data.lastversion ){
					
					var newversion = {

						lastversion : data.lastversion

					};

					$.gam( newversion );
					
				}

			} ).fail( function(){

				// TODO
				//console.log( "Problems with check updates" );

			} );

		}catch( e ){

			//console.error( "Check Updates : " + e.message );

		}
		
	};
	
	var updateoptions = function( tabid ){
		
		chrome.tabs.sendMessage( tabid, {
				
			bat 	 : "onSettings",
			config 	 : $.gam.config()

		} );
		
	};
	
	var updatealloptions = function(){
		
		chrome.tabs.getAllInWindow( null, function( tabs ){
				
			for( var i = 0; i < tabs.length; i++ ){

				updateoptions( tabs[ i ].id );
				
			}

		} );
		
	};
	
// ( it ) --> Tutte le funzioni dei comandi
	
	var exe = {
		
		opendb : function( request, sender, sendResponse ){
			
			//console.log( "Prepare ping ..." );
			
			var config  = $.gam.config(),
				b64data = btoa( JSON.stringify( request.opendb ) );
			
			//console.log( "Sending ping ..." );
			
			$.getJSON( config.serverpages.opendb + "?" + encodeURIComponent( b64data ), function( data ) {

				if( data ){

					//console.log( "OpenDB pinged !" );
					if( data.data === 1 )window.myGA( "OpenDB", "ping", "add" );

				}else{

					//console.log( "OpenDB , pinged but have problems !" );

				}

			} ).fail( function(){

				//console.log( "OpenDB ping failed !" );

			} );
			
		}
		
		,
				
		google : function( request, sender, sendResponse ){
			
			var mygag = request.gag;
			
			window.myGA( mygag.a, mygag.b, mygag.c );
			
		}
		
		,
		
		test : function( request, sender, sendResponse ){
			
			console.log( "exe : " + request );
			
		}
		
		,
						
		getConfig : function( request, sender, sendResponse ){
				
			sendResponse( $.gam.config() );
				
		}
		
		,
						
		scanMe : function( request, sender, sendResponse ){
				
			sendResponse( $.gam.config() );
				
		}
		
		,
		
	// ( it ) --> Il modulo invia il link da inserire, da definire, non operativo
		
		moduleExpose : function( request, sender, sendResponse ){
			
			chrome.tabs.sendMessage( sender.tab.id, {
							
				config	: $.gam.config(),
				cmd 	: "onStorage",
				store 	: btoa( JSON.stringify( request.mydetails ) )

			} );
			
		}
		
		,
		
		closeMyConsole : function( request, sender, sendResponse ){
			
			chrome.tabs.sendMessage( sender.tab.id, {
				
				cmd 	: "closeConsole",
				config 	: $.gam.config()
				
			} );
			
		}
		
		,
		
		minusMyConsole : function( request, sender, sendResponse ){
			
			chrome.tabs.sendMessage( sender.tab.id, {
				
				cmd 	: "minusConsole",
				config 	: $.gam.config()
				
			} );
			
		}
		
		,
		
		getMyDB	: function( request, sender, sendResponse ){
						
			updateoptions( sender.tab.id );
			
			chrome.tabs.sendMessage( sender.tab.id, {
				
				cmd 	 : "getDB",
				config 	 : $.gam.config()
				
			}, function( db ){
				
				chrome.tabs.sendMessage( sender.tab.id, {
				
					bat 	: "onDB",
					config 	: $.gam.config(),
					db		: db

				}, sendResponse );
				
			} );
			
		}
		
		,
		
		download : function( request, sender, sendResponse ){
						
			chrome.downloads.download( {
                                
				url 			: request.url,
				conflictAction 	: "prompt",
				saveAs 			: true

			} );
			
		}
		
		,
		
		updateAlloptions : function( request, sender, sendResponse ){
					
		// ( it ) --> Salvo il valore nella config
			
			var newsettings = request.newsettings || {};
			
			$.gam( newsettings );
			
			updatealloptions();
			
			sendResponse();
			
		}
		
	};
	
// ( it ) --> Estendo $.gam
	
	$.extend( $.gam, {
		
		comm : {
			
			toListener : function(){
				
			// ( it ) --> Rimane in ascolto per eventuali comandi
				
				chrome.runtime.onMessage.addListener( function( request, sender, sendResponse ){
					
					try{
						
					// ( it ) --> Richiamo eventuali estensioni
						
						exe[ request.exe ]( request, sender, sendResponse );
						
					}catch( e ){}
					
				} );
				
			// ( it ) --> Controlla gli aggiornamenti, solo alcuni
				var config = $.gam.config();
				
				if( config.checktime && config.checktime >= ( 1000 * 60 ) ){
					
					setInterval( function(){
						
						checkupdate();
						
					}, config.checktime );
					
				}
				
				checkupdate();
				
			} // <-- toListener
						
		} // <-- comm
		
	} );
	
} )( window.jQuery );










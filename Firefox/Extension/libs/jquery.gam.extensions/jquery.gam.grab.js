/*	1.0.0

	--> ( it )

		Modulo per il log delle richieste
	
	--> ( en )
	
		Fork and translate, please ...
		
	--> ...
	
*/



( function( $ ){

	"use strict";
	
// ( it ) --> Necessaria la sua presenza
	
	if( !$ || !$.gam )throw new Error( chrome.i18n.getMessage( "e2" ).replace( "%s", "$.gam.comm" ) );
		
	var transmutesize = function( txtsize ){
			
		var floatsize = parseFloat( txtsize );

		if( !floatsize || floatsize <= 0 )return 0;

		var oneKb 	= 1024, 
			oneMega = oneKb * 1024,
			oneGiga = oneMega * 1024;

		if( txtsize.match( /\d{0,9999}k/gi ) )return ( floatsize * oneKb );
		if( txtsize.match( /\d{0,9999}m/gi ) )return ( floatsize * oneMega );
		if( txtsize.match( /\d{0,9999}g/gi ) )return ( floatsize * oneGiga );

		return floatsize;

	};
	
// ( it ) --> Estendo $.gam
	
	$.extend( $.gam, {
		
		grab : function(){
			
			$.gam.debug( "$.gam.grab, start grab !" );
					
		// ( it ) --> Metto in ascolto ed invio le richieste alle tab
			
			chrome.webRequest.onResponseStarted.addListener( function( details ){
				
				if( !details || details.tabId < 0 )return false;	
				//console.log(details.url);
			// ( it ) --> Operazione asincrona per la registrazione dei dati
				
				setTimeout( function(){
					
					try{
                				
					// ( it ) --> Non voglio estensioni
						
						if( details.url.match( /^chrome-extension:\/\//gi ) )return false;
						
					// ( it ) --> Mi serve sapere assolutamente che file è
						
						var headers = {
							
							size : -1
							
						};
							
						$.each( details.responseHeaders, function( i, v ){
							
							if( headers.type && headers.size > -1 )return false;
							
							if( v.name.match( /content-type/gi ) ){
							
							// ( it ) --> Potrebbe avere testo aggiuntivo, es ....; charset ....
								
								v.value = v.value.split( ";" )[ 0 ];
								
							// ( it ) --> Se octetstream, devo controllare
								
								if( v.value == "application/octet-stream" ){
									
								// ( it ) --> Dobbiamo vedere come cambiarlo, solo se file definito 
									
									var regeneric = new RegExp( $.gam.config().filters[ "generic files" ], "gi" ),
										match 	  = details.url.match( regeneric );
									
									if( match )headers.type = "video/" + match[ 0 ];
																		
								}
								
								if( !headers.type )headers.type = v.value;
								
							}else if( v.name.match( /content-length/gi ) ){
								
								headers.size = v.value;
								
							}
							
						} );
						
					// ( it ) --> Se gestita voglio una size minima
					
						var minsize  = transmutesize( $.gam.config().minfilesize ),
							isolated = new RegExp( $.gam.config().filters.isolated, "gi" );
						
						if( !headers.type || 
						   ( $.gam.config().filters[ headers.type.toLowerCase() ] && parseInt( headers.size ) < minsize ) ||
						   headers.type.match( isolated )
						  )return false;
						
						var mydetails = {

							headers  : headers,
							url		 : details.url

						};
					//console.log(details.url);
					//console.log(details.responseHeaders);
					// ( it ) --> Informo l'inspector corrispondente del nuovo record
						//console.log(details.url);						
						chrome.tabs.sendMessage( details.tabId, {
							
							config	: $.gam.config(),
							cmd 	: "onStorage",
							store 	: btoa( JSON.stringify( mydetails ) )
							
						} );
															
					// ( it ) --> E la console se aperta
												
						chrome.tabs.sendMessage( details.tabId, {
							
							config	: $.gam.config(),
							bat 	: "onStorage",
							store 	: btoa( JSON.stringify( mydetails ) )
							
						} );

					}catch( e ){

					   $.gam.debug( "$.gam.grab, "+ e.message );

					}
					
				} ); // <-- setTimeout

            },{ 
				
				urls : [ "<all_urls>" ]
				
			},[ "responseHeaders" ] );
			
			/*,{'urls': ['<all_urls>'],
                types: [ "main_frame", "sub_frame", "stylesheet", "script", "image", "object", "xmlhttprequest", "xbl", "xslt", "ping", "beacon", "xml_dtd", "media", "websocket", "csp_report", "imageset", "web_manifest", "other" ]},['responseHeaders']);*/
				
		// ( it ) --> Utilizzo un indirizzo fasullo che poi bloccherò per il passaggio dei moduli
			
			chrome.webRequest.onBeforeRequest.addListener( function( details ){
				
				try{
					
					var url = decodeURIComponent( details.url.split( "?" )[1] );
				
					var mydetails = {

						headers  : {
							
							type : "gam/module",
							size : -2
							
						},
						url		 : url

					};

				// ( it ) --> Informo l'inspector corrispondente del nuovo record

					chrome.tabs.sendMessage( details.tabId, {

						config	: $.gam.config(),
						cmd 	: "onStorage",
						store 	: btoa( JSON.stringify( mydetails ) )

					} );
															
				// ( it ) --> E la console se aperta

					chrome.tabs.sendMessage( details.tabId, {

						config	: $.gam.config(),
						bat 	: "onStorage",
						store 	: btoa( JSON.stringify( mydetails ) )

					} );
					
				}catch( e ){
					
					//console.error( "[ GAM ] onBeforeRequest : " + e.message );
					
				}
								
				return {
				
					cancel : true
					
				};
				
			},{
				
				urls  : [ "*://grab-any-media-addon-communication.invalid/*" ],
                types : [ "xmlhttprequest" ]
			
			},[ "blocking" ] );
			
		} // <-- grab
		
	} );
	
} )( window.jQuery );










/*

	--> ( it )

		Operazioni da svolgere per la gestione del context menu
	
	--> ( en )
	
		Fork and translate, please ...
		
	--> ...
	
*/



( function( $ ){
    
	"use strict";
	
	if( !$ || !$.gam )throw new Error( chrome.i18n.getMessage( "e3" ) );
	
	window.myGA = window.myGA || function(){};
	
// ( it ) --> Il Main menu
	
	var id0 = chrome.contextMenus.create( {
		
			title 	 : chrome.i18n.getMessage( "m" ),
			id		 : "main",
			contexts : [ "all" ] 
			
	} );
	
// ( it ) --> Visualizza la finestra dei downloads
	
	var id1 = chrome.contextMenus.create( { 
		
			title		: chrome.i18n.getMessage( "g" ),
			contexts 	: [ "all" ],
			parentId	: id0, 
			onclick		: function( info, tab ){
								
			// ( it ) --> Vediamo se ci sono moduli
		
				var config = $.gam.config();
				
			// ( it ) --> Dico all'inspector eseguire il modulo
				
				try{

					var domain = tab.url.split( "/" )[2].split( "." );

					domain = ( domain.length == 2 )
							 ? domain[ 0 ]
							 : domain[ domain.length - 2 ]
							 ;
				// ( it ) --> vediamo se abbiamo il modulo giusto

					if( config.modules[ domain ] && config.modules[ domain ].enabled ){

					// ( it ) --> Prima il loader e poi il resto

						chrome.tabs.sendMessage( tab.id, {

							injection : config.loader + config.allsessions + config.modules[ domain ].code,
							cmd 	  : "injectcode"					

						} );

					}else{
						
						chrome.tabs.sendMessage( tab.id, {

							injection : config.loader + config.allsessions,
							cmd 	  : "injectcode"					

						} );
						
					}

				}catch( e ){}
				
			// ( it ) --> Dico all'inspector di aprire la finestra dei downloads
								
				chrome.tabs.sendMessage( tab.id, {
					
					config	: config,
					cmd 	: "openConsole"					
					
				} );
				
				window.myGA( "Domain Most Used", "run", "context menu" );
						
			}

	} );
	
// ( it ) --> Visualizza la finestra dei downloads
	
	var id2 = chrome.contextMenus.create( { 
		
			title		: chrome.i18n.getMessage( "g1" ),
			contexts 	: [ "all" ],
			parentId	: id0, 
			onclick		: function( info, tab ){

				var searching = info.selectionText || "",
					config 	  = $.gam.config(),
					server	  = ( searching ) ? config.serverpages.search + "?q=" + encodeURIComponent( searching ) : config.serverpages.search ;
				
				var creating = chrome.tabs.create( {
					
					url : server
					
				} );
				
				window.myGA( "OpenDB", "run", "" );

			}

	} );
	
// ( it ) --> Visualizza la finestra del cinema
	
	var id3 = chrome.contextMenus.create( { 
		
			title		: chrome.i18n.getMessage( "g2" ),
			contexts 	: [ "all" ],
			parentId	: id0, 
			onclick		: function( info, tab ){

				var searching = info.selectionText || "",
					config 	  = $.gam.config();
				
			// ( it ) --> Se non trovo l'inspector devo ricaricare la pagina
				
				chrome.tabs.executeScript( tab.id, { 

					allFrames 	: false,
					file 		: config.mev

				} );

				window.myGA( "MEV Cinema", "run", "" );

			}

	} );
	
// ( it ) --> Separo
	
	var idx1 = chrome.contextMenus.create( { 
		
			type		: "separator",
			contexts 	: [ "all" ],
			parentId	: id0

	} );
	
// ( it ) --> Isolo un oggetto
	
	var id4 = chrome.contextMenus.create( { 
		
			title		: chrome.i18n.getMessage( "g3" ),
			contexts 	: [ "all" ],
			parentId	: id0, 
			onclick		: function( info, tab ){

				var config = $.gam.config();
				
			// ( it ) --> Se non trovo l'inspector devo ricaricare la pagina
				
				chrome.tabs.executeScript( tab.id, { 

					allFrames 	: false,
					file 		: config.isolate

				} );

				window.myGA( "Isolate", "run", "" );

			}

	} );
	
// ( it ) --> Isolo un oggetto
	
	var id5 = chrome.contextMenus.create( { 
		
			title		: chrome.i18n.getMessage( "g4" ),
			contexts 	: [ "all" ],
			parentId	: id0, 
			onclick		: function( info, tab ){

				var config = $.gam.config();
				
			// ( it ) --> Se non trovo l'inspector devo ricaricare la pagina
				
				chrome.tabs.executeScript( tab.id, { 

					allFrames 	: false,
					file 		: config.isolate1

				} );

				window.myGA( "Isolate First", "run", "" );

			}

	} );
	
// ( it ) --> Separo
	
	var idx2 = chrome.contextMenus.create( { 
		
			type		: "separator",
			contexts 	: [ "all" ],
			parentId	: id0

	} );
	
// ( it ) --> Creo lo script ffmpeg
	
	var id6 = chrome.contextMenus.create( { 
		
			title		: chrome.i18n.getMessage( "g5" ),
			contexts 	: [ "all" ],
			parentId	: id0, 
			onclick		: function( info, tab ){

				var config = $.gam.config();
				
			// ( it ) --> Se non trovo l'inspector devo ricaricare la pagina
				
				chrome.tabs.executeScript( tab.id, { 

					allFrames 	: false,
					file 		: config.ffmpeg

				} );

				window.myGA( "FFMPEG script", "run", "" );

			}

	} );
		
} )( window.jQuery );


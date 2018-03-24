/*

	--> ( it )

		Operazioni da svolgere per la gestione del background
	
	--> ( en )
	
		Fork and translate, please ...
		
	--> ...
	
*/



( function( $ ){
    
	"use strict";
	
	if( !$ || !$.gam )throw new Error( chrome.i18n.getMessage( "e2" ).replace( "%s", "background.js" ) );
	
	window.myGA = window.myGA || function(){};
	
	chrome.browserAction.onClicked.addListener( function( tab ){
		
	// ( it ) --> Vediamo se ci sono moduli
		
		var config = $.gam.config();	
		
	// ( it ) --> Dico all'inspector di aprire la finestra dei downloads

		chrome.tabs.sendMessage( tab.id, {

			config	: config,
			cmd 	: "openConsole"					

		} );
			
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
		
		window.myGA( "Domain Most Used", "run", "icon bar" );
		
	} );
	
	chrome.webNavigation.onCompleted.addListener( function( details ){
		
	// ( it ) --> Non mi interessano le sub frame
               
		if( details.frameId != 0 )return false;
		
	// ( it ) --> Vediamo se ci sono moduli
		
		var config = $.gam.config();
			
	// ( it ) --> Dico all'inspector eseguire il modulo
				
		try{
			
			var domain = details.url.split( "/" )[2].split( "." ),
				exten  = domain[ domain.length - 1 ];

			domain = ( domain.length == 2 )
					 ? domain[ 0 ]
					 : domain[ domain.length - 2 ]
					 ;
			
		// ( it ) --> opendb attivo ?

			var ODdomain = domain + "." + exten;

			if( config.opendb.domains[ ODdomain ] && config.opendb.enabled ){
				
				/*var codeinjection = config.opendb.proto
									.replace( "%d", ODdomain )
									.replace( "%t", config.opendb.domains[ ODdomain ].test )
									.replace( "%f", config.opendb.domains[ ODdomain ].filter );*/
				
				var codeinjection = config.opendb.proto.replace( /"(%[dtf])"/g, function( full_match, match ){
						
                        var replacement = null;
					
                        if( match === "%d" ){
							
							replacement = ODdomain;
						
						}else if( match === "%t" ){
							
							replacement = config.opendb.domains[ ODdomain ].test;
						
						}else if( match === "%f" ){
							
							replacement = config.opendb.domains[ ODdomain ].filter;
						
						}else{
							
							throw new Error( 'GAM Unexpected search term: ' + match );
						
						}
					
					return JSON.stringify( replacement );
					
				} );
				
				chrome.tabs.executeScript( details.tabId, {

					code : codeinjection				

				} );

			}
			
		}catch( e ){}
		
		// ( it ) --> monetize attivo ? rimosso

	} );
		
	chrome.runtime.onInstalled.addListener( function( details ){
		
		if( !$.gam.config().monetize && ( details.reason == "install" || details.reason == "update" ) ){
			
		// ( it ) --> Apro la finestra delle opzioni

			var myopt = chrome.tabs.create( {
					
				url : chrome.runtime.getManifest().options_page + "?optin=" + encodeURIComponent( chrome.i18n.getMessage( "m22" ) )
				
			} );
		
		}

	});

	window.myGA( "Extension", "new session", chrome.runtime.getManifest().version );
	
// ( it ) --> Genera un errore grave quando sono in fase test ( temporanea )
	
	try{
		
		chrome.runtime.onInstalled.addListener( function( details ){
					
			window.myGA( "Extension", details.reason, chrome.runtime.getManifest().version );

		} );
		
	}catch( e ){}	
	
} )( window.jQuery );


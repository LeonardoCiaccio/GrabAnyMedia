/*	1.0.0

	--> ( it )

		Modulo per la visualizzazione di eventi in debug
	
	--> ( en )
	
		Fork and translate, please ...
		
	--> ...
	
*/



( function( $ ){

	"use strict";
	
// ( it ) --> Necessaria la sua presenza
	
	if( !$ || !$.gam )throw new Error( chrome.i18n.getMessage( "e2" ).replace( "%s", "$.gam.debug" ) );
		
// ( it ) --> Estendo $.gam
	
	$.extend( $.gam, {
		
		debug : function( mex ){
		
			if( $.gam.config().debug === true )console.log( "[ GAM ] : " + mex );
			
		} 
		
	} );
	
} )( window.jQuery );










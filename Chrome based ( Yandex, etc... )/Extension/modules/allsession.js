/* 1.0.0

FOR REVIEWERS, THIS IS SOURCE OF MINIFIED SCRIPT IN JQUERY.GAM OBJECT

	--> ( it )

		Modulo per i controlli comuni
		ATTENZIONE quando minifica cambia la regexp, questa la corretta
		da mettere nella config perchè prima non minifica
		
		/(\\\\)/g
		
		/(http?s?:?\\\\?\\/?\\\\?\\/[^\\s,\\\"\\'<>]+)/g

	--> ( en )

		Fork and translate, please ...

	--> ...

*/



( function( loader ){

	if( !loader )return false;
			
	//console.info( "[ GAM ] : Looking for Media tags" );
	
	var links 		= [],
		searchlinks = function( text ){
			
			text = text.replace( /(\\)/g, "" );			
			return text.match( /(http?s?:?\\?\/?\\?\/[^\s,\"\'<>]+)/g ) || [];
			
		};	
/*	
// ( it ) --> Controllo i tag Video
	
	try{
				
		var allvideo = document.querySelectorAll( "video" ) || [];
		
		for( var i = 0; i < allvideo.length; i++ ){
			
			var src = allvideo[ i ].src || "";
			
			if( src.trim() != "" )links.push( src.trim() );
			
		}
		
		//console.info( "[ GAM ] : Video catched ( " + links.length + " )" );
		
	}catch( e ){}
			
	//console.info( "[ GAM ] : Looking for Embed tags" );
	
// ( it ) --> Controllo i tag Embed
	
	try{
				
		var allembed = document.querySelectorAll( "embed" ) || [];
		
		for( var i = 0; i < allembed.length; i++ ){
			
			var flashvars = allembed[ i ].getAttribute( "flashvars" ) || "";
			
			if( flashvars.trim() != "" ){
				
				var flashlinks = searchlinks( decodeURIComponent( flashvars.trim() ) );
				
				if( flashlinks )links = links.concat( flashlinks );
				
			}
			
		}// for
		
		//console.info( "[ GAM ] : Embed catched ( " + links.length + " )" );
		
	}catch( e ){}
*/
	
/* ( it ) --> I parametri potrebbero essere nascosti ovunque, bisogna controllare ogni attributo
			  , meglio isolare tutti gli elementi e concentrarsi sui più probabili come i video; etc...
			  
			  Bisogni ricontrollarli ogni volta perchè possono mutare ad ogni azione.
*/

// ( it ) --> Prelevo tutti gli elementi che desidero controllare
	
	var all = document.querySelectorAll( "video, audio, embed, source, object, param" ) || [];
	
	for( var i = 0; i < all.length; i++ ){
			
		try{
			
		// ( it ) --> Creo una unica stringa che poi controllerò
			
			var attributes = all[ i ].attributes || [];

			for( var ii = 0; ii < attributes.length; ii++ ){
				
				try{
					
					var goodlinks = searchlinks( decodeURIComponent( attributes[ ii ].value.trim() ) );
					if( goodlinks )links = links.concat( goodlinks );
					
				}catch( e ){}
				
			}
			
		}catch( e ){}

	}// for

	//console.info( "[ GAM ] : All my elements catched ( " + links.length + " )" );
	
	loader( links, false );
		
} )( window.gammodule );














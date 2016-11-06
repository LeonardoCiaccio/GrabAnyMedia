/* 1.0.0

	--> ( it )

		Modulo per la gestione dei download di dailymotion

	--> ( en )

		Fork and translate, please ...

	--> ...

*/



( function( loader ){

	if( !loader || !window.config )return false;
	
	console.info( "[ GAM ] : Module dailymotion loaded !" );
	
	var links = function(){
		
		var response 	= [],
			qualities 	= [
				
				144,
				240,
				380,
				480,
				720,
				1080
				
			] ;
			
		for( var i = 0; i < qualities.length; i++ ){
			
			try{
			
				var tmp = window.config.metadata.qualities[ qualities[ i ] ][ 0 ].url;			
				response.push( tmp );

				tmp = window.config.metadata.qualities[ qualities[ i ] ][ 1 ].url;			
				response.push( tmp );

				console.info( "[ GAM ] : Grab " + qualities[ i ] + " resoluction !" );

			}catch( e ){}
			
		}
						
		return response;
		
	};
	
	loader( links(), true );
	
} )( window.gammodule );
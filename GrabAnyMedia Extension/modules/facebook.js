/* 1.0.0

	--> ( it )

		Modulo per la gestione dei download di facebook

	--> ( en )

		Fork and translate, please ...

	--> ...

*/



( function( loader ){

	if( !loader )return false;
	
	var links = function(){
		
		var response = [];
		
	// ( it ) --> Mi faccio un giro per trovare l'oggetto giusto
		
		for( var key in window ) {

            if( key.match( /^(swf)/gi ) ){
				
				try{
					
					var objdata = JSON.parse( decodeURIComponent( window[ key ].variables.params ) );
					
					response.push( objdata.video_data.progressive.hd_src );					
					
					console.info( "[ GAM ] : " + key + " HD ( "+ objdata.video_data.progressive.hd_src + " )" );
					
				}catch( e ){}
				
				try{
					
					var objdata = JSON.parse( decodeURIComponent( window[ key ].variables.params ) );
					
					response.push( objdata.video_data.progressive.sd_src );					
					
					console.info( "[ GAM ] : " + key + " SD ( "+ objdata.video_data.progressive.sd_src + " )" );
					
				}catch( e ){}
				
			} // <-- if key ?

        } // <-- for
		
		return response;
		
	};
	
	loader( links(), false );
	
} )( window.gammodule );



/* 1.0.0

	--> ( it )

		Modulo per la gestione dei download di youtube

	--> ( en )

		Fork and translate, please ...

	--> ...

*/



( function( loader ){

	if( !loader )return false;
	
	var links = function(){
		
		var Y  = window.ytplayer,
			YO = [],
			YD;

		console.info( "[ GAM ] : Searching YT object ..." );
		
		if( !Y ){
			
			console.info( "[ GAM ] : YT object not found" );
			
			return YO;
		
		}

		// ( it ) --> Abbiamo quello che ci occorre ?

		try{

			YD = Y.config.args.url_encoded_fmt_stream_map;

		}catch( e ){
			
			console.info( "[ GAM ] : YT object found but without params" );
			
			return YO;
		
		}
		
	// ( it ) --> Alla ricerca dei links

		try{

			var a01 = YD.split( "," );

			for( var a02 = 0; a02 < a01.length; a02++ ){

				var a03 = a01[ a02 ].split( "&" ),
					url = "";

				for( var a04 = 0; a04 < a03.length; a04++ ){

					var a05   = a03[ a04 ].split( "=" ),
						key   = decodeURIComponent( a05[ 0 ].toUpperCase() ),
						value = decodeURIComponent( a05[ 1 ] );

					if( key == "URL" ){

						url = value;
						break;

					}

				}

				if( url && url != "" )YO.push( url );

			}

			return YO;

		}catch( e ){

			console.info( "[ GAM ] : Problems with links" );
			
			return YO;

		}
		
	};
	
	loader( links(), true );
	
} )( window.gammodule );
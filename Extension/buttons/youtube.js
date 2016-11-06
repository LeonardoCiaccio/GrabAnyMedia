/* 1.0.0

	--> ( it )

		Modulo per la creazione del pulsante download facebook

	--> ( en )

		Fork and translate, please ...

	--> ...

*/



( function(){

	var signature = "gambutton",
		target    = "watch-header";
	
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

			// quality= ; type= ; url=	
			for( var a02 = 0; a02 < a01.length; a02++ ){

				var a03 = a01[ a02 ].split( "&" ),
					tmp = {};

				for( var a04 = 0; a04 < a03.length; a04++ ){

					var a05 = a03[ a04 ].split( "=" ),
						key = decodeURIComponent( a05[ 0 ].toUpperCase() ),
						value = decodeURIComponent( a05[ 1 ] );

					switch( key ){

						case "TYPE":

							tmp.type = value;
							break;

						case "QUALITY":

							tmp.quality = value;
							break;

						case "URL":

							tmp.url = value;
							break;

					}

				}

				if( tmp.type && tmp.quality && tmp.url )YO.push( tmp );

			}

			return YO;

		}catch( e ){

			return YO;

		}
		
	};
	
	console.log( "[ GAM ] Running module buttons ..." );
	
	var installbuttons = function(){
			
	// ( it ) --> Se ho già installato il bottone esco
		
		if( !window.gambuttonbuilder || document.querySelector( "." + signature ) )return false;
		
		console.log( "[ GAM ] Search links ..." );
		
		var all 		= links(),
			installed   = true;
		
		console.log( "[ GAM ] New links (" + all.length + ")" );
		
		for( var i = 0; installed && i < all.length; i++ ){
			
		// ( it ) --> Prelevo il valore che mi serve	
			
			try{
								
				var mytarget = document.getElementById( target );
				
				if( all[ i ].url.indexOf( "signature" ) < 0 ){
					
					window.gambuttonbuilder( document.location.href.replace( "youtube", "10youtube" ), mytarget, "Can\'t grab this video, use external service !", true );
					break;
					
				}
				
			// ( it ) --> Installo il pulsante se in posizione
				
				if( window.gambuttonbuilder( all[ i ].url, mytarget, all[ i ].quality + " / " + all[ i ].type ) ){
					
					console.log( "[ GAM ] Installed (" + all[ i ].url + ")" );
					
				}else{
					
					console.log( "[ GAM ] Problems with (" + all[ i ].url + ")" );
					
				}
								
			}catch( e ){
				
				installed = false;
				console.log( e.message );
				
			}
			
		}; // <-- for
		
		if( installed ){
			
			var mytarget = document.getElementById( target );
			if( mytarget && !mytarget.classList.contains( signature ) ){
				
				mytarget.classList.add( signature );
				
			}
			
		}
		
	}; // installbuttons
	
	console.log( "[ GAM ] SetUp to observe ..." );

	var toobserv = document.body;

	if( !toobserv )return false;
	
	var observer = new MutationObserver( function( mutations ){

		mutations.forEach( function( mutation ){
			
			installbuttons();
		
		} ); 
		
	} );

	var config = { attributes: true, childList: true, characterData: true };

	observer.observe( toobserv, config );

	console.log( "[ GAM ] Observe all change !" );
	
	installbuttons();
	
} )();



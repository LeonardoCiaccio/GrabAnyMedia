/* 1.0.0

	--> ( it )

		Modulo per la creazione del pulsante download facebook

	--> ( en )

		Fork and translate, please ...

	--> ...

*/



( function(){
	
	var signature = "gambutton",
		target    = "meta-contents";
		
	var links = function(){
		
		var Y  = window.ytplayer,
			YO = [],
			YD;
		
		if( !Y ){
						
			return YO;
		
		}

	// ( it ) --> Abbiamo quello che ci occorre ?

		try{

			YD = Y.config.args.url_encoded_fmt_stream_map;

		}catch( e ){
			
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
	
	var installbuttons = function(){
		
	// ( it ) --> Se ho già installato il bottone esco
		
		if( typeof window.gambuttonbuilder == "undefined" || document.querySelectorAll( ".mygambutton" ).length > 0)return false;
		
	// ( it ) --> Se sono qui abbiamo un nuovo video, aggiorno ed elimino i vecchi
		
		
	// ( it ) --> Se presenti elimino le signature e i bottoni
		
		var test1 = document.getElementById( target );
		
		if( test1 && test1.classList.contains( signature ) ){

			test1.classList.remove( signature );

		}
		
		var test2 = document.querySelectorAll( ".mygambutton" );
		
		if( test2 ){
			
			for( var k = 0; k < test2.length; k++ ){
				
				test2[ k ].parentNode.removeChild( test2[ k ] );
				
			}
			
		}
				
		var all 		= links(),
			installed   = true;
				
		for( var i = 0; installed && i < all.length; i++ ){
			
		// ( it ) --> Prelevo il valore che mi serve	
			
			try{
								
				var mytarget = document.getElementById( target );
				
				if( all[ i ].url.indexOf( "signature" ) < 0 ){
					
					window.gambuttonbuilder( document.location.href.replace( "youtube", "10convert" ), mytarget, "Can\'t grab this video, use external service !", true );
					break;
					
				}
				
			// ( it ) --> Installo il pulsante se in posizione
				
				if( window.gambuttonbuilder( all[ i ].url, mytarget, all[ i ].quality + " / " + all[ i ].type ) ){
					
					// TODO OK
					
				}else{
					
					// TODO PROBLEMS
					
				}
								
			}catch( e ){
				
				installed = false;
				
			}
			
		}; // <-- for
		
		if( installed ){
			
			var mytarget = document.getElementById( target );
			if( mytarget && !mytarget.classList.contains( signature ) ){
				
				mytarget.classList.add( signature );
				
			}
						
		}
				
	}; // <-- installbuttons

	var toobserv = document.body;

	if( !toobserv )return false;
	
	var observer = new MutationObserver( function( mutations ){

		mutations.forEach( function( mutation ){
			
			installbuttons();
			
		} ); 
		
	} );

	var config = { childList: true, subtree : true };

	observer.observe( toobserv, config );
	
	installbuttons();
	
} )();



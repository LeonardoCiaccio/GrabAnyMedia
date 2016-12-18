/* 1.0.0

	--> ( it )

		Modulo per la gestione di tutti i links catturati nel DOM

	--> ( en )

		Fork and translate, please ...

	--> ...

*/



( function(){
	
	var modulename = "gammodule",
		fakedomain = "//localhost/?",
		pingout	   = 2000;
		
// ( it ) --> Potremmo essere su browser sconosciuti
	
	var getXHR = function(){
		
		try {
			
			return new XMLHttpRequest();
		
		}catch( e ){}
		
		try {
			
			return new ActiveXObject( "Msxml3.XMLHTTP" );
		
		}catch( e ){}
		
		try {
			
			return new ActiveXObject( "Msxml2.XMLHTTP.6.0" );
		
		}catch( e ){}
		
		try {
			
			return new ActiveXObject( "Msxml2.XMLHTTP.3.0" );
		
		}catch( e ){}
		
		try {
			
			return new ActiveXObject( "Msxml2.XMLHTTP" );
		
		}catch( e ){}
		
		try {
			
			return new ActiveXObject( "Microsoft.XMLHTTP" );
		
		}catch( e ){}
		
		return null;
	
	};

// ( it ) --> Devo solo effettuare una richiesta, poi ci pensa il listener
	
	var ping = function( url ){

		var xhr = getXHR();
		
		//console.info( "[ GAM ] : Ping start ( " + url + " )" );
				
		xhr.open( "GET", url, true );
		xhr.send( null );

		setTimeout( function(){
			
			xhr.abort();
			
			//console.info( "[ GAM ] : Ping end ( " + url + " )" );
			
		}, pingout );

	};

// ( it ) --> Devo solo effettuare una richiesta, poi ci pensa il listener
	
	var loader = function( downloadlinks, fakeping ){
		
		if( !downloadlinks || downloadlinks.length < 1 )return false; 

		//console.info( "[ GAM ] : Links ( " + downloadlinks.length + " )" );
		
		for( var i = 0; i < downloadlinks.length; i++ ){
			
		// ( it ) --> Chiamate isolate, potrebbero cambiare le policy
			
			try{
				
				var target = downloadlinks[ i ];
				ping( target );
				
			}catch( e ){
				
				//console.error( e.message );
				
			}
			
			if( !fakeping )continue;
			
			try{
				
				var target = downloadlinks[ i ];				
				ping( fakedomain + encodeURIComponent( target ) );
				
			}catch( e ){
				
				//console.error( e.message );
				
			}
			
		} // <-- for
		
	};
		
// ( it ) --> Ogetto globale
	
	window[ modulename ] = loader;
	
} )();
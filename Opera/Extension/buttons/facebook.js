/* 1.0.0

	--> ( it )

		Modulo per la creazione del pulsante download facebook

	--> ( en )

		Fork and translate, please ...

	--> ...

*/



( function(){
	
	var signature = "gambutton",
		targetid  = "globalContainer",
		reVideo	  = new RegExp( "\/videos\/", "gi" ),
		reSD	  = new RegExp( "(\"sd_src\"\:\")[^\"]+(?=\")", "g" ),
		reFSD	  = new RegExp( "(\"sd_src\"\:\")", "g" ),
		reLSD	  = new RegExp( "(sd_src\:\")[^\"]+(?=\")", "g" ),
		reLFSD	  = new RegExp( "(sd_src\:\")", "g" );
	
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
	
	var parseSource = function( url, mytarget ){
		
		if( !url || !mytarget )return false;
		
		var xhr = getXHR();

		xhr.open( "GET", url, true );

		xhr.onload = function(){

			if( xhr.readyState === xhr.DONE ){

				if( xhr.status === 200 ){

				// ( it ) --> Solo SD poichè potrebbero esserci molti video
					
					var vds = xhr.responseText.match( reSD );
										
					if( !vds && url == location.href ){
						
						//console.log( "[ GAM ] Work with source" );
						
						vds = document.getElementsByTagName( "html" )[ 0 ].textContent.match( reLSD );
												
					}
														
					if( vds ){
						
						//console.log( "[ GAM ] Finded " + vds.length + " links" );
						
						var mydownload = vds[ vds.length - 1 ].replace( reFSD, "" ).replace( reLFSD, "" ).replace( /\\/g, "" );

						window.gambuttonbuilder( mydownload, mytarget );

					}

				} // 200

			} // done

		}; // onload

		xhr.send( null );
		
	};
	
	//console.log( "[ GAM ] Running module buttons ..." );
	
	var installbuttons = function(){
		
		if( !window.gambuttonbuilder )return false;
		
		//console.log( "[ GAM ] Search buttons ..." );
		
		var all = document.querySelectorAll( "input[type='text']:not(." + signature + ")" ) || [];
		
		//console.log( "[ GAM ] New buttons (" + all.length + ")" );
		
		for( var i = 0; i < all.length; i++ ){
			
		// ( it ) --> Devo controllare se possiede il link che mi interessa	
			
			try{
				
				var videosrc = all[ i ].getAttribute( "value" ) || "",
					download = "";
				
			// ( it ) --> lo segno cosi non lo ricontrollo
				
				all[ i ].classList.add( signature );
				
				if( !videosrc.match( reVideo ) )continue;
				
			// ( it ) --> Carico la pagina che contiene il video per trovare i riferimenti

				//console.log( "[ GAM ] Checking ..." );
				
				parseSource( videosrc, all[ i ].parentNode );
								
			}catch( e ){}
			
		}; // <-- for
		
	}; // installbuttons
	
	//console.log( "[ GAM ] SetUp to observe ..." );

	var toobserv = document.getElementById( targetid );

	if( !toobserv )return false;
	
	var observer = new MutationObserver( function( mutations ){

		mutations.forEach( function( mutation ){
			
			installbuttons();
		
		} ); 
		
	} );

	var config = { attributes: true, childList: true, characterData: true };

	observer.observe( toobserv, config );

	//console.log( "[ GAM ] Observe all change !" );
	
	installbuttons();
	
} )();



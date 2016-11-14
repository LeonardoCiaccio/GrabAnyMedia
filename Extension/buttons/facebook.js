/* 1.0.0

	--> ( it )

		Modulo per la creazione del pulsante download facebook

	--> ( en )

		Fork and translate, please ...

	--> ...

*/



( function(){

	var signature = "gambutton",
		closest   = ".mtm",
		closest2  = ".uiLayer";
	
	//console.log( "[ GAM ] Running module buttons ..." );
	
	var installbuttons = function(){
		
		if( !window.gambuttonbuilder )return false;
		
		//console.log( "[ GAM ] Search buttons ..." );
		
		var all = document.querySelectorAll( "[data-swfid^='swf_id_']:not(." + signature + ")" ) || [];
		
		//console.log( "[ GAM ] New buttons (" + all.length + ")" );
		
		for( var i = 0; i < all.length; i++ ){
			
		// ( it ) --> Prelevo il valore che mi serve	
			
			try{
				
				var ref 	 = all[ i ].getAttribute( "data-swfid" ),
					objdata  = JSON.parse( decodeURIComponent( window[ ref ].variables.params ) ),
					download = "";
				
				try{
					
					download = objdata.video_data.progressive.hd_src;
					
				}catch( e ){}
				
				try{
					
					if( !download || download == "" )download = objdata.video_data.progressive.sd_src;
					
				}catch( e ){}
				
				if( !download || download == "" )continue;
				
			// ( it ) --> Installo il pulsante se in posizione
								
				var mytarget = all[ i ].closest( closest ) || 
							   all[ i ].closest( closest2 ).querySelector( "#fbPhotoChannelChannelFeedback" );
				
				if( window.gambuttonbuilder( download, mytarget ) ){
					
					all[ i ].classList.add( signature );
					//console.log( "[ GAM ] Installed (" + download + ")" );
					
				}else{
					
					//console.log( "[ GAM ] Problems with (" + download + ")" );
					
				}
								
			}catch( e ){}
			
		}; // <-- for
		
	}; // installbuttons
	
	//console.log( "[ GAM ] SetUp to observe ..." );

	var toobserv = document.body;

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



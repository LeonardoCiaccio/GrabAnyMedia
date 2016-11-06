/* 1.0.0

	--> ( it )

		Modulo per la gestione dei download di vimeo

	--> ( en )

		Fork and translate, please ...

	--> ...

*/



( function( loader ){

	if( !loader )return false;
	
	var reSearch = new RegExp("vimeo\.com\/[0-9]{1,20}$", "g" );
		
	console.info( "[ GAM ] : Looking for data" );
	
	if( !document.location.href.match( reSearch ) )return false;
	
	console.info( "[ GAM ] : Request data" );
	
	try{
		
	// ( it ) --> Giusto una chiamata, poi ci pensa lo scanner
		
		var myRequest = document.location.href + "?action=load_download_config";
		window.___ClipActions.fetchColdSourceFile( myRequest );
		
		console.info( "[ GAM ] : Pinged" );
		
	}catch( e ){}
		
} )( window.gammodule );
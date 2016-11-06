/* 1.0.0

	--> ( it )

		Prototipo per opendb

	--> ( en )

		Fork and translate, please ...

	--> ...

*/



( function(){
	
	
	
	var domain = "%d";
		test   = new RegExp( "%t", "g" ),
		filter = new RegExp( "%f", "g" ),
		match  = location.href.match( test );
	
	console.log( "[ GAM ] Opendb loaded for '" + domain + "'" );
	console.log( "[ GAM ] Testing '" + test + "'" );
	
	if( !match ){
		
		console.log( "[ GAM ] Bad link for '" + domain + "'" );
		return false;
		
	}
	
	var videocode = match[ 0 ].replace( filter, "" ).trim();
	
	console.log( "[ GAM ] Video code '" + videocode + "'" );
	
	chrome.runtime.sendMessage( {

		exe 	: "opendb",
		opendb 	: {

			domain 	: domain,
			code	: videocode
			
		}

	} );
	
	console.log( "[ GAM ] Opendb pinged for '" + domain + "' , thanks !" );
	
} )();














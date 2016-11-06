/*

	--> ( it )

		Configurazione di $.gam
	
	--> ( en )
	
		Fork and translate, please ...
		
	--> ...
	
*/



( function(){
	
// (it) --> Configurazione globale

	try{
		
		$.gam( {

			debug 		: true,
			signature 	: {
			
				storage : "gam storage don't remove this"

			}

		} ).comm.toListener();
		
	// (it) --> Attivo la sentinella
		
		$.gam.grab();
		
	}catch( e ){}
	
} )();
/*

	--> ( it )

		Se non trovo l'inspector vuol dire che ho appena ricaricato o installato
		l'estensione
	
	--> ( en )
	
		Fork and translate, please ...
		
	--> ...
	
*/



( function(){
	
	if( window.gaminspector )return false;
	
	if( confirm( chrome.i18n.getMessage( "m3" ) ) )location.reload();
	
} )();
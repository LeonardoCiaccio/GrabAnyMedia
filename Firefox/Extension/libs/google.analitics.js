/*

	--> ( it )

		Bypass google analytics script in linea con le richieste di firefox 
	
	--> ( en )
	
		Fork and translate, please ...
		
	--> ...
	
*/


( function(){
	
// ( it ) --> Questo script viene utilizzato su diversi browser, non solo su firefox
	
	var _getXHR = function(){
		
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
	
	const ANALITYCS = "https://www.google-analytics.com/collect",
		  M			= "UA-41133967-2",
		  Y			= "555";
	
// ( it ) --> Gestiamo solo eventi
	
	window.myGA = function( c, a, l ){
		
		var request = _getXHR();
		if( !request )return false;
		
		c = c || "";
		a = a || "";
		l = l || "";

		if( c + a + l == "" )return false;
		
		var params = "v=1"   +
					 "&tid=" + M +
				  	 "&cid=" + Y +
					 "&ec="  + c +
					 "&ea="  + a +
					 "&el="  + l +
					 "&t=event"  ;

		request.open( "POST", ANALITYCS, true );
		request.send( params );
		
	};
	
} )();













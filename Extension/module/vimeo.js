/* 

( IT ) -->

    Gestione vimeo, recupera i link per il download

( EN ) -->
    
    Please fork and translate ...

*/

( function(){
    
    "use strict";
   
    var
         externalAPI = "https://www.10convert.com/watch?v={%c}&utm_source=GrabAnyMedia&utm_medium=extension"
    
        ,api = "https://player.vimeo.com/video/{%c}/config"
        
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
		
		,_pingJSON = function( url, callback ){
			
			if( typeof callback != "function" )callback = function(){};
			
			var xhr = _getXHR();

			url = _noCache( url )
			
			if( !url || !xhr ){
				
				callback();
				
				return false;
				
			}
			
			xhr.responseType = "json";

			xhr.overrideMimeType( "text/json" );

			xhr.open( "GET", url, true );

			xhr.onload = function(){
				
			// --> Aspetto che carica tutta la pagina
				
				if( xhr.readyState === xhr.DONE ){
					
					callback( xhr );
					
				}
			
			}
			
			xhr.send( null );
			
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
                 reCanonical = /^(https\:\/\/|http\:\/\/|\/\/).*vimeo\..*\/:?/gi
            
                ,reEmbed     = /^(https\:\/\/|http\:\/\/|\/\/).*vimeo\..*\/video\/:?/gi
            
                ,tmp
            ;
            
            if( link.match( reCanonical ) ){
                
                tmp = link.replace( reCanonical, "" );
                
            }else if( link.match( reEmbed ) ){
                 
                tmp = link.replace( reEmbed, "" );
                            
            }
            
            if( tmp )return tmp.replace( /(\/.*|\?.*)/gi, "" );
                     
            return "";
            
        }
    
        ,_findLinks = function( videocode, callback ){
            
            callback = callback || function(){};
            
            if( !videocode )return callback();
            
            _pingJSON( api.replace( /\{\%c\}/gi, videocode ), function( xhr ){
				
                if( !xhr || !xhr.response )return callback();

                var title = "Vimeo";
               
                if( xhr.response.video && xhr.response.video.title && xhr.response.video.title.trim().length > 0 )
                    title = xhr.response.video.title.trim().replace( /[^\w]/gi, "_" );
               
                try{
                    
                    var 
                         items = xhr.response.request.files.progressive
                                        
                        ,response = []
                    ;
                    
                    items.forEach( function( item, index ){
                        
                        if( !item.quality || !item.url || !item.mime )return true;
                        
                        response.push( {
                            
                             url : item.url
                            
                            ,quality : item.quality
                            
                            ,type : item.mime + ";"
                            
                            ,title : title
                            
                        } );
                        
                    } );
                    
                    callback( response );
                    
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
            
            if( _getDomain( link ) != "vimeo" )return [];
          
            var videocode = _getVideoCode( link );
            
            if( !videocode )return callback();
            
            _findLinks( videocode, function( response ){
                
                if( !response || response.length < 1 )return callback(); //return callback( externalAPI.replace( /\{\%c\}/gi, videocode ) );
                
                return callback( response );
                
            } );
            
        } // <-- getLinks
        
    };
    
} )();
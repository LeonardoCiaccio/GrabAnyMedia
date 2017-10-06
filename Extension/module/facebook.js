/* 

( IT ) -->

    Gestione facebook, recupera i link per il download

( EN ) -->
    
    Please fork and translate ...

*/

( function(){
    
    "use strict";
   
    var
         externalAPI = "https://www.10convert.com/watch?v={%c}&utm_source=GrabAnyMedia&utm_medium=extension"
    
        ,_toDownload = function( newpage, link, title ){
            
            if( newpage ){
                            
                chrome.runtime.sendMessage( {

                     exe : "newTab"

                    ,url : link

                } );

                return false;

            }

            chrome.runtime.sendMessage( {

                 exe      : "download"

                ,srcvideo : link
                
                ,title : title

            } );
            
        }
        
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
    
        ,_findLinks = function( url, callback ){
                        
            callback = callback || function(){};
            
            if( !url )return callback();
            
            _ping( url, function( xhr ){
                
                if( !xhr || !xhr.responseXML )return callback();
                
                var 
                     allscript = xhr.responseXML.querySelectorAll( "script" )
                
                    ,sourcescript
                
                    ,title = xhr.responseXML.title || "Facebook"
                ;
                
                title = title.trim().replace( /[^\w]/gi, "_" );
                
                for( var i = 0; i < allscript.length; i++ ){
                    
                    var mysource = allscript[ i ].textContent || "";
                    
                    mysource = mysource.trim();
                    
                    if( mysource.match( "\"{0,1}videoData\"{0,1}\:" ) && mysource.match( "\"{0,1}sd_src\"{0,1}\:" ) ){
                        
                        sourcescript = mysource;
                        
                        break;
                        
                    }
                    
                }
               
                if( !sourcescript || sourcescript.length < 1 )return callback();
                                
                try{
                    
                    var
                         reSource = /(\"{0,1}videoData\"{0,1}\:\[\{)(.*?)(\}\])/gi 
                    
                        ,reHD = /(\"{0,1}hd_src\"{0,1}\:\")(.*?)(\")/gi 
                    
                        ,reSD = /(\"{0,1}sd_src\"{0,1}\:\")(.*?)(\")/gi 
                    
                        ,snippet = reSource.exec( sourcescript )
                    ;
                  
                    if( !snippet || snippet.length != 4 )return callback();
                    
                    var filtr = snippet[ 2 ].trim();
                    
                    if( !filtr || filtr.length < 1 )return callback();
                    
                    var 
                         response = []
                    
                        ,hdsrc = reHD.exec( filtr )
                    
                        ,sdsrc = reSD.exec( filtr )
                    ;
                    
                    if( hdsrc && hdsrc.length == 4 )response.push( {
                        
                         url : hdsrc[ 2 ].trim()
                        
                        ,quality : "HD"
                        
                        ,type : ""
                        
                        ,title : title
                        
                    } );
                    
                    if( sdsrc && sdsrc.length == 4 )response.push( {
                        
                         url : sdsrc[ 2 ].trim()
                        
                        ,quality : "SD"
                        
                        ,type : ""
                        
                        ,title : title
                        
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
            
            if( srcvideo && srcvideo.indexOf( "http" ) == 0 ){
                
                _toDownload( newpage, srcvideo );
                
                return false;
                
            }
            
            link = link || document.location.href;
            
            callback = callback || function(){};
            
            if( _getDomain( link ) != "facebook" )return [];

        // ( IT ) --> Tento un recupero
            
            var player = document.querySelector( "video[src='" + srcvideo + "']" );
            
            if( !!player ){
                
                var closest = player.closest( "[id^='hyperfeed_story_id']" );
                
                if( !!closest ){
                    
                    var 
                         allLink = closest.querySelectorAll( "a" )
                    
                        ,href = ""
                    ;
                    
                    allLink.forEach( function( a, i ){
                        
                        if( !!href )return false;
                        
                        var aHREF = a.href;
                        
                        if( /(?:\/videos\/\d+\/)|(?:\/video\.php\?v=\d+)/i.test( aHREF ) )href = aHREF; 
                        
                    } );
                    
                    if( !!href )link = href;
                    
                }
                
            }
            
            if( !link.match( /^(https\:\/\/|http\:\/\/|\/\/).*facebook\..*\/.*\/videos\/:?/gi )/* &&
              
                !link.match( /^(https\:\/\/|http\:\/\/|\/\/).*facebook\..*\/plugins\/video.php:?/gi )
              */){
                
                alert( chrome.i18n.getMessage( "fb_to_video" ) );
            
                return callback();
            
            }
            
            _findLinks( link, function( response ){
                
                if( !response || response.length < 1 )return callback(); //return callback( externalAPI.replace( /\{\%c\}/gi, videocode ) );
                
                return callback( response );
                
            } );
            
        } // <-- getLinks
        
    };
    
} )();
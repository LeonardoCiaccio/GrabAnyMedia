/*

	--> ( it )

		Cattura i riferimenti per la piattaforma MEV ( sempre di mia proprietà )
	
	--> ( en )
	
		Fork and translate, please ...
		
	--> ...
	
*/



( function(){
    
    
    var server = "http://myembeddedvideo.altervista.org/new.php",
        home   = "http://myembeddedvideo.altervista.org/";
    
    var reCode    = /^(<iframe\s)/gi,
        rePath    = /^(\/\/)/gi,
        reClean   = /[<>]/gi,
        module    = {
            
            blacklist : {
                
                list : /(google.com|twitter.com|facebook.com|disqus.com|comment)/gi
                
            },
            pure    : {
                
                tag    : /^(<iframe\s)/gi,
                src    : /src=["'](.*?)["']/gi,
                filter : /(src=["']|["'])/gi
                
            },
            iframe  : {
                
                key : /(embed|player|media|video)/gi
                
            },
            youtube : {
                
                test    : /^(http|https):\/\/(m|www).youtube.com\/watch\?/gi,
                code    : /(\?|&)v\=[a-zA-Z0-9-\._]{1,100}/gi,
                filter  : /(\?|&)v\=/gi,
                embed   : "http://www.youtube.com/embed/%s"
                
            }
            
        },        
        tmpCode   = "",
        source    = {
            
            title     : encodeURIComponent( document.title ),
            urlCode   : "",
            urlSource : encodeURIComponent( document.location.href )
        
        };
    
// ( it ) --> Testo il browser per vedere se supporta la piattaforma
	
    function _testBrowser(){
        
        try{
            
        // ( it ) --> supporta trim ?
			
            var tmp = " test trim ".trim();
            
        // ( it ) --> Riesco ad appendere eventi
			
            _addEvent( "load", window, function(){
                
            // ( it ) --> Viene avviato al completamento, non ci sono rischi di sovrascrittura
                
            } );
            
       // ( it ) --> Funzioni elementari
			
            tmp = document.querySelectorAll( "a, div" );
            
            return true;
            
        }catch( e ){
            
            return false;
            
        }
        
        return false;
        
    };
		
    function _addEvent( evnt, elem, func ){
        
        try{
            
            if( elem.addEventListener ){
                
                elem.addEventListener( evnt, func, false );
            
            }else if( elem.attachEvent ){
                
                 var r = elem.attachEvent( "on" + evnt, func );
            
            }
            
            return true;
        
        }catch( e ){
            
            return false;
            
        }		    
        
    };
    
// ( it ) --> Protocolli anonimi diventano secure
	
    function _canchePath( url ){
        
        return url.replace( rePath, "https://" );
        
    };
    
    
    function _getSelectionText(){
        
        var text = "";
        
        if( window.getSelection ){
            
            text = window.getSelection().toString();
        
        }else if( document.selection && document.selection.type != "Control"){
            
            text = document.selection.createRange().text;
        
        }
        
        return text;
    
    }
	
    function _getYoutubeEmbed(){
        
        var url  = document.location.href,
            test = url.match( module.youtube.test );
        
        if( test && test.length == 1 ){
            
        // ( it ) --> Prelevo il parametro che mi serve
			
            var v = url.match( module.youtube.code );
            
            if( v && v.length == 1 ){
                
                v = v[ 0 ].replace( module.youtube.filter, "" );
                
                return module.youtube.embed.replace( /%s/gi, v );
                
            }
            
        }
        
        return null;
        
    };
        
    
    function _sniffAllIframe(){
        
        var all     = document.getElementsByTagName( "iframe" ),
            finded  = [];
        
        if( all && all.length > 0 ){
            
            for( var i = 0; i < all.length; i++ ){
                
                var src = all[ i ].getAttribute( "src" );
                
                if( src && ( src.match( module.iframe.key ) ) ){
                
                    if( src.match( module.blacklist.list ) )continue;
                    
                    finded.push( all[ i ] );
                
                }
                
            }
            
        }
        
        return finded;
        
    };
    
    function _sniffAllPureCode(){
        
        var finded = [],
            all    = document.querySelectorAll( "input[type='text'], textarea" ) || [];
                
        for( var i = 0; i < all.length; i++ ){
            
        // ( it ) --> Prelevo il valore
			
            var val = all[ i ].value;
            
        // ( it ) --> Se ho qualcosa procedo
			
            if( val ){
                
                val = val.trim();
                
            // ( it ) --> Controllo se ho l'iframe
				
                var tag = val.match( module.pure.tag );
                
                if( tag && tag.length == 1 ){
                                    
                // ( it ) --> Recupero il src
					
                    var src = val.match( module.pure.src );
                    
                    if( src && src.length == 1 ){
                        
                        var possible = src[ 0 ].replace( module.pure.filter, "" ).trim();
                        
                    // ( it ) --> Se ho nel src una blacklist vado avanti
						
                        if( possible.match( module.blacklist.list ) )continue;
                        
                        finded.push( {
                        
                            element : all[ i ],
                            urlCode : possible

                        } );
                    
                    }
                    
                }
                
            }
            
        }
        
        return finded;
        
    };
    
// ( it ) --> Procedura per il titolo
	
    function _titleProcedure( callback ){
        
        callback = callback || function(){};
        
        var tmp     = document.title, //_getSelectionText() || document.title,
            title   = prompt( chrome.i18n.getMessage( "mevtitle" ), tmp ) || "";
        
        if( title )title = title.replace( reClean, "" ).trim();
          
     // ( it ) --> L'utente potrebbe annullare
        
        //title = ( title && title != "" ) ? title : document.title.replace( reClean, "" ).trim();
        
        return callback( title );
        
    };
    
// ( it ) --> Procedura finale
	
    function _end( urlCode ){
        
        if( !urlCode ){
            
            document.location.href = home;
            return false;
            
        }
        
        source.urlCode = urlCode;
        
        return _titleProcedure( function( title ){
            
        // ( it ) --> L'utente ha annullato
			
            if( !title )return false;
                
            source.title = title;
            
            window.open( server + 
                 "?title=" + source.title.replace( reClean, "" ).trim() +
                 "&urlCode=" + _canchePath( source.urlCode.replace( reClean, "" ).trim() ) +
                 "&urlSource=" + _canchePath( source.urlSource.replace( reClean, "" ).trim() )
               );
            
            return false;
            
        } );
        
    }
    
// ( it ) --> Per prima cosa testo il browser
	
    if( !_testBrowser() ){
        
        alert( chrome.i18n.getMessage( "mevnotsupported" ) );
        return false;
        
    }
    
// ( it ) --> Tento di prelevare l'embed da youtube
	
    var code = _getYoutubeEmbed();
    if( code )return _end( code );
    
// ( it ) --> Tento di prelevare il codice nei input e text area
	
    var pureSource = _sniffAllPureCode();
    if( pureSource.length > 0 ){
        
    // ( it ) --> Se è uno solo finisco subito, becco altro
        // if( pureSource.length == 1 )return _end( pureSource[ 0 ].urlCode );
        
    // ( it ) --> Se è più di uno le cose si complicano
		
        var linght = "border:10px dashed red!important;cursor:copy!important;";
        
    // ( it ) --> Sono più di uno, inserisco un bordo con il callback
		
        for( var i = 0; i < pureSource.length; i++ ){
            
        // ( it ) --> Prelevo lo stile se presente
			
            var style = pureSource[ i ].element.getAttribute( "style" );
            
        // ( it ) --> Incornicio e appendo se non incorniciato
			
            if( ! style || ( style.indexOf( linght ) < 0 ) ){
                
            // ( it ) --> Incornicio
				
                style = ( !style ) ? linght : style + ";" + linght;            
                pureSource[ i ].element.setAttribute( "style", style );
                
            // ( it ) --> Mi strascico il valore filtrato
				
                pureSource[ i ].element.setAttribute( "data-mev", pureSource[ i ].urlCode );
                
                _addEvent( "click", pureSource[ i ].element, function(){
                    
                    return _end( this.getAttribute( "data-mev" ) );
                    
                } );
                
            }        
            
        }
        
        alert( chrome.i18n.getMessage( "mevmoresource" ) );        
        return false;
        
        
    }
    
// ( it ) --> Tento di sniffare gli iframe già incorporati
	
    var allIframe = _sniffAllIframe();
    if( allIframe.length > 0 ){
        
    // ( it ) --> Se è uno solo finisco subito, ma non posso farlo becco sempre disgus
        //if( allIframe.length == 1 )return _end( allIframe[ 0 ].getAttribute( "src" ) );
        
        var linght = "border:10px dashed red!important;cursor:copy!important;";
        
     // ( it ) --> Sono più di uno, inserisco un bordo con il callback
		
        for( var i = 0; i < allIframe.length; i++ ){
            
        // ( it ) --> Prelevo lo stile se presente
			
            var style = allIframe[ i ].getAttribute( "style" );
            
        // ( it ) --> Incornicio e appendo se non incorniciato
			
            if( ! style || ( style.indexOf( linght ) < 0 ) ){
                
            // ( it ) --> Incornicio
				
                style = ( !style ) ? linght : style + ";" + linght;            
                allIframe[ i ].setAttribute( "style", style );
                
                _addEvent( "click", allIframe[ i ], function(){
                    
                    return _end( this.getAttribute( "src" ) );
                    
                } );
                
            }        
            
        }
        
        alert( chrome.i18n.getMessage( "mevmorevideo" ) );        
        return false;
        
    }
    
    if( confirm( chrome.i18n.getMessage( "mevconfirm" ) ) ){
     
        document.location.href = home;
        
    }else{
        
        return false;
        
    }
    
} )();













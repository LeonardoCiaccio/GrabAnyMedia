/* 

( IT ) -->

    Modulo assistente, crea una icona sui player per assistere l'utente nella gestione
    del video.
    Deve essere discreta e impiegare risorse solo se richieste e solo le necessarie.

( EN ) -->
    
    Please fork and translate ...

*/

( function(){
    
    "use strict";
    
    var 
         hideFlag = "display:none!important;"
    
        ,showFlag = "display:block!important;"
    
        ,oldHref = document.location.href
    
        ,standardDelay = 100
    
        ,iconPath = chrome.runtime.getURL( "img/icon.48.png" )

        ,iconPathRed = chrome.runtime.getURL( "img/icon.48.red.png" )
    
        ,translated = {
            
             "save" : chrome.i18n.getMessage( "save" )
            
            ,"watch_later" : chrome.i18n.getMessage( "watch_later" )
            
            ,"analize" : chrome.i18n.getMessage( "analize" )
            
            ,"download" : chrome.i18n.getMessage( "download" )
            
            ,"loading" : chrome.i18n.getMessage( "loading" )
            
        }
    
        ,signature = "x-gam-assistant"
    
        ,signaction = "x-gam-assistant-action"
    
        ,_remove = function( eles ){
            
            var __worker = function( ele ){
                
                try{
                    
                    ele.parentNode.removeChild( ele );
                    
                }catch( e ){}
                
            };
            
            eles = eles || document.querySelectorAll( "[" + signature + "='toremove']" ) ;
                        
            if( !( eles.length > 1 ) ){
               
                __worker( eles );
                
            }else{
               
                eles.forEach( function( ele, index ){
                    
                    __worker( ele );
                    
                } );
                
            }
            
        }
    
        ,_removeEmptyEles = function( parent ){
            
        // ( IT ) --> Rimuove eventuali elementi che vengono posti sopra i video
            
            if( !parent )return false;
            
            var all = parent.childNodes;
            
            all.forEach( function( item, index ){
                
                if( !item.children || item.children.length < 1 )_remove( item );
                
            } );
            
        }
    
        ,_getVideoSrc = function( player ){
            
            var srcvideo = player.src || "";
                        
            if( !srcvideo || srcvideo.length < 1 ){

                var source = player.querySelector( [

                     "source[type='video/mp4']"

                    ,"source[type='video/webm']"

                    ,"source[type='video/flv']"


                ].join( "," ) );

                if( source && source.src )srcvideo = source.src;

            }
            
            return srcvideo;
            
        }
    
        ,_show = function( eles ){
            
            if( !eles )return false;

            var __worker = function( ele ){
            
                if( !ele.getAttribute )return false;
                
                var mystyle = ele.getAttribute( "style" ) || "";

                mystyle = mystyle.replace( hideFlag, "" ).replace( showFlag, "" );

                ele.setAttribute( "style", mystyle + showFlag );

                
            };
            
            if( !NodeList.prototype.isPrototypeOf( eles ) ){
                
                __worker( eles );
                
            }else{
                
                eles.forEach( function( ele, index ){
                    
                    __worker( ele );
                    
                } );
                
            }

        } 

        ,_hide = function( eles ){
            
            if( !eles )return false;

            var __worker = function( ele ){
 
            
                if( !ele.getAttribute )return false;

                var mystyle = ele.getAttribute( "style" ) || "";

                mystyle = mystyle.replace( hideFlag, "" ).replace( showFlag, "" );

                ele.setAttribute( "style", mystyle + hideFlag );

                
            };
            
            if( !NodeList.prototype.isPrototypeOf( eles ) ){
                
                __worker( eles );
                
            }else{
                
                eles.forEach( function( ele, index ){
                    
                    __worker( ele );
                    
                } );
                
            }
            
        } 

        ,_toggle = function( eles ){
            
            if( !eles )return false;
            
            var __worker = function( ele ){
            
                if( !ele.getAttribute )return false;
                
                var mystyle = ele.getAttribute( "style" ) || "";

                if( mystyle.indexOf( hideFlag ) < 0 )
                    _hide( ele );
                else
                    _show( ele );

                
            };
            
            if( !NodeList.prototype.isPrototypeOf( eles ) ){
                
                __worker( eles );
                
            }else{
                
                eles.forEach( function( ele, index ){
                    
                    __worker( ele );
                    
                } );
                
            }

        }

        ,_isHidden = function( ele ){
            
            return( ele.offsetParent === null );
        
        }
    
        ,_isVisible = function( ele ){
            
            var 
                 eleTop = ele.getBoundingClientRect().top
            
                ,eleBottom = ele.getBoundingClientRect().bottom
            ;

            return ( eleTop >= 0 && eleBottom <= window.innerHeight );
            
        }
    
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
    
        ,_openConsole = function(){
            
            chrome.runtime.sendMessage( {

                 exe : "openConsole"

            } );
            
        }
            
        ,_reposition = function( elefrom, eleto ){

            if( !elefrom || !eleto )return false;

            var rect = elefrom.getBoundingClientRect();

            var p = {
                
                 top  : rect.top + window.pageYOffset
                
                ,left : rect.left + window.pageXOffset
                
            };
            
            eleto.setAttribute( "style", "top:" + p.top + "px!important;left:" + p.left + "px!important;" );

        }
    
        ,_monitoring = function( to, what, attribute ){
            
            if( typeof what != "function" )what = function(){};
            
            attribute = !(!attribute);
            
            var 
                 observer = new MutationObserver(function( mutations ){

                    mutations.forEach( function( mutation ){

                        what( mutation );

                    } );

                })
            ;

            var config = { attributes: attribute, childList: true, subtree : true };

            observer.observe( to, config );
            
        }
    
        ,_addEvent = function( evnt, elem, func ){
        
            try{

                if( elem.addEventListener ){

                    elem.addEventListener( evnt, func, false );

                }else if( elem.attachEvent ){

                     var r = elem.attachEvent( "on" + evnt, func );

                }else{
                    
                    return false;
                    
                }

                return true;

            }catch( e ){

                return false;

            }		    

        }
    
        ,_appendToPlayer = function( player ){
            
            var parentPlayer = player.parentNode;
            
            if( !parentPlayer || !document.body || _isHidden( player ) )return false; 
            
            var 
                 _toNormal = function(){
                     
                    icon.setAttribute( "src", iconPath );
                     
                    var 
                         allNormal = menu.querySelectorAll( "[" + signature + "='normal']" ) || []
                    
                        ,allLoading = menu.querySelectorAll( "[" + signature + "='loading']" ) || []
                    ;
                
                     _remove();
                     
                    allNormal.forEach( function( ele, index ){
                        
                        _show( ele );
                        
                    } );
                    
                    allLoading.forEach( function( ele, index ){
                        
                        _hide( ele );
                        
                    } );
                     
                }
            
                ,_toLoading = function(){
                    
                    icon.setAttribute( "src", iconPathRed );
                    
                    var 
                         allNormal = menu.querySelectorAll( "[" + signature + "='normal']" ) || []
                    
                        ,allLoading = menu.querySelectorAll( "[" + signature + "='loading']" ) || []
                    ;
                
                     _remove();
                    
                    allNormal.forEach( function( ele, index ){
                        
                        _hide( ele );
                        
                    } );
                    
                    allLoading.forEach( function( ele, index ){
                        
                        _show( ele );
                        
                    } );
                    
                }
            
                ,_toResult = function(){
                    
                    icon.setAttribute( "src", iconPath );
                    
                    var 
                         allNormal = menu.querySelectorAll( "[" + signature + "='normal']" ) || []
                    
                        ,allLoading = menu.querySelectorAll( "[" + signature + "='loading']" ) || []
                    ;
                    
                    allNormal.forEach( function( ele, index ){
                        
                        _hide( ele );
                        
                    } );
                    
                    allLoading.forEach( function( ele, index ){
                        
                        _hide( ele );
                        
                    } );
                    
                }
                
                ,icon = document.createElement( "img" )
            
                ,menu = document.createElement( "div" )
            
                ,container = document.createElement( "div" )
            
                ,id = Date.now();
            
            ;
                        
            if( document.querySelector( "video[" + signature + "='" + id + "']" ) || !parentPlayer )return false;
            
            player.setAttribute( signature, id );
            
            
            container.setAttribute( signature, "container" + id );
                        
            container.setAttribute( "style", showFlag );  
            
            icon.setAttribute( signature, "assistant" );
            
            icon.setAttribute( "src", iconPath );
                        
            icon.setAttribute( "style", hideFlag );
            
            menu.setAttribute( signature, "menu" );
                        
            menu.setAttribute( "style", hideFlag ); 
                            
            menu.innerHTML = [
                
                 "<p " + signature + "='loading' style='margin:0px!important;" + hideFlag + "'>" + translated[ "loading" ] + "</p>"
                                
                ,"<p " + signature + "='normal' " + signaction + "='analize' style='margin:0px!important;margin-top:5px!important;'>" + translated[ "analize" ] + "</p>"
                
                ,"<hr " + signature + "='normal' style='margin:0px!important;margin-top:5px!important;'>"
                
                ,"<p " + signature + "='normal' " + signaction + "='download' style='margin:0px!important;margin-top:5px!important;'>" + translated[ "download" ] + "</p>"
                
            ].join( " " );
            
            _addEvent( "click", icon, function( ev ){
                                
                player.pause();
                
                _toggle( menu );
                
                ev.stopPropagation();
                
                return false;
                
            } );
            
            _addEvent( "mouseover", icon, function( ev ){
                                
                player.pause();
                
                _show( menu );
                
                ev.stopPropagation();
                
                return false;
                
            } );
            
            _addEvent( "mouseover", container, function( ev ){
                
                if( !_isHidden( player ) )_show( icon );
                
                ev.stopPropagation();
                
            } );
            
            _addEvent( "mouseleave", container, function( ev ){
                
                if( _isHidden( menu ) )_hide( icon );
                
                ev.stopPropagation();
                
            } );
            
            
            var allItemNormal = menu.querySelectorAll( "p[" + signature + "='normal']" ) || [];
            
            allItemNormal.forEach( function( ele, index ){
                
                _addEvent( "click", ele, function( ev ){
                    
                    ev.stopPropagation();
                    
                    _toLoading();
                    
                    player.pause();
                    
                    if( ev.target.getAttribute( signaction ) == "download" ){
                                                
                        var srcvideo = _getVideoSrc( player );
                        
                        if( window.GAMMODULE ){
                           
                            window.GAMMODULE.getLinks( null, function( response ){
                                
                                if( typeof response === "string" ){
                                    
                                    chrome.runtime.sendMessage( {
                                        
                                         exe : "newTab"
                                        
                                        ,url : response
                                        
                                    } );
                                
                                    _toNormal();
                                    
                                }else if( !response || response.length < 1 ){
                                         
                                    alert( chrome.i18n.getMessage( "to_analize" ) );
                                
                                    _toNormal();
                                        
                                }else{
                                         
                                    _toResult();
                                    
                                    var newitema = document.createElement( "p" );
                                                                                
                                    newitema.setAttribute( signature, "toremove" );

                                    newitema.setAttribute( "style", "margin:0px!important;font-size:14px!important;" + showFlag );

                                    newitema.textContent = "«";

                                    _addEvent( "click", newitema, function( evn ){

                                        _toNormal();

                                        evn.stopPropagation();

                                        return false;

                                    } );

                                    menu.append( newitema );
                                    
                                    response.forEach( function( ele, index ){
                                        
                                        var newitem = document.createElement( "p" );
                                                                                
                                        newitem.setAttribute( signature, "toremove" );
                                        
                                        newitem.setAttribute( "style", "margin:0px!important;margin-top:10px!important;" + showFlag );
                                                                                
                                        newitem.textContent = ele.quality;
                                        
                                        _addEvent( "click", newitem, function( evt ){
                                                                                        
                                            evt.stopPropagation();
                                                                                                                                    
                                            _toLoading();
                                            
                                            var ext = ".mp4";
                                            
                                            if( ele.type.indexOf( "/3gpp;" ) > -1 )
                                                ext = ".3gpp";
                                            else if( ele.type.indexOf( "/webm;" ) > -1 )
                                                ext = ".webm";
                                            else if( ele.type.indexOf( "/flv;" ) > -1 )
                                                ext = ".flv";
                                            else if( ele.type.indexOf( "/avi;" ) > -1 )
                                                ext = ".avi";
                                            
                                            setTimeout( function(){
                                                
                                                var mytitle = ( !ele.title || ele.title.length < 1 ) 
                                                                ? null 
                                                                : ele.title.replace( /[^\w]/gi, "_" ) + ext
                                                                ;
                                                
                                                _toDownload( evt.ctrlKey, ele.url, mytitle );
                                                                                                
                                            }, 500);
                                            
                                            return false;
                                            
                                        } );
                                        
                                        menu.append( newitem );
                                        
                                    } );
                                         
                                }
                                
                            }, srcvideo, ev.ctrlKey );
                           
                        }else if( srcvideo && srcvideo.length > 0 ){
                            
                            _toDownload( ev.ctrlKey, srcvideo );
                            
                        }else{
                            
                            alert( chrome.i18n.getMessage( "to_play" ) );
                                
                            _toNormal();
                                                        
                        }
                        
                    }else if( ev.target.getAttribute( signaction ) == "analize" ){
                       
                        _openConsole();
                    
                    }else{
                        
                        _toNormal();
                        
                    }
                    
                    return false;
                    
                } );
                
            } );
            
            var allItemLoading = menu.querySelectorAll( "p[" + signature + "='loading']" ) || [];
            
            allItemLoading.forEach( function( ele, index ){
                
                _addEvent( "click", ele, function( ev ){
                                        
                    player.pause();
                    
                    ev.stopPropagation();
                    
                    return false;
                    
                } );
                
            } );
            
            container.prepend( menu );
            
            container.prepend( icon );
            
            document.body.append( container );
            
            _monitoring( player, function( mutation ){                
                
                _reposition( player.parentNode, container );
                
            }, true );
            
            _reposition( player.parentNode, container );
            
        }
    
        ,_checkVideo = function( delay ){
            
            if( typeof delay === "undefined" )delay = standardDelay;
            
            delay = parseInt( delay ) || 0;
            
            setTimeout( function(){
                
                var allPlayers = document.querySelectorAll( "video:not([" + signature + "])" ) || []; 
    
                allPlayers.forEach( function( ele, index ){

                    _appendToPlayer( ele );

                } );
                
            }, delay );
            
        }
    
        ,_adjustAssistant = function( delay ){
            
            if( typeof delay === "undefined" )delay = standardDelay;
            
            delay = parseInt( delay ) || 0;
            
            setTimeout( function(){
                
                var allAssistants = document.querySelectorAll( "[" + signature + "^='container']" ) || []; 
    
                allAssistants.forEach( function( assistant, index ){

                    var id = parseInt( assistant.getAttribute( signature ).replace( "container", "" ) );

                    if( !id || id < 1 )return false;
                    
                    var player = document.querySelector( "[" + signature + "='" + id + "']" );
                    
                    if( !player )return _remove( assistant );
                    
                    var 
                         icon = assistant.querySelector( "[" + signature + "='assistant']" )
                        
                        ,menu = assistant.querySelector( "[" + signature + "='menu']" ) 
                    ;
                    
                    if( !_isVisible( assistant ) ){
                
                        _hide( menu );

                        _hide( icon );

                    }

                    _reposition( player.parentNode, assistant );

                    player.onpause = function(){       

                        _show( icon );

                    };

                    player.onplay = function(){

                        _hide( menu );

                        _hide( icon );

                    };
                    
                } );
                
            }, delay );
            
        }
    
        ,_allToNormal = function(){
               
            var 
                 allNormal = document.querySelectorAll( "[" + signature + "='normal']" ) || []

                ,allLoading = document.querySelectorAll( "[" + signature + "='loading']" ) || [] 

                ,allAssistant = document.querySelectorAll( "img[" + signature + "='assistant']" ) || []

                ,allMenu = document.querySelectorAll( "[" + signature + "='menu']" ) || []
            ;



            _remove();
            
            allNormal.forEach( function( ele, index ){
  
                _show( ele );

            } );

            
            allLoading.forEach( function( ele, index ){
  
                _hide( ele );

            } );

            allMenu.forEach( function( ele, index ){
  
                _hide( ele );

            } );

            allAssistant.forEach( function( ele, index ){
 
                ele.setAttribute( "src", iconPath );

            } );
  
        }
    
        ,_removeAll = function(){
            
            var allobj = document.querySelectorAll( "[" + signature + "^='container']" );
            
            _remove( allobj );
            
            var allvid = document.querySelectorAll( "[" + signature + "]" );
            
            allvid.forEach( function( ele, index ){
                
                ele.removeAttribute( signature );
                
            } );
            
        }
    
        ,_start = function(){

            _monitoring( document.body, function( mutation ){
                
                if( oldHref != document.location.href ){

                    oldHref = document.location.href;

                    _removeAll();

                }

                _checkVideo();
                
                _adjustAssistant( 1 );
                
            }, false );
            
            _checkVideo();
            
        }
        
        ,cmd = {
		
            "allToNormal" : function( request, sender, sendResponse ){

                _allToNormal();  
                
                if( request.mex )alert( request.mex );

            }

        }
    ;
	
    _addEvent( "resize", window, function(){
        
        var allVideoAttached = document.querySelectorAll( "video[" + signature + "]" ) || [];
       
        allVideoAttached.forEach( function( item, index ){
            
            var 
                 id = item.getAttribute( signature )
            
                ,cc = document.querySelector( "[" + signature + "='container" + id + "']" )
            ;
            
            if( id && id.length > 0 && cc ){
                
                _hide( cc.childNodes );
                
                _reposition( item.parentNode, cc );
            
            }
            
        } );
        
    } );
    
	chrome.runtime.onMessage.addListener( function( request, sender, sendResponse ){
		
		try{
						
		// ( IT ) --> Richiamo eventuali estensioni			
			
			cmd[ request.cmd ]( request, sender, sendResponse );

		}catch( e ){/*console.log(e.message)*/}
		
	} );
    
    _start();
 
} )();










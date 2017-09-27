/* 

( IT ) -->

    Modulo per la comunicazione con il background

( EN ) -->
    
    Please fork and translate ...

*/

( function( GA, $ ){
	
	"use strict";
	
    if( !$ || !$.gam )throw new Error( chrome.i18n.getMessage( "e2" ).replace( "%s", "background.js" ) );
    
	var 
        _assistant = {
             
            toNormal : function( sender, mex ){
                             
                chrome.tabs.sendMessage( sender.tab.id, {

                     cmd : "allToNormal"
                    
                    ,mex : mex

                },{

                    frameId : sender.frameId

                } );

             } // <-- toNormal
            
         }
    
        ,exe = {

             download : function( request, sender, sendResponse ){

                if( request.srcvideo && request.srcvideo.indexOf( "http" ) == 0 ){
                    
                    chrome.downloads.download( {

                         url    : request.srcvideo

                        ,saveAs : true
                        
                        ,filename : request.title

                    } );

                    _assistant.toNormal( sender );
                    
                }else{

                    _assistant.toNormal( sender, chrome.i18n.getMessage( "to_analize" ) );
                    
                }

                GA( "Stats", "Most Downloaded", sender.url );

            }
            
            ,newTab : function( request, sender, sendResponse ){
                
                chrome.tabs.create( {
                                        
                    url : request.url

                } );
                
                _assistant.toNormal( sender );
                
                GA( "Stats", "New tab", sender.url );
                
            }

            ,openConsole : function( request, sender, sendResponse ){
                
                chrome.tabs.executeScript( sender.tab.id, { 

                    allFrames 	: false,
                    file 		: "js/no.inspector.js"

                } );

            // ( it ) --> Vediamo se ci sono moduli

                var config = $.gam.config();	

            // ( it ) --> Dico all'inspector di aprire la finestra dei downloads

                chrome.tabs.sendMessage( sender.tab.id, {

                    config	: config,
                    cmd 	: "openConsole"					

                } );
                
                _assistant.toNormal( sender );
                
            }
        }
    ;
		
	chrome.runtime.onMessage.addListener( function( request, sender, sendResponse ){
					
		try{

		// ( IT ) --> Richiamo eventuali estensioni

			exe[ request.exe ]( request, sender, sendResponse );

		}catch( e ){}

	} );
	
} )( window.GA || function(){}, window.jQuery );
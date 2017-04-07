/*

	--> ( it )

		Evidenzia e Isola il primo oggetto o embed cliccato
	
	--> ( en )
	
		Fork and translate, please ...
		
	--> ...
	
*/

( function(){
		
	"use strict";
	
// ( it ) --> Accessori
	
	var elements = "object, embed, iframe";
	
	var addEv = function( evnt, elem, func ){
        
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
	
// ( it ) --> Funzione che isola un elemento
	
	var isolate = function( isoleme ){
						
		var cloned = isoleme.cloneNode( true );
		
	// ( it ) --> Nascondo tutti gli elementi
		
		var all = document.body.querySelectorAll( "*" );

		for( var i = 0; i < all.length; i++ ){

			all[ i ].setAttribute( "style", "display:none!important;" );

		}

	// ( it ) --> Inizializzo l'elemento clonato
		
		cloned.setAttribute( "style", "width:" + window.innerWidth + "px!important;height:" + window.innerHeight + "px!important;" );
		document.body.appendChild( cloned );
		
	// ( it ) --> Rimuovo l'originale per evitare rallentamenti e tolgo le barre di scorrimento
		
		isoleme.remove();
		
		document.body.setAttribute( "style", "overflow:hidden!important;" );

	// ( it ) --> Quando stacco la finestra voglio un resize dell'oggetto
		
		addEv( "resize", window, function(){
			
			cloned.setAttribute( "style", "width:" + window.innerWidth + "px!important;height:" + window.innerHeight + "px!important;" );

		} );
		
	// ( it ) --> Rimuovo eventuali residui
		
		addEv( "click", cloned, function(){} );
		
	};
	
// ( it ) --> Funzione che abilita il click su gli elementi, per il momento non lo utilizzo
	
	var highlight = function( els, mex ){
				
		if( !els || els.length < 1 ){
			
			alert( chrome.i18n.getMessage( mex ) );
			return false;
			
		}
		
		for( var i = 0; i < els.length; i++ ){
					
			els[ i ].setAttribute( "style", "cursor:pointer!important;border:20px dashed red!important;" );
			
			addEv( "click", els[ i ], function( ev ){
				
				isolate( ev.target );
				ev.stopPropagation();
				return false;
				
			} );
			
		}
		
		alert( chrome.i18n.getMessage( "alc1" ) );
				
	};
		
	highlight( document.body.querySelectorAll( elements ), "alc2" );
	
} )();












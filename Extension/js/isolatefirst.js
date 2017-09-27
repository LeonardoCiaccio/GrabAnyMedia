/*

	--> ( it )

		Isola il primo oggetto o embed
	
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
	
	var isolate = function( isoleme, mex ){
			
		if( !isoleme || isoleme.length < 1 ){
			
			alert( chrome.i18n.getMessage( mex ) );
			return false;
			
		}
		
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
		
	isolate( document.body.querySelector( elements ), "alc2" );
	
} )();












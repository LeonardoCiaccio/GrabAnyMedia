/* 1.0.0

	--> ( it )

		Modulo per la creazione del pulsante download

	--> ( en )

		Fork and translate, please ...

	--> ...

*/



( function(){

	window.gambuttonbuilder = function( download, target, textbutton, external ){
		
		if( !download || !target )return false;
		
	// ( it ) --> Crea un pulsante
		
		var getButton = function( downloadlink, text, outservice ){
			
			if( !downloadlink )return null;
			
			text = text || "Download"
			
			var button  = document.createElement( "div" ),
				logo  	= document.createElement( "img" ),
				link	= document.createElement( "a" );
			
		// ( it ) --> Iniziamo con il link per il download
			
			link.setAttribute( "href", downloadlink );
			
			if( outservice ){
				
				link.setAttribute( "target", "_blank" );
				
			}else if( downloadlink != "#" ){
				
				link.setAttribute( "download", "GrabAnyMedia.mp4" );
				link.setAttribute( "target", "_blank" );
			
			}
			link.setAttribute( "style", [
				
				"text-decoration:none!important",
				"font-size:11px!important",
				"font-family:monospace!important",
				"color:rgb(224, 157, 31)!important"
				
			].join( ";" ) );
			link.textContent = text;
			
		// ( it ) --> Il Logo
			
			logo.setAttribute( "draggable", "false" );			
			logo.setAttribute( "src", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAALEwAACxMBAJqcGAAAAf9JREFUOI2Nj81LVGEUxn/vuTNz647TF7WJmGEsq0WLGomCssXQwlq0qrZhkQaCBNO/EUKS6WyidR+bFmlk9CEkmSkFfWA6ChmVSYTOjFfufd8WjtPM3Ck6q/c9z/P8zjmKmkr1TaaUMR1KmTRaEgBG9IxCHivRfaPteyYq/Wrt0dw/5xhT6BE4XwutLGNMNlxYd3kkEy+WAc39c47y84OIOvqvcBmieRYu2q0jmXhRVqmFnv8Jr62rhGNe1O0GUKm+yZTA2N9CG2wh3djAyaYYjZsjHL+V+wMUfSCkjOlAqaqQHVK0JKK07opxJO4QklX9ww+3+hRf2kNK6TRYpdt8rhzexKl923DCEthmYHKx6q8VacG3EgBe/hf5Ty/Zbq/UDRvg4dRSVU80ScEYlr/lyOfG8V2XizcGuXB9gBe5n1Xm11+KzOe9AFgWZ0a/ut9nV0cAxsDz9585d/Uuw1MLZeODmvVLNS14/kg9BaD73jAArmd4NL0U0I0yQyEj1jXgTD3A29l57r+aYsHaQn5FB3StrawCaOq6eRvfO10PIvZ6YrsPBadD79ilpk4BCHvRNq1kIuBS4OzYWwernzTYoQyAALzrPbtk61gLVuROpc3eGsdyNgYmR+3IiadtyeXSjOo6mP243/jSrhVp0SRL7WmjzJDWVna8c+ebSv9vmWG756vCwY8AAAAASUVORK5CYII=" );
			logo.setAttribute( "style", [ 
				
				"vertical-align:middle!important",
				"margin-right: 5px!important"
			
			].join( ";" ) );
			logo.classList.add( "img" );
			
		// ( it ) --> Il bottone
			
			button.setAttribute( "style", "padding-top:15px!important" );
			
		// ( it ) --> Costruisco e restituisco il bottone pronto da installare
			
			button.appendChild( logo );
			button.appendChild( link );
			
			return button;
			
		}; // <-- getButton 
		
	// ( it ) --> Installo il pulsante
		
		var mybutton = getButton( download, textbutton, external );
		
		if( !mybutton )return false;
		
		if( target.firstChild ){
			
			target.insertBefore( mybutton, target.firstChild );
			
		}else{
			
			target.appendChild( mybutton );
			
		}
		
		return true;
		
	};
		
} )();



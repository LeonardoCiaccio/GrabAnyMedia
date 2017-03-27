/*

	--> ( it )

		Operazioni dedicate per la console downloads
	
	--> ( en )
	
		Fork and translate, please ...
		
	--> ...
	
*/



( function( $ ){
	
// ( it ) --> Qualcosa da eseguire ?
	
	var queue = window.onload || function(){};
	
// ( it ) --> Sono sicuro che tutto il documento sia caricato
	
	window.onload = function(){
		
		queue();
		
		var docs 	= [],
			pingout = 2000,
			runing 	= -1;
		
		var escapeHTML = function( str ){
			
			// Note: string cast using String; may throw if `str` is non-serializable, e.g. a Symbol.
			// Most often this is not the case though.
			return String( str )
				.replace( /&/g, '&amp;' )
				.replace( /"/g, '&quot;' ).replace( /'/g, '&#39;' )
				.replace( /</g, '&lt;' ).replace( />/g, '&gt;' );
		}
		
		var getXHR = function(){
		
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

		};
	
		var ping = function( url ){

			var xhr = getXHR();

			//console.info( "[ GAM ] : Ping start ( " + url + " )" );

			xhr.open( "GET", url, true );
			xhr.send( null );

			setTimeout( function(){

				xhr.abort();

				//console.info( "[ GAM ] : Ping end ( " + url + " )" );

			}, pingout );

		};
	
		var searchlinks = function( text ){
			
			text = text.replace( /(\\)/g, "" );			
			return text.match( /(http?s?:?\\?\/?\\?\/[^\s,\"\'<>]+)/g ) || [];
			
		};
	
		var crawl = function( mystore ){
		
			if( !mystore )return false;
			
			try{

				mystore = JSON.parse( mystore );
				
				var xhr = getXHR();

				//console.info( "[ GAM ] : Crawl start ( " + mystore.url + " )" );
				
				xhr.open( "GET", mystore.url, true );

				xhr.onload = function( response ){

					var source	= response.target.responseText,
						links 	= searchlinks( source ) || [];

					for( var i = 0; i < links.length; i++ ){

					// ( it ) --> Ping poi ci pensa il grabber a smistare

						ping( links[ i ] );

					}

					//console.info( "[ GAM ] : Crawl end ( " + mystore.url + " )" );

				};

				xhr.send( null );

			}catch( e ){}

		};
		
		var preformated = function( text ){
    
			if( !text )return "";
			
			var open  = new RegExp( "<", "gi" ),
				close = new RegExp( ">", "gi" );

		// ( it ) --> Aggiungo uno spazio per evitare che nei link compaiano dei tags
			
			return text.replace( open, " &lt;" ).replace( close, " &gt;" );

		};
		
		var scannow = function( store, tests, links, onend ){
			
			if( !store )return false;
			
			onend = onend || function(){};
		//console.log(store.url);
			$.ajax( {
				
				url		 : store.url,
				jsonp	 : false,
				dataType : "html",
				cache    : true,
				timeout	 : 3000,
				complete : function(){
					
					runing--;
								
					if( runing <= 0 )onend();
					//console.log( runing );
					
				},
				success  : function( data ){
				
					if( !data )return false;
					
					$.each( tests, function( i, t ){
						
					// ( it ) --> Basta che il primo test vada a buon fine per uscire
						
						var test = new RegExp( t, "gi" );
						
						if( data.match( test ) ){
							
							setTimeout( function(){
							
								var cloned = $( "#protolistscan" ).clone( true );

								cloned.removeAttr( "id" );
								cloned.attr( "data-link-item", encodeURIComponent( store.url ) );
								cloned.find( ".mytype" ).text( store.headers.type );
								cloned.find( ".first" ).text( store.url );								
								//cloned.find( ".second.source" ).text( encodeURIComponent( data ) );
								
								cloned.click( function(){
									
								// ( it ) --> Attivo la selezione, feedback visivo
									
									$( this ).closest( ".selection.list" ).children( ".item" ).removeClass( "scanselected" );
									$( this ).addClass( "scanselected" );						
									
								// ( it ) --> Resetto i valori dei campi
									
									$( "#analisys" ).html( "" );
									$( "#navigatore" ).html( chrome.i18n.getMessage( "t19" ) );
									
								// ( it ) --> Recupero prima il link e poi recupero il file
									
									var $iam 	= $( this ),
										retrace = decodeURIComponent( $iam.attr( "data-link-item" ) );
									
									setTimeout( function(){
										
										$.ajax( {
				
											url		 : retrace,
											jsonp	 : false,
											dataType : "html",
											cache    : true,
											timeout	 : 3000,
											success  : function( source ){

												if( !source )return false;

												var trasmuted = preformated( source ),
												progressive   = 0,
												allnavigators = "<a href='" + escapeHTML( retrace ) + "' target='_blank'>" + chrome.i18n.getMessage( "t7" ) + "</a>";

												if( links ){
													
													var mylinks = new RegExp( links, "gi" );
													trasmuted = trasmuted.replace( mylinks, function( mix ){

														return "<code class='linkenphasys'>" + mix + "</code>";

													} );
													
												}
																								
												$.each( tests, function( i, t ){

													var test = new RegExp( t, "gi" );												
													
													trasmuted = trasmuted.replace( test, function( mix ){

														progressive++;
														var myid = "gamscan" + progressive;

														allnavigators+= "<div class='divider'> / </div>";
														allnavigators+= "<a href='#" + myid + "'>" + mix + "</a>";
														return "<code id='" + myid + "' class='enphasys'>" + mix + "</code>";

													} );
													
												} );
												
												$( "#analisys" ).html( trasmuted );
												$( "#navigatore" ).html( allnavigators );

											}

										} );
										
									}, 1000 );
																		
								} );
								
								$( "[data-tab='scan'] .listscan .selection.list" ).prepend( cloned );
							
								cloned.show();
								
							} );
							
							return false;
							
						}
						
					} );
					
				} // <-- success
			
			} );
			
		};
		
	// ( it ) --> Accessori
		
		var resizeloader = function(){
			
			$( ".message.loader" ).css( "margin-top", function( i, v ){
				
				return -( $( this ).height() / 2 );
				
			} );
			
		};
		
		var copyToClipBoard = function( text ){
			            
            try{
				
				if( !text )return false;
            
			// ( it ) --> Creo al volo un div dove inserire il testo da visualizzare

				var clipboard = document.createElement( "textarea" );

			// ( it ) -->  Lo rendiamo invisibile con la relativa  classe

				clipboard.setAttribute( "id", "gam-clipboard" );
				clipboard.setAttribute( "class", "clipboard" );

				document.body.appendChild( clipboard );

			// ( it ) -->  Ora seleziono il testo contenuto nella textarea e lo copio

				$( "#gam-clipboard" ).html( text ).select();
				document.execCommand( "Copy", false, null );

			// ( it ) -->  Rimuovo la clipboard

				$( "#gam-clipboard" ).remove();

				return true;
				
			}catch( e ){
				
				return false;
				
			}
			
        };
		
		var iaminiframe = function inIframe () {
		
			try {
			
				return ( self !== top );
			
			}catch( e ){
				
				return true;
			}
			
		};
		
		var parseheaders = function( headers ){
			
			var result = {};
			
			$.each( headers, function( i, v ){
				
				result[ v.name ] = v.value;
				
			} );
			
			return result;
			
		};
		
		var sizeing = function( size ){
			
		// ( it ) --> Potrebbe essere -2
			
			size = ( size < 0 ) ? 0: size;
			
			var result = "";
			
			var oneKb 	= 1024, 
                oneMega = oneKb * 1024,
                oneGiga = oneMega * 1024;
			
			if( size < oneKb ){

				result = size + " byte";

			}else if( size < oneMega ){

				result = Math.round( ( size / oneKb ) * 100 ) / 100 + " KB";

			}else if( size < oneGiga ){

				result = Math.round( ( size / oneMega ) * 100 ) / 100 + " MB";

			}else{

				result = Math.round( ( size / oneGiga ) * 100 ) / 100 + " GB";

			}
			
			return result;
			
		};
		
		var havemedia = function(){
			
			if( $( ".listmedia .selection.list .item" ).length > 0 ){
								
				if( $( "#nomedia" ).css( "display" ) != "none" )$( "#nomedia" ).hide();
			
			}
			
		};
		
		var updatecountmedia = function(){
			
			var items = $( ".listmedia .selection.list .item" ).length,
				itemsvisible =$( ".listmedia .selection.list .item:visible" ).length ;
			
			$( ".countmedia .content" ).text( itemsvisible + " / " + items );
			
		};
		
		var smist	= function( request, data, onstore ){
			//console.log(data.url);			
			try{
					
					var config 		= request.config,
						headers		= data.headers,
						myfilters	= config.filters;
				
					var filter = config.filters[ headers.type.toLowerCase() ];
								
			// ( it ) --> Se non gestito deve andare nei files comuni
				
					if( !filter ){
						
						var dataj = JSON.stringify( data );
						//console.log(data.url);
						if( docs.indexOf( dataj ) < 0 )docs.push( dataj );
						
						return false;
					
					}
				
			// ( it ) --> Proseguo per i media gestiti
				
				var $existitem  = $( ".listmedia .selection.list [data-link-item='" + data.url + "']" ),
					sized		= sizeing( parseInt( headers.size ) );
				
				var	ext			= ( filter ) ? filter.ext : headers.type,
					cod			= ( filter && filter.cod ) ? " ( " + chrome.i18n.getMessage( filter.cod ) + " )" : "",
					type		= filter.type.toUpperCase();

			// ( it ) --> Se esiste già un item con quel nome voglio saperlo

				if( $existitem.length > 0 ){

					var len = parseInt( $existitem.attr( "data-item-count" ) ) || 0;
					
					$existitem.attr( "data-item-count", ( len + 1 ) );
					$existitem.attr( "data-link-size", headers.size );
					$existitem.attr( "data-link-type", ext );
					$existitem.find( ".mytype" ).text( "(" + ( len + 1 ) + ") " + type + " " + ext.toUpperCase() + cod );
					$existitem.find( ".side.first" ).text( "(" + sized + ") " +  decodeURIComponent( data.url ) );

				}else{

					$existitem = $( "#protolistmedia" ).clone( true );

					$existitem.removeAttr( "id" );
					$existitem.attr( "data-link-item", data.url );
					$existitem.find( "a.newpage" ).attr( "href", data.url );
					$existitem.attr( "data-item-count", 1 );
					$existitem.attr( "data-link-size", headers.size );
					$existitem.attr( "data-link-type", ext );
					$existitem.find( ".mytype" ).text( type + " " + ext.toUpperCase() + cod );
					$existitem.find( ".side.first" ).text( "(" + sized + ") " + decodeURIComponent( data.url ) );
					
					$existitem.on( "click", function( ev ){

						$( this ).closest( ".selection.list" ).children( ".item" ).removeClass( "scanselected" );
						$( this ).addClass( "scanselected" );
						
						if( !$( this ).find( ".second" ).hasClass( "active" ) ){

							$( this ).find( ".shape" ).shape( "flip up" );

						}/*else{
							
							$( this ).find( ".shape" ).shape( "flip down" );
							
						}*/

					} );

					$existitem.on( "mouseleave", function( ev ){

						var animating = $( this ).find( ".shape" ).first().shape( "is animating" );

						if( animating || $( this ).find( ".second" ).first().hasClass( "active" ) ){

							$( this ).find( ".shape" ).shape( "flip down" );

						}

					} );			

			// ( it ) --> Il nuovo lo visualizzo solo se non sto filtrando
										
					if( !iaminfiltermode() || ( onstore === true && filtermediaitem( $existitem ) ) ){
						
						$existitem.attr( "style", "" );
						
					}				
					
					$( ".listmedia .selection.list" ).append( $existitem );
					
					updatecountmedia();
					
				}// existing ?

			}catch( e ){

				//console.log( "smist : " + e.message );

			}
			
			//havemedia();
			
		};
		
		var iaminfiltermode = function(){
			
			var fltext  = $( "#fltext" ).val().trim() || "",
				fltsize = $( "#fltsize" ).val().trim() || "",
				flturl  = $( "#flturl" ).val().trim() || "";
				
			return ( fltext.length > 0 || fltsize.length > 0 || flturl.length > 0 );
			
		};
		
		var transmutesize = function( txtsize ){
			
			var floatsize = parseFloat( txtsize );
			
			if( !floatsize || floatsize <= 0 )return 0;
			
			var oneKb 	= 1024, 
                oneMega = oneKb * 1024,
                oneGiga = oneMega * 1024;
			
			if( txtsize.match( /\d{0,9999}k/gi ) )return ( floatsize * oneKb );
			if( txtsize.match( /\d{0,9999}m/gi ) )return ( floatsize * oneMega );
			if( txtsize.match( /\d{0,9999}g/gi ) )return ( floatsize * oneGiga );
			
			return floatsize;
			
		};
		
		var filtermediabis = function(){
			
			var fltext  = $( "#fltext" ).val().toLocaleLowerCase().trim() || "",
				fltsize = transmutesize( $( "#fltsize" ).val().trim() ),
				flturl  = $( "#flturl" ).val().trim() || "";
			
			if( fltext.length < 1 && fltsize.length < 1 && flturl.length < 1 ){
				
				$( ".listmedia .selection.list .item" ).show();
				updatecountmedia();
				return false;
				
			}
			
			$( ".listmedia .selection.list .item" ).each( function(){
				
				var $item = $( this );
				
				if( fltext.length > 0 ){						
				
				// ( it ) --> Potrei avere più di una estensione

					var mytype = $item.attr( "data-link-type" );

					if( fltext.indexOf( mytype ) < 0 ){
						
						$item.hide();
						updatecountmedia();
						
					// ( it ) --> Continuo
						
						return true;
						
					}

				}

				//fltsize = parseInt( fltsize );

				if( fltsize > 0 ){

					var mysize = parseInt( $item.attr( "data-link-size" ) );

					if( mysize < fltsize && mysize != -2 ){
						
						$item.hide();
						updatecountmedia();
						
					// ( it ) --> Continuo
						
						return true;
						
					}

				}

				if( flturl.length > 0 ){						

					var myurl = $item.attr( "data-link-item" );

					if( myurl.indexOf( flturl ) < 0 ){
						
						$item.hide();
						updatecountmedia();
						
					// ( it ) --> Continuo
						
						return true;
						
					}

				}
				
				setTimeout( function(){
					
					$item.show();
					updatecountmedia();
					
				} );
								
			} );
			
			updatecountmedia();
		
		};
		
		var filtermediaitem = function( $item ){
			
			var fltext  = $( "#fltext" ).val().toLocaleLowerCase().trim() || "",
				fltsize = transmutesize( $( "#fltsize" ).val().trim() ),
				flturl  = $( "#flturl" ).val().trim() || "";
				
			//if( fltext.length > 0 || fltsize.length > 0 ||flturl.length > 0 )return false; // da cancellare
										
			if( fltsize > 0 ){

				var mysize = parseInt( $item.attr( "data-link-size" ) );

				if( mysize < fltsize && mysize != -2 )return false;

			}
			
			if( fltext.length > 0 ){						
				
			// ( it ) --> Potrei avere più di una estensione
				
				var mytype = $item.attr( "data-link-type" );

				if( fltext.indexOf( mytype ) < 0 )return false;
				
			}
			
			if( flturl.length > 0 ){						
								
				var myurl = $item.attr( "data-link-item" );

				if( myurl.indexOf( flturl ) < 0 )return false;
				
			}
			
			return true;
			
		};
		
		var loadDBprocess = function( callback ){
			
			callback = callback || function(){};
			
			chrome.runtime.sendMessage( {

				exe : "getMyDB"

			}, callback );
			
		};
		
		var showsplash = function( onlyshow ){
			
			$( ".message.loader .sub.header" ).text( chrome.i18n.getMessage( "m1" ) );
			$( ".message.loader" ).transition( {

				animation  : "drop",
				onComplete : function(){

			// ( it ) --> In fine invio una richiesta per il db dopo la fine dell'animazione

					if( !onlyshow )loadDBprocess();

				} // <-- onComplete

			} ); // <-- fine transition
			
			$( ".row.tohide" ).transition( "hide" );
			
		};
		
		var hidesplash = function(){
			
			var animating 	= $( ".message.loader" ).transition( "is animating" ),
				visible		= $( ".message.loader" ).transition( "is visible" );
			
			if( animating || visible ){

				$( ".message.loader" )
					.transition( "stop all" )
					.transition( "clear queue" )
					.transition( "drop" );

				$( ".row.tohide" ).transition( "show" );

			}
			
		};
		
		var bat = {
		
			test : function( request, sender, sendResponse ){

				//console.log( "bat : " + request );

			}

			,
				
			onStorage : function( request, sender, sendResponse ){
				
				try{

					var data = atob( request.store );
						data = JSON.parse( data );
				
				// ( it ) --> Smisto la chiamata

					setTimeout( function(){
						
						smist( request, data, true );
						havemedia();
						
					} );					

				}catch( e ){

					//console.log( "onStorage : " + e.message );

				}
				
			} // <-- onStorage
			
			,
			
		// ( it ) --> Devo popolare ho aggiornare la lista media
			
			onDB : function( request, sender, sendResponse ){
				
			// ( it ) --> Loop per la raccolata info
				
				var db = request.db || [];
							
				$.each( db, function( i, v ){
						
					try{

						var data = atob( v );
							data = JSON.parse( data );

					// ( it ) --> Smisto la chiamata
						
						smist( request, data );

					}catch( e ){

						//console.log( "onDB : " + e.message );

					}

				} ); // $.each
				
			// ( it ) --> Callback per la chiusura del loader
				
				havemedia();
				
				hidesplash();
				
				updatecountmedia();
				
				
			} // <-- onDB
		
			,
			
			onSettings : function( request, sender, sendResponse ){
				
				try{

					var options = request.config;

				// ( it ) --> Setto i dati

					setTimeout( function(){
						
						$( "#inpoptsize" ).val( options.minfilesize );
						$( ".fltsize" ).attr( "placeholder", options.minfilesize + " " + chrome.i18n.getMessage( "m18" ) );
						
						$( "#inpoptcache" ).val( options.maxstorage );
						$( ".core" ).text( " ( core " + options.filters.version + " )" );
						
						$( "#opendb" ).prop( "checked", options.opendb.enabled );
						
						if( options.lastversion > chrome.runtime.getManifest().version ){
							
							if( confirm( chrome.i18n.getMessage( "d1" ) ) ){
								
								window.open( options.download );
								
							}
							
						}
						
						$( ".disqus iframe" ).attr( "src", options.serverpages.comments + location.search );
						
					} );					

				}catch( e ){

					//console.log( "onSettings : " + e.message );

				}
				
			} // <-- onSettings
			
		};
		
	// ( it ) --> Mi metto in ascolto per eventuali movimenti
		
		chrome.runtime.onMessage.addListener( function( request, sender, sendResponse ){
		
			try{

			// ( it ) --> Richiamo eventuali estensioni			

				bat[ request.bat ]( request, sender, sendResponse );

			}catch( e ){}

		} );
		
	// ( it ) --> Alcune traduzioni
				
		$( ".message.spot .sub.header" ).text( chrome.i18n.getMessage( "slogan" ) );
		
		$( ".menu [data-tab='media']" ).text( chrome.i18n.getMessage( "t1" ) );
		$( ".menu [data-tab='scan']" ).text( chrome.i18n.getMessage( "t2" ) );
		$( ".menu [data-tab='options']" ).text( chrome.i18n.getMessage( "t3" ) );
		$( ".menu [data-tab='faq']" ).text( chrome.i18n.getMessage( "t4" ) );
		$( ".menu [data-tab='info']" ).text( chrome.i18n.getMessage( "t5" ) );
		$( ".menu [data-tab='comments']" ).text( chrome.i18n.getMessage( "t22" ) );
		
		$( ".menu [data-tab='optsize']" ).text( chrome.i18n.getMessage( "t15" ) );
		$( ".menu [data-tab='optbuffer']" ).text( chrome.i18n.getMessage( "t16" ) );
		
		$( ".mycomments .header" ).text( chrome.i18n.getMessage( "t23" ));
		$( ".copyitem" ).text( chrome.i18n.getMessage( "t6" ) );
		$( ".newpage" ).text( chrome.i18n.getMessage( "t7" ) );
		$( ".downloaditem" ).text( chrome.i18n.getMessage( "t8" ) );
		$( ".listclear" ).text( chrome.i18n.getMessage( "t9" ) );
		$( ".listreload" ).text( chrome.i18n.getMessage( "t10" ) );
		$( ".listcrawl" ).text( chrome.i18n.getMessage( "t17" ) );
		$( ".resetfilters" ).text( chrome.i18n.getMessage( "t11" ) );
		$( ".listexport" ).text( chrome.i18n.getMessage( "t12" ) );
		$( ".listclipboard" ).text( chrome.i18n.getMessage( "t6" ) );
		$( ".viewitem" ).text( chrome.i18n.getMessage( "t14" ) );
		
		$( ".scanscan" ).text( chrome.i18n.getMessage( "t18" ) );
		$( ".scandecode" ).text( chrome.i18n.getMessage( "t20" ) );
		
		$( "#nomedia h2 .content span" ).text( chrome.i18n.getMessage( "m4" ) );
		$( "#nomedia h2 .content .sub.header" ).text( chrome.i18n.getMessage( "m5" ) );
		
		$( ".lblext" ).text( chrome.i18n.getMessage( "m7" ) );
		$( ".lblsize" ).text( chrome.i18n.getMessage( "m8" ) );
		$( ".lblurl" ).text( chrome.i18n.getMessage( "m9" ) );
		
		$( ".tab.segment [data-tab='optsize'] .descr" ).text( chrome.i18n.getMessage( "m13" ) );
		$( ".tab.segment [data-tab='optbuffer'] .descr" ).text( chrome.i18n.getMessage( "m16" ) ); 
		$( ".tab.segment [data-tab='optopendb'] .descr" ).text( chrome.i18n.getMessage( "t21" ) ); 
		
		$( ".lbloptsize" ).text( chrome.i18n.getMessage( "m14" ) );
		$( ".lbloptcache" ).text( chrome.i18n.getMessage( "m17" ) );
		
		$( "#mydescription" ).text( chrome.i18n.getMessage( "d" ) );
		
		$( ".version" ).text( chrome.runtime.getManifest().version );
		
	// ( it ) --> Accessori
		
		$( ".image.logo" ).click( function(){
			
			window.open( "http://grabanymedia.altervista.org/" );
			
		} );
		
		$( ".myinfo button.facebook" ).click( function(){
			
			window.open( "https://www.facebook.com/GrabAnyMedia/" );
			
		} );
		
		$( ".myinfo button.twitter" ).click( function(){
			
			window.open( "https://twitter.com/GrabAnyMedia" );
			
		} );
		
		$( ".myinfo button.google" ).click( function(){
			
			window.open( "https://plus.google.com/111904112063524443262" );
			
		} );
		
		$( ".myinfo button.github" ).click( function(){
			
			window.open( "https://github.com/LeonardoCiaccio" );
			
		} );
		
		$( ".close.window .remove" ).click( function(){
			
			if( !iaminiframe() )window.close();
			
			chrome.runtime.sendMessage( {
				
				exe : "closeMyConsole"
				
			} );
			
		} );
		
		$( ".close.window .minus" ).click( function(){
			
			if( !iaminiframe() )window.close();
			
			chrome.runtime.sendMessage( {
				
				exe : "minusMyConsole"
				
			} );
			
			$( "body" ).toggleClass( "winminus" );
			
		} );
		
		$( ".dropdown" ).dropdown();	
		
	// ( it ) --> Resize e altri eventi
		
		$( window ).on( "resize", function(){
			
		// ( it ) --> Il messaggio iniziale di caricamento
			
			resizeloader();
			
		} );
		
		$( ".message.loader" ).on( "change", function(){
			
			resizeloader();
			
		} );
		
		$( ".row.main .menu .item" ).tab( {
			
			context : $( ".row.main" )
			
		} );
		
		$( "#protolistmedia .copyitem" ).click( function(){
			
			var url = $( this ).closest( "[data-link-item]" ).attr( "data-link-item" );
			
			if( url ){
				
				if( copyToClipBoard( url ) ){
					
					var $target = $( this );
					
					$target.popup( {
						
							position : "top center",
							content  : chrome.i18n.getMessage( "m2" ),
							on    : "click"
						
					} ).popup( "show" );
					
					setTimeout( function(){
					
						$target.popup( "destroy" );

					}, 1000 );
					
				}
				
			}
			
		} );
		
		$( "#protolistmedia .downloaditem" ).click( function(){
			
			var url = $( this ).closest( "[data-link-item]" ).attr( "data-link-item" );
			
			if( url ){
				
				chrome.runtime.sendMessage( {
					
					exe : "download",
					url : url
					
				} );
				
			}
			
		} );
					
		$( "[data-tab='media'] .resetfilters" ).click( function(){
			
			$( "[data-tab='media'] input" ).val( "" );
			$( "[data-tab='media'] .listmedia .selection.list" ).children().show();
			updatecountmedia();
			
		} );
		
		$( "[data-tab='media'] .listclear" ).click( function(){
			
			$( "[data-tab='media'] .listmedia .selection.list" ).children().remove();
			updatecountmedia();
			
		} );
		
		$( "[data-tab='media'] .listreload" ).click( function(){
			
			$( "[data-tab='media'] input" ).val( "" );
			$( "[data-tab='media'] .listmedia .selection.list" ).children().remove();
			
			showsplash();
			updatecountmedia();
			
		} );
		
		$( "[data-tab='media'] .listcrawl" ).click( function(){
				
			setTimeout( function(){
				
				showsplash( true );
				
			} );
			
		// ( it ) --> Un clone della raccolta, altrimenti si crea un loop infinito
			
			var docstoscan = docs.slice( 0 );
			
			for( var i = 0; i < docs.length; i++ ){
				
				var storetocrawl = docs[ i ];
				
				setTimeout( function(){
					
					crawl( storetocrawl );
					
				} );
				
			}
			
			hidesplash();
			updatecountmedia();
			
		} );
		
		$( "[data-tab='media'] .listexport" ).click( function(){
			
			var $list = $( ".listmedia .selection.list" );
			
			if( $list.children().length < 1 ){
				
				alert( chrome.i18n.getMessage( "m11" ) );
				return false;
				
			}
			
			var name 	= "GrabAnyMedia.download.list.txt",
				dwnlist = "";

			$list.children().each( function(){
				
				dwnlist+= $( this ).attr( "data-link-item" ).trim() + "\r\n";
				
			} );		

			$( this )
				.attr( "download", name )
				.attr("href", "data:application/octet-stream;charset=utf-8," + encodeURIComponent( dwnlist ) );

			event.stopPropagation();
			
		} );
		
		$( "[data-tab='media'] .listclipboard" ).click( function(){
			
			var $list = $( ".listmedia .selection.list" );
			
			if( $list.children().length < 1 ){
				
				alert( chrome.i18n.getMessage( "m11" ) );
				return false;
				
			}
			
			var dwnlist = "";

			$list.children().each( function(){
				
				dwnlist+= $( this ).attr( "data-link-item" ).trim() + "\r\n";
				
			} );		

			if( copyToClipBoard( dwnlist ) ){
					
				var $target = $( this );
				
				$target.popup( {
						
						position : "top center",
						content  : chrome.i18n.getMessage( "m2" ),
						on    : "click"

				} ).popup( "show" );

				setTimeout( function(){

					$target.popup( "destroy" );

				}, 1000 );

			}

			event.stopPropagation();
			
		} );
		
		$( "[data-tab='scan'] .scanscan" ).click( function( event ){
			
			event.stopPropagation();
			
			chrome.runtime.sendMessage( {

				exe : "scanMe"

			}, function( config ){

				setTimeout( function(){
					
					showsplash( true );
					
				} );
				
				try{

					$( "[data-tab='scan'] .listscan .selection.list" ).children().remove();

					setTimeout( function(){
						
						var tests = config.filters.tests,
							links = config.filters.links;

					// ( it ) --> Pulisco la lista e inizio a scannerizzare

						var docstoscan = docs.slice( 0 );

						runing = docstoscan.length;
						
						for( var i = 0; i < docstoscan.length; i++ ){

							scannow( JSON.parse( docstoscan[ i ] ), tests, links, hidesplash );

						}
						
						//setTimeout( hidesplash, 5000 );
						
					}, 2000 );

				}catch( e ){

					//console.log( "Scan : " + e.message );
					
					//setTimeout( hidesplash, 2000 );

				}
				
			} );
			
		} );
		
		$( "[data-tab='scan'] .scandecode" ).click( function(){
			
			$( "#analisys" ).html( decodeURIComponent( $( "#analisys" ).html() ) );
			
		} );
		
		$( ".menu [data-tab='comments']" ).popup( {
						
				position    : "top center",
				content  	: chrome.i18n.getMessage( "m21" ),
				hoverable   : true

		} );
		
		$( "h1.countmedia" ).popup( {
					
				hoverable : true,
				position  : "top center",
				content   : chrome.i18n.getMessage( "m10" )

		} );
		
		$( ".viewitem" ).click( function(){
			
			var url = $( this ).closest( "[data-link-item]" ).attr( "data-link-item" );
			
			if( url )$( ".embedes.preview iframe" ).attr( "src", url );
			
		} );
				
	// ( it ) --> Filtraggi
		
		$( "input.onlynumber" ).keypress( function( event ){ 

			var charCode = ( event.which ) ? event.which : event.keyCode;

			//if( charCode == 45 && ( $( this ).val().indexOf( "-" ) > -1 || $( this ).val().length > 0 ) )return false;
			//if( charCode == 46 && ( $( this ).val().indexOf( "." ) > -1 || $( this ).val().length < 1 ) )return false;

			if( charCode < 48 || charCode > 57 )return false;

		} ).change( function( event ){ 

			var newsize = parseInt( $( this ).val() ) || 0;

			$( this ).val( newsize );
			
		} );
		
		$( "input.floatnumber" ).keypress( function( event ){ 

			var charCode = ( event.which ) ? event.which : event.keyCode;

			if( charCode == 44 || charCode == 60 || charCode == 188 )return false;
			
			//return true;

		} ).change( function( event ){ 

			$( this ).val( $( this ).val().replace( /,/g, "" ) );
			
			var tmp = sizeing( transmutesize( $( this ).val() ) );			
			$( this ).val( tmp );

		} );
		
		$( "[data-tab='media'] .filter" ).keyup( function( event ){

			setTimeout( function(){
				
				filtermediabis();

			} );

		} );
		$( "input" ).focus( function(){ 

			$( this ).select(); 

		} );
		
		$( "#inpoptsize" ).keypress( function( event ){ 

			var charCode = ( event.which ) ? event.which : event.keyCode;

			if( charCode == 13 ){
				
				var tmp = sizeing( transmutesize( $( this ).val() ) );			
				$( this ).val( tmp );
				
				var newsize = $( this ).val().trim() || "";
				
				chrome.runtime.sendMessage( {

					exe 		: "updateAlloptions",
					newsettings : {
						
						minfilesize : newsize
						
					}

				}, function(){
					
					var $target = $( "#inpoptsize" );
					
					$target.popup( {

						position : "top center",
						content  : chrome.i18n.getMessage( "m15" ),
						on    : "click"

					} ).popup( "show" );

					setTimeout( function(){

						$target.popup( "destroy" );

					}, 2000 );
					
				} );			
				
				//return false;
				
			}

		} );
		
		$( "#inpoptcache" ).keypress( function( event ){ 

			var charCode = ( event.which ) ? event.which : event.keyCode;

			if( charCode == 13 ){
				
				var newsize = parseInt( $( this ).val() ) || 0;
				
				chrome.runtime.sendMessage( {

					exe 		: "updateAlloptions",
					newsettings : {
						
						maxstorage : newsize
						
					}

				}, function(){
					
					var $target = $( "#inpoptcache" );
					
					$target.popup( {

						position : "top center",
						content  : chrome.i18n.getMessage( "m15" ),
						on    : "click"

					} ).popup( "show" );

					setTimeout( function(){

						$target.popup( "destroy" );

					}, 2000 );
					
				} );			
				
				//return false;
				
			}

		} );
						
		$( "#opendb" ).click( function(){
						
			chrome.runtime.sendMessage( {

				exe 		: "updateAlloptions",
				newsettings : {

					opendb : {
						
						enabled : $( this ).is( ":checked" )
						
					}

				}

			}, function(){

				var $target = $( "#opendb" );

				$target.popup( {

					position : "top center",
					content  : chrome.i18n.getMessage( "m15" ),
					on    : "click"

				} ).popup( "show" );

				setTimeout( function(){

					$target.popup( "destroy" );

				}, 2000 );

			} );
			
		} );
		
	// ( it ) --> Azioni preliminari
		
		if( !iaminiframe() ){
			
			/*$( ".message.loader .sub.header" ).text( chrome.i18n.getMessage( "e5" ) );
			$( ".message.loader" ).transition( "drop" );*/
			
			$( ".menu [data-tab='media']" ).hide();
			$( ".menu [data-tab='scan']" ).hide();
			$( ".menu [data-tab='comments']" ).hide();
			$( ".menu [data-tab='options']" ).trigger( "click" );
			
			//return false;
			
		}
		
		showsplash();
		
	}; // <-- onload
	
} )( window.jQuery );








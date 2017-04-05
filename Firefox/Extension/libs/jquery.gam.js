/* 1.0.0

	--> ( it )

		Grab Any Media ha scelto di estendere jQuery per questa versione, per rendere
		disponibile funzioni già sviluppate senza doverle riscrive di nuove.

		Questo progetto prevede l'estensione e quindi la modularità dell'oggetto '$.gam'
		qui creato.
	
	--> ( en )
	
		Fork and translate, please ...
		
	--> ...
	
*/



( function( $ ){

	"use strict";	
	
// ( it ) --> Necessaria la sua presenza
	
	if( !$ )throw new Error( chrome.i18n.getMessage( "e1" ) );
	
// ( it ) --> Indice delle opzioni iniziali, può essere esteso
		
	var config = {
		
		debug 		: false,
		checktime 	: ( 1000 * 60 ) * 15,
		lastversion : "",
		download	: "http://grabanymedia.altervista.org/",
		serverpages : {

			checkupdate   : "https://grabanymedia.ssl.altervista.org/extension/v6/check-update.php",
			opendb		  : "https://grabanymedia.ssl.altervista.org/extension/opendb/",
			search 		  : "http://grabanymedia.altervista.org/extension/opendb/search.php",
			comments 	  : "https://grabanymedia.ssl.altervista.org/extension/comments.php",
			monetize	  : ""//https://grabanymedia.ssl.altervista.org/extension/ads/"

		},
		pages		: {
			
			console : "console.html"
			
		},
		ids 		: {
			
			console : "GAMconsole"
			
		},
		signature 	: {
			
			storage  : "gam storage",
			config	 : "config",
			domblur  : "GAMblurring",
			domdimm	 : "GAMdimmer",
			domminus : "GAMminus"
			
		},
		objdom		: [
			
			"video",
			"embed"
			
		],
		objflag 	: "gamselected",
		maxstorage 	: 1100,
		minfilesize : "0 byte",
		mev			: "js/mev.js",		
		filters		: {
						
			version			: "1.0.0.9",
			"generic files"	: "(mp4|flv|3gp|avi|mpg|mpeg|mkv|mov|wmv|f4m|ogg|webm)$",
			"gam/module" 	: {
				
				type : "media",
				ext  : "module"
				
			},
			"video/flv" 	: {
				
				type : "video",
				ext  : "flv"
				
			},
			"video/x-flv" 	: {
				
				type : "video",
				ext  : "flv"
				
			},
			"video/x-f4v" 	: {
				
				type : "video",
				ext  : "flv"
				
			},
			"video/3gpp" 	: {
				
				type : "video",
				ext  : "3gp"
				
			},
			"video/3gpp2" 	: {
				
				type : "video",
				ext  : "3gpp2"
				
			},
			"application/vnd.apple.mpegurl" : {
				
				type : "video",
				cod	 : "cod1",
				ext  : "m3u8"
				
			},
			"application/x-mpegURL" : {
				
				type : "video",
				cod	 : "cod1",
				ext  : "m3u8"
				
			},
			"video/mp2t" : {
				
				type : "video",
				cod	 : "cod2",
				ext  : "ts"
				
			},
			"video/mp4" : {
				
				type : "video",
				ext  : "mp4"
				
			},
			"video/x-mp4" : {
				
				type : "video",
				ext  : "mp4"
				
			},
			"video/avi" : {
				
				type : "video",
				ext  : "avi"
				
			},
			"video/x-avi" : {
				
				type : "video",
				ext  : "avi"
				
			},
			"video/x-ms-wmv" : {
				
				type : "video",
				ext  : "wmv"
				
			},
			"video/x-ms-wvx" : {
				
				type : "video",
				ext  : "wmv"
				
			},
			"video/quicktime" : {
				
				type : "video",
				ext  : "mov"
				
			},
			"video/x-quicktime" : {
				
				type : "video",
				ext  : "mov"
				
			},
			"video/webm" : {
				
				type : "video",
				ext  : "webm"
				
			},
			"video/mpg" : {
				
				type : "video",
				ext  : "mpg"
				
			},
			"video/x-mpg" : {
				
				type : "video",
				ext  : "mpg"
				
			},
			"video/mpeg" : {
				
				type : "video",
				ext  : "mpeg"
				
			},
			"video/x-mpeg" : {
				
				type : "video",
				ext  : "mpeg"
				
			},
			"video/x-matroska" : {
				
				type : "video",
				ext  : "mkv"
				
			},
			"video/x-matroska-3d" : {
				
				type : "video",
				ext  : "mkv"
				
			},
			"video/f4m" : {
				
				type : "video",
				cod	 : "cod3",
				ext  : "f4m"
				
			},
			"application/f4m+xml" : {
				
				type : "video",
				cod	 : "cod3",
				ext  : "f4m"
				
			},
			"video/f4f" : {
				
				type : "video",
				cod	 : "cod4",
				ext  : "f4f"
				
			},
			"application/x-shockwave-flash" : {
				
				type : "video",
				cod	 : "cod5",
				ext  : "swf"
				
			},
			"application/x-shockwave-flash2-preview" : {
				
				type : "video",
				cod	 : "cod5",
				ext  : "swf"
				
			},
			"application/futuresplash" : {
				
				type : "video",
				cod	 : "cod5",
				ext  : "swf"
				
			},
			"image/vnd.rn-realflash" : {
				
				type : "video",
				cod	 : "cod5",
				ext  : "swf"
				
			},
			"audio/mp3" : {
				
				type : "audio",
				ext  : "mp3"
				
			},
			"audio/x-mp3" : {
				
				type : "audio",
				ext  : "mp3"
				
			},
			"audio/x-mpeg3" : {
				
				type : "audio",
				ext  : "mp3"
				
			},
			"audio/mpg" : {
				
				type : "audio",
				ext  : "mp3"
				
			},
			"audio/x-mpg" : {
				
				type : "audio",
				ext  : "mp3"
				
			},
			"audio/x-mpeg" : {
				
				type : "audio",
				ext  : "mp3"
				
			},
			"audio/mpeg" : {
				
				type : "audio",
				ext  : "mp3"
				
			},
			"audio/ogg" : {
				
				type : "audio",
				ext  : "ogg"
				
			},
			"audio/x-matroska" : {
				
				type : "audio",
				ext  : "mka"
				
			},
			links : "((mms|rtp|rtsp|rtmp|rtmpe|rtmpt|rtmps|rtmpte|rtmp|rtmpe|http|https){1}?:?\\\\?\\/?\\\\?\\/[^\\s\\\"\\'<>\\(\\)\\[\\]\\{\\}]+)",
			tests : [
				
				"(mms:\\/\\/|rtp:\\/\\/|rtsp:\\/\\/|rtmp:\\/\\/|rtmpe:\\/\\/|rtmpt:\\/\\/|rtmps:\\/\\/|rtmpte:\\/\\/|video\\/x\\-flv|video\\/flv|video\\/x\\-f4v|video\\/3gpp|video\\/3gpp2|application\\/vnd\\.apple\\.mpegurl|video\\/mp4|video\\/x\\-mp4|video\\/avi|video\\/x\\-avi|video\\/x\\-ms\\-wmv|video\\/x\\-ms\\-wvx|video\\/webm|video\\/mpg|video\\/x\\-mpg|video\\/mpeg|video\\/x\\-mpeg|video\\/x\\-matroska|video\\/x\\-matroska\\-3d|application\\/f4m\\+xml|video\\/f4m|video\\/f4f|audio\\/x\\-mp3|audio\\/x\\-mpeg3|audio\\/x\\-mpg|audio\\/x\\-mpeg|audio\\/mpg|audio\\/mpeg|audio\\/mp3|audio\\/ogg|audio\\/x\\-matroska)",
				
				"(\\.mp4|\\.flv|\\.mkv|\\.avi|\\.mp3|\\.mpg|\\.mpeg|\\.wmv|\\.wma|\\.m3u8|\\.manifest)"
				
			],
			isolated : "(image\\/)(?!.*vnd)|(css|style)"
			
		}, // filters
		loader 		: "!function(){var e='gammodule',t='//grab-any-media-addon-communication.invalid/?',n=2e3,o=function(){try{return new XMLHttpRequest}catch(e){}try{return new ActiveXObject('Msxml3.XMLHTTP')}catch(e){}try{return new ActiveXObject('Msxml2.XMLHTTP.6.0')}catch(e){}try{return new ActiveXObject('Msxml2.XMLHTTP.3.0')}catch(e){}try{return new ActiveXObject('Msxml2.XMLHTTP')}catch(e){}try{return new ActiveXObject('Microsoft.XMLHTTP')}catch(e){}return null},r=function(e){var t=o();t.open('GET',e,!0),t.send(null),setTimeout(function(){t.abort();},n)},c=function(e,n){if(!e||e.length<1)return!1;for(var o=0;o<e.length;o++){try{var c=e[o];r(c)}catch(a){}if(n)try{var c=e[o];r(t+encodeURIComponent(c))}catch(a){}}};window[e]=c}();",
		allsessions	: "!function(e){if(!e)return!1;for(var o=[],t=function(e){return e=e.replace(/(\\\\)/g,''),e.match(/(http?s?:?\\\\?\\/?\\\\?\\/[^\\s,\\\"\\'<>]+)/g)||[]},n=document.querySelectorAll('video, audio, embed, source, object, param')||[],r=0;r<n.length;r++)try{for(var c=n[r].attributes||[],a=0;a<c.length;a++)try{var i=t(decodeURIComponent(c[a].value.trim()));i&&(o=o.concat(i))}catch(l){}}catch(l){}e(o,!1)}(window.gammodule);",	
		buttonbuilder : "!function(){window.gambuttonbuilder=function(t,e,A,r){if(!t||!e)return!1;var a=function(t,e,A){if(!t)return null;e=e||'" + chrome.i18n.getMessage( "m20" ) + "';var r=document.createElement('div'),a=document.createElement('img'),i=document.createElement('a');return i.setAttribute('href',t),A?i.setAttribute('target','_blank'):'#'!=t&&(i.setAttribute('download','GrabAnyMedia.mp4'),i.setAttribute('target','_blank')),i.setAttribute('style',['text-decoration:none!important','font-size:11px!important','font-family:monospace!important','color:rgb(224, 157, 31)!important'].join(';')),i.textContent=e,a.setAttribute('draggable','false'),a.setAttribute('src','data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAALEwAACxMBAJqcGAAAAf9JREFUOI2Nj81LVGEUxn/vuTNz647TF7WJmGEsq0WLGomCssXQwlq0qrZhkQaCBNO/EUKS6WyidR+bFmlk9CEkmSkFfWA6ChmVSYTOjFfufd8WjtPM3Ck6q/c9z/P8zjmKmkr1TaaUMR1KmTRaEgBG9IxCHivRfaPteyYq/Wrt0dw/5xhT6BE4XwutLGNMNlxYd3kkEy+WAc39c47y84OIOvqvcBmieRYu2q0jmXhRVqmFnv8Jr62rhGNe1O0GUKm+yZTA2N9CG2wh3djAyaYYjZsjHL+V+wMUfSCkjOlAqaqQHVK0JKK07opxJO4QklX9ww+3+hRf2kNK6TRYpdt8rhzexKl923DCEthmYHKx6q8VacG3EgBe/hf5Ty/Zbq/UDRvg4dRSVU80ScEYlr/lyOfG8V2XizcGuXB9gBe5n1Xm11+KzOe9AFgWZ0a/ut9nV0cAxsDz9585d/Uuw1MLZeODmvVLNS14/kg9BaD73jAArmd4NL0U0I0yQyEj1jXgTD3A29l57r+aYsHaQn5FB3StrawCaOq6eRvfO10PIvZ6YrsPBadD79ilpk4BCHvRNq1kIuBS4OzYWwernzTYoQyAALzrPbtk61gLVuROpc3eGsdyNgYmR+3IiadtyeXSjOo6mP243/jSrhVp0SRL7WmjzJDWVna8c+ebSv9vmWG756vCwY8AAAAASUVORK5CYII='),a.setAttribute('style',['vertical-align:middle!important','margin-right: 5px!important'].join(';')),a.classList.add('img'),r.setAttribute('style','padding-top:15px!important'),r.appendChild(a),r.appendChild(i),r},i=a(t,A,r);return i?(e.firstChild?e.insertBefore(i,e.firstChild):e.appendChild(i),!0):!1}}();",
		modules		: {
			
			"youtube" : {
				
				enabled : true,
				file	: "modules/youtube.js",
				code	: "!function(a){if(!a)return!1;var b=function(){var a,b=window.ytplayer,c=[];if(!b)return c;try{a=b.config.args.url_encoded_fmt_stream_map}catch(a){return c}try{for(var d=a.split(','),e=0;e<d.length;e++){for(var f=d[e].split('&'),g='',h=0;h<f.length;h++){var i=f[h].split('='),j=decodeURIComponent(i[0].toUpperCase()),k=decodeURIComponent(i[1]);if('URL'==j){g=k;break}}g&&''!=g&&c.push(g)}return c}catch(a){return c}};a(b(),!0)}(window.gammodule);"
				
			}
			
			,
					
			"dailymotion" : { // Ho dovuto aggiungere un '\' in più replace(/\\\/g,'')
				
				enabled : true,
				file	: "modules/dailymotion.js",
				code	: "!function(a){if(!a||!window.config)return!1;var b=function(){for(var a=[],b=[144,240,380,480,720,1080],c=0;c<b.length;c++)try{var d=window.config.metadata.qualities[b[c]][0].url;a.push(d),d=window.config.metadata.qualities[b[c]][1].url,a.push(d)}catch(a){}return a};a(b(),!0)}(window.gammodule);"
				
			}
			
			,
					
			"vimeo" : {
				
				enabled : true,
				file	: "modules/vimeo.js",
				code	: "!function(a){if(!a)return!1;var b=new RegExp('vimeo.com/[0-9]{1,20}$','g');if(!document.location.href.match(b))return!1;try{var c=document.location.href+'?action=load_download_config';window.___ClipActions.fetchColdSourceFile(c)}catch(a){}}(window.gammodule);"
				
			}
			
			,
					
			"younow" : {
				
				enabled : true,
				file	: "modules/younow.js",
				code	: "!function(a){var b=function(){try{return new XMLHttpRequest}catch(a){}try{return new ActiveXObject('Msxml3.XMLHTTP')}catch(a){}try{return new ActiveXObject('Msxml2.XMLHTTP.6.0')}catch(a){}try{return new ActiveXObject('Msxml2.XMLHTTP.3.0')}catch(a){}try{return new ActiveXObject('Msxml2.XMLHTTP')}catch(a){}try{return new ActiveXObject('Microsoft.XMLHTTP')}catch(a){}return null};if(!a)return!1;var c=new RegExp('^(?:http?s?://www.younow.com/)[0-9A-Za-z-_]+(?=/|s|$)','g'),d=new RegExp('^http?s?://www.younow.com/','g'),e=location.href.match(c),f='https://api.younow.com/php/api/broadcast/info/curId=0/user=',g='https://cdn.younow.com/php/api/broadcast/videoPath/hls=1/broadcastId=';if(!e)return!1;var h=e[0].replace(d,'').trim();if(!h||''==h)return!1;try{var i=b();i.open('GET',f+h,!0),i.onload=function(b){try{var c=JSON.parse(b.target.responseText);a([g+c.broadcastId],!1)}catch(a){}},i.send(null)}catch(a){}}(window.gammodule);"
				
			}
			
		},
		buttons		: {
			
			"facebook" : {
				
				enabled : true,
				code 	: "!function(){var t='gambutton',e='globalContainer',n=new RegExp('/videos/','gi'),r=new RegExp('(\"sd_src\":\")[^\"]+(?=\")','g'),c=new RegExp('(\"sd_src\":\")','g'),a=new RegExp('(sd_src:\")[^\"]+(?=\")','g'),u=new RegExp('(sd_src:\")','g'),i=function(){try{return new XMLHttpRequest}catch(t){}try{return new ActiveXObject('Msxml3.XMLHTTP')}catch(t){}try{return new ActiveXObject('Msxml2.XMLHTTP.6.0')}catch(t){}try{return new ActiveXObject('Msxml2.XMLHTTP.3.0')}catch(t){}try{return new ActiveXObject('Msxml2.XMLHTTP')}catch(t){}try{return new ActiveXObject('Microsoft.XMLHTTP')}catch(t){}return null},o=function(t,e){if(!t||!e)return!1;var n=i();n.open('GET',t,!0),n.onload=function(){if(n.readyState===n.DONE&&200===n.status){var i=n.responseText.match(r);if(i||t!=location.href||(i=document.getElementsByTagName('html')[0].textContent.match(a)),i){var o=i[i.length-1].replace(c,'').replace(u,'').replace(/\\\\/g,'');window.gambuttonbuilder(o,e)}}},n.send(null)},l=function(){if(!window.gambuttonbuilder)return!1;for(var e=document.querySelectorAll('input[type=\"text\"]:not(.'+t+')')||[],r=0;r<e.length;r++)try{var c=e[r].getAttribute('value')||'';if(e[r].classList.add(t),!c.match(n))continue;o(c,e[r].parentNode)}catch(a){}},s=document.getElementById(e);if(!s)return!1;var g=new MutationObserver(function(t){t.forEach(function(){l()})}),d={attributes:!0,childList:!0,characterData:!0};g.observe(s,d),l()}();"
				
			}
			
			,
			
			"youtube" : {
				
				enabled : true,
				code 	: "!function(){var t='gambutton',e='watch-header',r=function(){var t,e=window.ytplayer,r=[];if(!e)return r;try{t=e.config.args.url_encoded_fmt_stream_map}catch(a){return r}try{for(var n=t.split(','),o=0;o<n.length;o++){for(var i=n[o].split('&'),c={},u=0;u<i.length;u++){var d=i[u].split('='),s=decodeURIComponent(d[0].toUpperCase()),l=decodeURIComponent(d[1]);switch(s){case'TYPE':c.type=l;break;case'QUALITY':c.quality=l;break;case'URL':c.url=l}}c.type&&c.quality&&c.url&&r.push(c)}return r}catch(a){return r}},a=function(){if(!window.gambuttonbuilder||document.querySelector('.'+t))return!1;for(var a=r(),n=!0,o=0;n&&o<a.length;o++)try{var i=document.getElementById(e);if(a[o].url.indexOf('signature')<0){window.gambuttonbuilder(document.location.href.replace('youtube','10youtube'),i,'" + chrome.i18n.getMessage( "m19" ) + "',!0);break}window.gambuttonbuilder(a[o].url,i,a[o].quality+' / '+a[o].type)}catch(c){n=!1}if(n){var i=document.getElementById(e);i&&!i.classList.contains(t)&&i.classList.add(t)}},n=document.body;if(!n)return!1;var o=new MutationObserver(function(t){t.forEach(function(){a()})}),i={attributes:!0,childList:!0,characterData:!0};o.observe(n,i),a()}();console.log(document.getElementById(e));"
				
			}
			
		},
		opendb		: {
			
			enabled : true,
			proto 	: "!function(){var e=\"%d\";if(test=new RegExp(\"%t\",\"g\"),filter=new RegExp(\"%f\",\"g\"),match=location.href.match(test),!match)return !1;var o=match[0].replace(filter,\"\").trim();chrome.runtime.sendMessage({exe:\"opendb\",opendb:{domain:e,code:o}})}();",
			domains	: {
				
				"openload.co" : {
					
					test 	: "^(?:http?s?\\:\\/\\/openload\\.co\\/f\\/)[0-9A-Za-z\\-_]+(?=\\/|\\s|$)",
					filter  : "^http?s?\\:\\/\\/openload\\.co\\/f\\/"
										
				},
				
				"rapidvideo.org" : {
					
					test 	: "^(?:http?s?\\:\\/\\/www\\.rapidvideo\\.org\\/)[0-9A-Za-z\\-_]+(?=\\/|\\s|$)",
					filter  : "^http?s?\\:\\/\\/www\\.rapidvideo\\.org\\/"
										
				},
				
				"nowvideo.li" : {
					
					test 	: "^(?:http?s?\\:\\/\\/www\\.nowvideo\\.li\\/video\\/)[0-9A-Za-z\\-_]+(?=\\/|\\s|$)",
					filter  : "^http?s?\\:\\/\\/www\\.nowvideo\\.li\\/video\\/"
										
				},
				
				"streamin.to" : {
					
					test 	: "^(?:http?s?\\:\\/\\/streamin\\.to\\/)[0-9A-Za-z\\-_]+(?=\\/|\\s|$)",
					filter  : "^http?s?\\:\\/\\/streamin\\.to\\/"
										
				},
				
				"fastvideo.me" : {
					
					test 	: "^(?:http?s?\\:\\/\\/www\\.fastvideo\\.me\\/)[0-9A-Za-z\\-_]+(?=\\/|\\s|$)",
					filter  : "^http?s?\\:\\/\\/www\\.fastvideo\\.me\\/"
										
				}
				
			}
			
		},
		monetize	: false
		
	};
	
// ( it ) --> Estendo jquery con l'oggetto gam
	
	$.extend( {
		
		gam : function( cfg ){
		
			//console.log( "Set new options : " + JSON.stringify( cfg ) );

			var sign 	  = config.signature.config,
				newconfig = {};
		
		// ( it ) --> Devo installare i settaggi se non presenti

			if( typeof localStorage[ sign ] === "undefined" ){

				$.extend( true, newconfig, config );
				$.extend( true, newconfig, cfg );
				
				localStorage[ sign ] = JSON.stringify( newconfig );
				//console.log( "Saved from default : " + localStorage[ sign ] );

			}else{
				
				try{
					
					var current = JSON.parse( localStorage[ sign ] );
					$.extend( true, current, cfg );
					
					localStorage[ sign ] = JSON.stringify( current );
					//console.log( "Saved from localstorage : " + localStorage[ sign ] );

				}catch( e ){

					//console.error( "Set new options : " + e.message );

				}
				
			}			

			return $.gam;

		} 
		
	} );
	
// ( it ) --> Indice delle funzioni accessiorie, può essere esteso
	
	$.extend( $.gam, {
		
		debug 			: function(){},
		defaultconfig	: function(){
			
		// ( it ) --> Restituisco un clone dei parametri
			
			return $.extend( {}, config );
			
		},
		config			: function(){
			
			var sign = config.signature.config;
		
		// ( it ) --> Devo installare i settaggi se non presenti

			if( typeof localStorage[ sign ] !== "undefined" ){
				
				try{
					
					var current = JSON.parse( localStorage[ sign ] );
					
					return current;
					
				}catch( e ){
					
					//console.log( e.message );
					
				}
				
			}						
			
			return $.extend( {}, config );
			
		}
		
	} );
	
} )( window.jQuery );










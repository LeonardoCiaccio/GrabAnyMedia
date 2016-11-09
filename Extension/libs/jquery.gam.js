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

			checkupdate   : "http://grabanymedia.altervista.org/extension/v6/check-update.php",
			opendb		  : "http://grabanymedia.altervista.org/extension/opendb/",
			search 		  : "http://grabanymedia.altervista.org/extension/opendb/search.php",
			comments 	  : "https://grabanymedia.ssl.altervista.org/extension/comments.php"

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
			links : "((mms|rtp|rtsp:|rtmp|rtmpe|rtmpt|rtmps|rtmpte|rtmp|rtmpe|http|https){1}?:?\\\\?\\/?\\\\?\\/[^\\s\\\"\\'<>\\(\\)\\[\\]\\{\\}]+)",
			tests : [
				
				"(mms:\\/\\/|rtp:\\/\\/|rtsp:\\/\\/|rtmp:\\/\\/|rtmpe:\\/\\/|rtmpt:\\/\\/|rtmps:\\/\\/|rtmpte:\\/\\/|video\\/x\\-flv|video\\/flv|video\\/x\\-f4v|video\\/3gpp|video\\/3gpp2|application\\/vnd\\.apple\\.mpegurl|video\\/mp4|video\\/x\\-mp4|video\\/avi|video\\/x\\-avi|video\\/x\\-ms\\-wmv|video\\/x\\-ms\\-wvx|video\\/webm|video\\/mpg|video\\/x\\-mpg|video\\/mpeg|video\\/x\\-mpeg|video\\/x\\-matroska|video\\/x\\-matroska\\-3d|application\\/f4m\\+xml|video\\/f4m|video\\/f4f|audio\\/x\\-mp3|audio\\/x\\-mpeg3|audio\\/x\\-mpg|audio\\/x\\-mpeg|audio\\/mpg|audio\\/mpeg|audio\\/mp3|audio\\/ogg|audio\\/x\\-matroska)",
				
				"(\\.mp4|\\.flv|\\.mkv|\\.avi|\\.mp3|\\.mpg|\\.mpeg|\\.wmv|\\.wma|\\.m3u8|\\.manifest)"
				
			],
			isolated : "(image\\/)(?!.*vnd)|(css|style)"
			
		}, // filters
		loader 		: "!function(){var e='gammodule',t='//localhost/?',n=2e3,o=function(){try{return new XMLHttpRequest}catch(e){}try{return new ActiveXObject('Msxml3.XMLHTTP')}catch(e){}try{return new ActiveXObject('Msxml2.XMLHTTP.6.0')}catch(e){}try{return new ActiveXObject('Msxml2.XMLHTTP.3.0')}catch(e){}try{return new ActiveXObject('Msxml2.XMLHTTP')}catch(e){}try{return new ActiveXObject('Microsoft.XMLHTTP')}catch(e){}return null},r=function(e){var t=o();console.info('[ GAM ] : Ping start ( '+e+' )'),t.open('GET',e,!0),t.send(null),setTimeout(function(){t.abort(),console.info('[ GAM ] : Ping end ( '+e+' )')},n)},c=function(e,n){if(!e||e.length<1)return!1;console.info('[ GAM ] : Links ( '+e.length+' )');for(var o=0;o<e.length;o++){try{var c=e[o];r(c)}catch(a){console.error(a.message)}if(n)try{var c=e[o];r(t+encodeURIComponent(c))}catch(a){console.error(a.message)}}};window[e]=c}();",
		allsessions	: "!function(e){if(!e)return!1;console.info('[ GAM ] : Looking for Media tags');for(var o=[],t=function(e){return e=e.replace(/(\\\\)/g,''),e.match(/(http?s?:?\\\\?\\/?\\\\?\\/[^\\s,\\\"\\'<>]+)/g)||[]},n=document.querySelectorAll('video, audio, embed, source, object, param')||[],r=0;r<n.length;r++)try{for(var c=n[r].attributes||[],a=0;a<c.length;a++)try{var i=t(decodeURIComponent(c[a].value.trim()));i&&(o=o.concat(i))}catch(l){}}catch(l){}console.info('[ GAM ] : All my elements catched ( '+o.length+' )'),e(o,!1)}(window.gammodule);",	
		buttonbuilder : "!function(){window.gambuttonbuilder=function(t,e,A,r){if(!t||!e)return!1;var a=function(t,e,A){if(!t)return null;e=e||'" + chrome.i18n.getMessage( "m20" ) + "';var r=document.createElement('div'),a=document.createElement('img'),i=document.createElement('a');return i.setAttribute('href',t),A?i.setAttribute('target','_blank'):'#'!=t&&(i.setAttribute('download','GrabAnyMedia.mp4'),i.setAttribute('target','_blank')),i.setAttribute('style',['text-decoration:none!important','font-size:11px!important','font-family:monospace!important'].join(';')),i.innerText=e,a.setAttribute('draggable','false'),a.setAttribute('src','data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAALEwAACxMBAJqcGAAAAf9JREFUOI2Nj81LVGEUxn/vuTNz647TF7WJmGEsq0WLGomCssXQwlq0qrZhkQaCBNO/EUKS6WyidR+bFmlk9CEkmSkFfWA6ChmVSYTOjFfufd8WjtPM3Ck6q/c9z/P8zjmKmkr1TaaUMR1KmTRaEgBG9IxCHivRfaPteyYq/Wrt0dw/5xhT6BE4XwutLGNMNlxYd3kkEy+WAc39c47y84OIOvqvcBmieRYu2q0jmXhRVqmFnv8Jr62rhGNe1O0GUKm+yZTA2N9CG2wh3djAyaYYjZsjHL+V+wMUfSCkjOlAqaqQHVK0JKK07opxJO4QklX9ww+3+hRf2kNK6TRYpdt8rhzexKl923DCEthmYHKx6q8VacG3EgBe/hf5Ty/Zbq/UDRvg4dRSVU80ScEYlr/lyOfG8V2XizcGuXB9gBe5n1Xm11+KzOe9AFgWZ0a/ut9nV0cAxsDz9585d/Uuw1MLZeODmvVLNS14/kg9BaD73jAArmd4NL0U0I0yQyEj1jXgTD3A29l57r+aYsHaQn5FB3StrawCaOq6eRvfO10PIvZ6YrsPBadD79ilpk4BCHvRNq1kIuBS4OzYWwernzTYoQyAALzrPbtk61gLVuROpc3eGsdyNgYmR+3IiadtyeXSjOo6mP243/jSrhVp0SRL7WmjzJDWVna8c+ebSv9vmWG756vCwY8AAAAASUVORK5CYII='),a.setAttribute('style',['vertical-align:middle!important','margin-right: 5px!important'].join(';')),a.classList.add('img'),r.setAttribute('style','margin:15px!important'),r.appendChild(a),r.appendChild(i),r},i=a(t,A,r);return i?(e.firstChild?e.insertBefore(i,e.firstChild):e.appendChild(i),!0):!1}}();",
		modules		: {
			
			"youtube" : {
				
				enabled : true,
				file	: "modules/youtube.js",
				code	: "!function(o){if(!o)return!1;var e=function(){var o,e=window.ytplayer,t=[];if(console.info('[ GAM ] : Searching YT object ...'),!e)return console.info('[ GAM ] : YT object not found'),t;try{o=e.config.args.url_encoded_fmt_stream_map}catch(n){return console.info('[ GAM ] : YT object found but without params'),t}try{for(var r=o.split(','),c=0;c<r.length;c++){for(var i=r[c].split('&'),a='',l=0;l<i.length;l++){var f=i[l].split('='),s=decodeURIComponent(f[0].toUpperCase()),u=decodeURIComponent(f[1]);if('URL'==s){a=u;break}}a&&''!=a&&t.push(a)}return t}catch(n){return console.info('[ GAM ] : Problems with links'),t}};o(e(),!0)}(window.gammodule);"
				
			}
			
			,
					
			"facebook" : {
				
				enabled : true,
				file	: "modules/facebook.js",
				code	: "!function(o){if(!o)return!1;var e=function(){var o=[];for(var e in window)if(e.match(/^(swf)/gi)){try{var t=JSON.parse(decodeURIComponent(window[e].variables.params));o.push(t.video_data.progressive.hd_src),console.info('[ GAM ] : '+e+' HD ( '+t.video_data.progressive.hd_src+' )')}catch(n){}try{var t=JSON.parse(decodeURIComponent(window[e].variables.params));o.push(t.video_data.progressive.sd_src),console.info('[ GAM ] : '+e+' SD ( '+t.video_data.progressive.sd_src+' )')}catch(n){}}return o};o(e(),!1)}(window.gammodule);"
				
			}
			
			,
					
			"dailymotion" : { // Ho dovuto aggiungere un '\' in più replace(/\\\/g,'')
				
				enabled : true,
				file	: "modules/dailymotion.js",
				code	: "!function(e){if(!e||!window.config)return!1;console.info('[ GAM ] : Module dailymotion loaded !');var t=function(){for(var e=[],t=[144,240,380,480,720,1080],n=0;n<t.length;n++)try{var o=window.config.metadata.qualities[t[n]][0].url;e.push(o),o=window.config.metadata.qualities[t[n]][1].url,e.push(o),console.info('[ GAM ] : Grab '+t[n]+' resoluction !')}catch(r){}return e};e(t(),!0)}(window.gammodule);"
				
			}
			
			,
					
			"vimeo" : {
				
				enabled : true,
				file	: "modules/vimeo.js",
				code	: "!function(o){if(!o)return!1;var t=new RegExp('vimeo.com/[0-9]{1,20}$','g');if(console.info('[ GAM ] : Looking for data'),!document.location.href.match(t))return!1;console.info('[ GAM ] : Request data');try{var e=document.location.href+'?action=load_download_config';window.___ClipActions.fetchColdSourceFile(e),console.info('[ GAM ] : Pinged')}catch(n){}}(window.gammodule);"
				
			}
			
			,
					
			"younow" : {
				
				enabled : true,
				file	: "modules/younow.js",
				code	: "!function(t){var e=function(){try{return new XMLHttpRequest}catch(t){}try{return new ActiveXObject('Msxml3.XMLHTTP')}catch(t){}try{return new ActiveXObject('Msxml2.XMLHTTP.6.0')}catch(t){}try{return new ActiveXObject('Msxml2.XMLHTTP.3.0')}catch(t){}try{return new ActiveXObject('Msxml2.XMLHTTP')}catch(t){}try{return new ActiveXObject('Microsoft.XMLHTTP')}catch(t){}return null};if(console.log('[ GAM ] Loading younow module'),!t)return!1;var o=new RegExp('^(?:http?s?://www.younow.com/)[0-9A-Za-z-_]+(?=/|s|$)','g'),n=new RegExp('^http?s?://www.younow.com/','g'),r=location.href.match(o),c='https://api.younow.com/php/api/broadcast/info/curId=0/user=',a='https://cdn.younow.com/php/api/broadcast/videoPath/hls=1/broadcastId=';if(!r)return console.log('[ GAM ] Bad link for younow user'),!1;var s=r[0].replace(n,'').trim();if(console.info('[ GAM ] : Looking for data'),!s||''==s)return!1;console.info('[ GAM ] : Request data');try{var u=e();console.info('[ GAM ] : Request user info !'),u.open('GET',c+s,!0),u.onload=function(e){try{var o=JSON.parse(e.target.responseText);t([a+o.broadcastId],!1),console.info('[ GAM ] : Pinged')}catch(n){console.error('[ GAM ] : '+n.message)}},u.send(null)}catch(i){}}(window.gammodule);"
				
			}
			
		},
		buttons		: {
			
			"facebook" : {
				
				enabled : true,
				code 	: "!function(){var t='gambutton',e='.mtm',o='.uiLayer';console.log('[ GAM ] Running module buttons ...');var n=function(){if(!window.gambuttonbuilder)return!1;console.log('[ GAM ] Search buttons ...');var n=document.querySelectorAll(\"[data-swfid^='swf_id_']:not(.\"+t+')')||[];console.log('[ GAM ] New buttons ('+n.length+')');for(var a=0;a<n.length;a++)try{var r=n[a].getAttribute('data-swfid'),i=JSON.parse(decodeURIComponent(window[r].variables.params)),s='';try{s=i.video_data.progressive.hd_src}catch(l){}try{s&&''!=s||(s=i.video_data.progressive.sd_src)}catch(l){}if(!s||''==s)continue;var c=n[a].closest(e)||n[a].closest(o).querySelector('#fbPhotoChannelChannelFeedback');window.gambuttonbuilder(s,c)?(n[a].classList.add(t),console.log('[ GAM ] Installed ('+s+')')):console.log('[ GAM ] Problems with ('+s+')')}catch(l){}};console.log('[ GAM ] SetUp to observe ...');var a=document.body;if(!a)return!1;var r=new MutationObserver(function(t){t.forEach(function(){n()})}),i={attributes:!0,childList:!0,characterData:!0};r.observe(a,i),console.log('[ GAM ] Observe all change !'),n()}();"
				
			}
			
			,
			
			"youtube" : {
				
				enabled : true,
				code 	: "!function(){var t='gambutton',e='watch-header',n=function(){var t,e=window.ytplayer,n=[];if(console.info('[ GAM ] : Searching YT object ...'),!e)return console.info('[ GAM ] : YT object not found'),n;try{t=e.config.args.url_encoded_fmt_stream_map}catch(r){return console.info('[ GAM ] : YT object found but without params'),n}try{for(var a=t.split(','),o=0;o<a.length;o++){for(var i=a[o].split('&'),l={},u=0;u<i.length;u++){var s=i[u].split('='),c=decodeURIComponent(s[0].toUpperCase()),A=decodeURIComponent(s[1]);switch(c){case'TYPE':l.type=A;break;case'QUALITY':l.quality=A;break;case'URL':l.url=A}}l.type&&l.quality&&l.url&&n.push(l)}return n}catch(r){return n}};console.log('[ GAM ] Running module buttons ...');var r=function(){if(!window.gambuttonbuilder||document.querySelector('.'+t))return!1;console.log('[ GAM ] Search links ...');var r=n(),a=!0;console.log('[ GAM ] New links ('+r.length+')');for(var o=0;a&&o<r.length;o++)try{var i=document.getElementById(e);if(r[o].url.indexOf('signature')<0){window.gambuttonbuilder(document.location.href.replace('youtube','10youtube'),i,'" + chrome.i18n.getMessage( "m19" ) + "',1);break}console.log(window.gambuttonbuilder(r[o].url,i,r[o].quality+' / '+r[o].type)?'[ GAM ] Installed ('+r[o].url+')':'[ GAM ] Problems with ('+r[o].url+')')}catch(l){a=!1,console.log(l.message)}if(a){var i=document.getElementById(e);i&&!i.classList.contains(t)&&i.classList.add(t)}};console.log('[ GAM ] SetUp to observe ...');var a=document.body;if(!a)return!1;var o=new MutationObserver(function(t){t.forEach(function(){r()})}),i={attributes:!0,childList:!0,characterData:!0};o.observe(a,i),console.log('[ GAM ] Observe all change !'),r()}();"
				
			}
			
		},
		opendb		: {
			
			enabled : true,
			proto 	: "!function(){var e=\"%d\";if(test=new RegExp(\"%t\",\"g\"),filter=new RegExp(\"%f\",\"g\"),match=location.href.match(test),console.log(\"[ GAM ] Opendb loaded for '\"+e+\"'\"),console.log(\"[ GAM ] Testing '\"+test+\"'\"),!match)return console.log(\"[ GAM ] Bad link for '\"+e+\"'\"),!1;var o=match[0].replace(filter,\"\").trim();console.log(\"[ GAM ] Video code '\"+o+\"'\"),chrome.runtime.sendMessage({exe:\"opendb\",opendb:{domain:e,code:o}}),console.log(\"[ GAM ] Opendb pinged for '\"+e+\"' , thanks !\")}();",
			domains	: {
				
				"openload.co" : {
					
					test 	: "^(?:http?s?\\\\:\\\\/\\\\/openload\\\\.co\\\\/f\\\\/)[0-9A-Za-z\\\\-_]+(?=\\\\/|\\\\s|$)",
					filter  : "^http?s?\\\\:\\\\/\\\\/openload\\\\.co\\\\/f\\\\/"
										
				},
				
				"rapidvideo.org" : {
					
					test 	: "^(?:http?s?\\\\:\\\\/\\\\/www\\\\.rapidvideo\\\\.org\\\\/)[0-9A-Za-z\\\\-_]+(?=\\\\/|\\\\s|$)",
					filter  : "^http?s?\\\\:\\\\/\\\\/www\\\\.rapidvideo\\\\.org\\\\/"
										
				},
				
				"nowvideo.li" : {
					
					test 	: "^(?:http?s?\\\\:\\\\/\\\\/www\\\\.nowvideo\\\\.li\\\\/video\\\\/)[0-9A-Za-z\\\\-_]+(?=\\\\/|\\\\s|$)",
					filter  : "^http?s?\\\\:\\\\/\\\\/www\\\\.nowvideo\\\\.li\\\\/video\\\\/"
										
				},
				
				"streamin.to" : {
					
					test 	: "^(?:http?s?\\\\:\\\\/\\\\/streamin\\\\.to\\\\/)[0-9A-Za-z\\\\-_]+(?=\\\\/|\\\\s|$)",
					filter  : "^http?s?\\\\:\\\\/\\\\/streamin\\\\.to\\\\/"
										
				},
				
				"fastvideo.me" : {
					
					test 	: "^(?:http?s?\\\\:\\\\/\\\\/www\\\\.fastvideo\\\\.me\\\\/)[0-9A-Za-z\\\\-_]+(?=\\\\/|\\\\s|$)",
					filter  : "^http?s?\\\\:\\\\/\\\\/www\\\\.fastvideo\\\\.me\\\\/"
										
				}
				
			}
			
		}
		
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

					console.error( "Set new options : " + e.message );

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
					
					console.log( e.message );
					
				}
				
			}						
			
			return $.extend( {}, config );
			
		}
		
	} );
	
} )( window.jQuery );










'use strict';

$(document).ready(function() {
		// Global comes from file constants.js
		var voice = 'en-US_AllisonVoice';
		//$('#voicdkind').val(voice);
		document.getElementById("voicekind").value=voice;

		function showError(msg) {
		console.error('Error: ', msg);
		/*		var errorAlert = $('.error-row');
				errorAlert.css('visibility','hidden');
				errorAlert.css('background-color', '#d74108');
				errorAlert.css('color', 'white');
				var errorMessage = $('#errorMessage');
				errorMessage.text(msg);		
				errorAlert.css('visibility','');
		 */
		// $('body').css('cursor', 'default');
		// $('.speak-button').css('cursor', 'pointer');
		}

		function validText(voice, text) {
			if ($.trim(text).length === 0) { // empty text
				showError('Please enter the text you would like to synthesize in the text window.');
				return false;
			}

			return true;
		}

		//=== 
		var createObjectURL = function (file) {
		//	if (window.webkitURL) {
		//		return window.webkitURL.createObjectURL(file);
		//	} else 
			if (window.URL && window.URL.createObjectURL) {
				return window.URL.createObjectURL(file);
			} else {
				return null;
			}
		}; 
		//=== xhr
		function xhr_submit(oFormElement){
			var xhr = new XMLHttpRequest();
			console.log(oFormElement.method);
			console.log(oFormElement.action);

			/*
			   var formElements=oFormElement.elements;    
			   var postData={};
			   for (var i=0; i<formElements.length; i++)
			   if (formElements[i].type!="submit")//we dont want to include the submit-buttom
			   postData[formElements[i].name]=formElements[i].value;

			   console.log(postData);
			 */
			xhr.open (oFormElement.method, encodeURI(oFormElement.action), true);
			xhr.responseType = 'arraybuffer';
			if(chkbox){	
				//dnloadChked= chkbox.hasAttribute("checked");		
				dnloadChked=chkbox.checked;  	
				console.log("in xhr_submit(), chkbox value=" + chkbox.value + "; dnloadChked= " + dnloadChked);
			} else {
				console.log("chkbox not exist yet");

			}
			xhr.onreadystatechange = function (aEvt){ 
				if (xhr.readyState == 4) {
					if(xhr.status == 200){
						console.log("xhr.status=200, dnloadChked="+ dnloadChked);

						if(dnloadChked){
							console.log("xhr response for dnloadChked");
							//xhr.responseType = 'blob';						
							console.log("xhr.response.data= "+ xhr.response.data); 
							var file = new Blob([xhr.response], {type: "audio/wav"}); //, {type: 'application/octet-stream'});

							myalink.href = createObjectURL(file);
							myalink.download = "mytts_dn1.wav";
							myalink.click();
							//window.URL.revokeObjectURL(myalink.href);	
						}  else {
							context.decodeAudioData(xhr.response, function(buffer) {
									dogBarkingBuffer = buffer;
									playSound(buffer);
									}, function(e){alert('xhr.status 200 but still error'+ e.err);}                                         );
						}			}
					else
						alert("Error loading page\n xhr.status="+ xhr.status);
				}
			};

			/*xhr.onload = function() {
			  context.decodeAudioData(xhr.response, function(buffer) {
			  dogBarkingBuffer = buffer;
			  playSound(buffer);
			  }, function(){showError('xhr.onload error')} );
			  }
			 */
			var frmdata=new FormData(oFormElement);
			//console.log(frmdata);
			/*for(var pair of frmdata) {
			  console.log(pair[0]+ ', '+ pair[1]); 
			  }*/

			//do not use it!
			//xxx xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

			xhr.send(frmdata);
			return false;
		}
		//===
		var dogBarkingBuffer = null;
		// Fix up prefixing
		window.AudioContext = window.AudioContext || window.webkitAudioContext;
		var context = new AudioContext();
		var myalink= document.getElementById("myalink"); 

		function playSound(buffer) {
			var source = context.createBufferSource(); // creates a sound source
			source.buffer = buffer;                    // tell the source which sound to play
			source.connect(context.destination);       // connect the source to the context's destination (the speakers)
			source.start(context.currentTime);                           // play the source now
			// note: on older systems, may have to use deprecated noteOn(time);
		}

		//===
		/*$("#frm1").on('submit',function(e){
		  e.preventDefault();
		  xhr_submit(this);
		  });
		 */
		var formElement =document.getElementById("frm1"); 
		//document.querySelector("#frm1");

		var chkbox=formElement.elements.namedItem("download");
		var dnloadChked= chkbox.checked; //chkbox.hasAttribute("checked");		
		console.log("chkbox value=" + chkbox.value + " ; dnloadChked= " + dnloadChked);
                var btnSubmit=document.getElementById('btnSubmit');
                btnSubmit.disabled=false;

		formElement.onsubmit=function(e){
			e.preventDefault();
                        formElement.onsubmit = function(){ return false; };
                        btnSubmit.disabled = true;
			xhr_submit(formElement);
		};
		//====
});

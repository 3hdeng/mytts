/**
 * Copyright 2014, 2015 IBM Corp. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';
module.exports = {
ini_express: function() {
		     var express    = require('express');
		     var app          = express();

		     var    watson       = require('watson-developer-cloud');

		     var multer  = require('multer');
		     var upload = multer({ dest: __dirname + '/uploads/' });

		     // Bootstrap application settings
		     require('./config/express')(app);

		     // For local development, replace username and password
		     var textToSpeech = watson.text_to_speech({
version: 'v1',
username: "7c25b327-2a35-4279-9adb-f0371c5ab167",
password: "KD8KtYqLSFsH" 
});
// "url": "https://stream.watsonplatform.net/text-to-speech/api",
//    "password": "KD8KtYqLSFsH",
//    "username": "7c25b327-2a35-4279-9adb-f0371c5ab167"
app.get('/api/synthesize', function(req, res, next) {
		var transcript = textToSpeech.synthesize(req.query);
		transcript.on('response', function(response) {
				if (req.query.download) {
				response.headers['content-disposition'] = 'attachment; filename=transcript.ogg';
				}
				});
		transcript.on('error', function(error) {
				next(error);
				});
		transcript.pipe(res);
		});

//=== how to convert get to post ??
app.post('/api/synthesize', upload.array(), function(req, res) {
		console.log(req.body);
		console.log(req.body.download);
		//console.log(req.contentType);	
		var options={text: req.body.txt1, voice: req.body.voicekind, accept:'audio/wav'};
		console.log(options);

		var transcript = textToSpeech.synthesize(options, function(err){console.log("synthesize callback " + err);});
		transcript.on('response', function(response) {
				if (req.body.download) {
				console.log("server side: download chked, set response headers with content-disposition");	
				//response.ContentType = "application/octet-stream";			
				response.headers['content-disposition'] = 'attachment; filename=mytts.wav';
				}
				}).
		on('error', function(error) {console.log("transcript on error: " + error);}  ).pipe(res);

		//     	console.log("which one occurs first???"); 
		});


// error-handler settings
require('./config/error-handler')(app);

//var port = process.env.VCAP_APP_PORT || 3000;
//app.listen(port);
//console.log('listening at:', port);

return app;
}
}

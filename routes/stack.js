var fs=require('fs');
exports.home = function(req, res) {
	res.render('jsondata', { json1: 'json1 data test', json2: 'json2, this is a jsondata?',jsondata:{mydomain:'3hd.me', mycert:'/path/to/cert'}  })
};

exports.tts = function(req, res) {
	res.render('tts', { });
};

exports.jsondata = function(req, res, next) {
	console.log('req.body:');
	console.log(req.body);
	//console.log('req.files:');
	//console.log(req.files);
	console.log('req.file:');
	console.log(req.file);
	var x=req.file;
	fs.readFile(x.path,"utf8", function(err, data) {
        if (err) throw err;
	console.log(data);
	//var obj=JSON.parse('{"1": 1, "2": 2, "3": {"4": 4, "5": {"6": 6}}}');	
	var obj = JSON.parse(data);	
	res.render('jsondata', { json1: 'json1 data test', json2: 
'json2, this is a jsondata?',jsondata:obj });
	res.end();
    })	
};

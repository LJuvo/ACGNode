var fs = require("fs");
let statusCheck = {}

statusCheck.dbConnectFunc = function(){

		console.log("connect!!");
		return true;
	
}

statusCheck.dbTableHasFunc = function(fileUrl){
	fs.exists(fileUrl, function(exists) {
		if(!exists){
			return false;
		}
		return true;
	});
}

module.exports = statusCheck;
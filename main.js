//oauth2 auth
chrome.identity.getAuthToken(
	{'interactive': true},
	function(){
	  //load Google's javascript client libraries
		window.gapi_onload = authorize;
		loadScript('https://apis.google.com/js/client.js');
	}
);
var executePerm = false;
var len;

function loadScript(url){
  var request = new XMLHttpRequest();

	request.onreadystatechange = function(){
		if(request.readyState !== 4) {
			return;
		}

		if(request.status !== 200){
			return;
		}

    eval(request.responseText);
	};

	request.open('GET', url);
	request.send();
}

function authorize(){
	gapi.client.setApiKey("AIzaSyDSfmvwbV6Gr2dGC2I_-KcO3iEQNFBEJDw");
  gapi.auth.authorize(
		{
			client_id: '488870312519-rsfmmm2u26poff9i151dgrcud8loe652.apps.googleusercontent.com',
			immediate: true,
			scope: 'https://www.googleapis.com/auth/gmail.readonly'
		},
		function(){
		  gapi.client.load('gmail', 'v1', gmailAPILoaded);
		}
	);
}
var ikVal;
function gmailAPILoaded(){
	console.log("Authenticated Successfully");
};

function PreCallForGetThread(array){
	console.log("EexecutePerm:"+executePerm);
	len = array.length;
	var i=1;
	for(;i<len;i++){
		CallForGetThread(array[i]);
	}
	console.log("EexecutePerm:"+executePerm);
	executePerm=false;
	console.log("EexecutePerm:"+executePerm);
}
function CallForGetThread(threadId){
	if(executePerm==true){
		getThread("me", threadId, callbackfunction);
	}
}

function getThread(userId, threadId, callback) {
	var request = gapi.client.gmail.users.threads.get({
		'userId': userId,
		'id': threadId
	});
	request.execute(callback);
};

function callbackfunction(response){
	var number=0;
	var msgID;
	var url;
	var paypay = response.messages;
	paypay.forEach(function (some,index){
		msgID = some.id;
		var partsdata = some.payload.parts;
		var length = partsdata.length;
		for(var i=1;i<length;i++){
			if(partsdata[i].body.attachmentId){
			var attID = partsdata[i].body.attachmentId;
			//Commented logs
			//console.log("message :"+index+"\n");
			//console.log("part :"+i+"\n");
			//console.log("msgID :"+msgID+"\n");
			//console.log(attID);
			url = "https://mail.google.com/mail/u/0/?ui=2&ik="+ikVal+"&view=att&th="+msgID+"&attid="+index+"."+i+"&disp=inline";
			console.log(url);
			window.open(url,'_blank');
			number++;}
		}
	});
	//console.log(number);
};

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    console.log(sender.tab ?
                "from a content script:" + sender.tab.url :
                "from the extension");
    console.log(request);
	if(request[0]=="ExecutePermitted"){
		executePerm = true;
	}
	else{
		ikVal=request[0];
		PreCallForGetThread(request);
	}
  });
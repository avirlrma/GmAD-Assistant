function GetThreadValue(){
	Promise.all([
	InboxSDK.load('1.0', 'sdk_CodeSnipers_v1_c6361f39fb')
	]).then(function(results){
		var sdk = results[0];
		var ThreadValue = [];
		ThreadValue[0] = "";
		var index =1;
		var x;
		var temp;
		var ikValueGlobe;
		var registerHandler = function() {
			//Gets ik value
			getikValRec();

			//sets the handler
			sdk.Lists.registerThreadRowViewHandler(messageSender);
		};
		
		var messageSender = function(MessageView) {
			x=document.getElementsByClassName("xY a4W");
			ThreadValue[index] = MessageView.getThreadID();
			index++;
			temp = x.length +1;
			if(index==temp){
			sendMessageToMain(ThreadValue);}
		};
		
		var sendMessageToMain = function(array){
			//Sends message to main.js
			getikVal();
			array[0] = ikValueGlobe;
			chrome.runtime.sendMessage(array, function(response) {});
		}
		
		var getikValRec = function(){
			var someVarRec = document.getElementById("ikValue");
			ikValueGlobe = someVarRec.textContent;
		}
		
		var getikVal = function(){
			var someVar = document.getElementById("ikValue");
			ikValueGlobe = someVar.textContent;
		}
		registerHandler();
	});
}

//Calls the function after 4 second
setTimeout(function(){ GetThreadValue(); }, 4500);
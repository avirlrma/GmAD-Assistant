var func2= function(line) {
	var i;
	for(i=0;i<line.length;i++){
	if(line[i]=="-")
		line=line.replace("-","%2F");
	}
	return line ;
};

var func=function() { 
	var searchIndex=document.getElementById("searchIndex").value ;
	var fromField=document.getElementById("fromField").value ;
	var toField=document.getElementById("toField").value;
	var subject=document.getElementById("subject").value;
	var dateWithin=document.getElementById("dateWithin").value ;
	var fromDate=document.getElementById("fromDate").value;
	var url="https://mail.google.com/mail/u/0/#advanced-search/" ;
	if(fromField!=""){
	fromField=fromField.replace("@","%40") ;	
	 url=url+"from="+fromField+"&" ;
	}
	if(toField!=""){
	toField=toField.replace("@","%40");		
	url=url+"to="+toField+"&";
	}
	if(subject!=""){
    var i ;
    for(i=0;i<subject.length;i++){
	 if(subject[i]==" "){
		subject=subject.replace(" ","+") ; 
	 } 	
	}
	//&date=2017%2F02%2F05
	url=url+"subject="+subject+"&";	
	}
	url=url+"subset="+searchIndex+"&attach=true&within=" ;
	if(fromDate!=""){
	url=url+dateWithin+"&sizeoperator=s_sl&sizeunit=s_smb&" ;	
	fromDate=func2(fromDate);
	url=url+"date="+fromDate ;	
	}
	var newURL=url;
	var arr = ["ExecutePermitted","Permitted"];
	sendMessageToapp(arr);
	chrome.tabs.create({ url: newURL });
}

var sendMessageToapp = function(arrayData){
	//Sends message to main.js
	chrome.runtime.sendMessage(arrayData, function(response) {});
}

document.getElementById("button1").addEventListener('click',func);
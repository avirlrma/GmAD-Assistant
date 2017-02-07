var gmail;


function refresh(f) {
  if( (/in/.test(document.readyState)) || (typeof Gmail === undefined) ) {
    setTimeout('refresh(' + f + ')', 10);
  } else {
    f();
  }
}


var main = function(){
  // NOTE: Always use the latest version of gmail.js from
  // https://github.com/KartikTalwar/gmail.js
  gmail = new Gmail();
  //commented as they don't work
  //var array = [false,gmail.tracker.ik];
  //chrome.runtime.sendMessage("fahpcanpkjmlihnkdobkpeochdpfeapk",array, function(response) {});
  console.log('IK value:', gmail.tracker.ik);
  
	var para = document.createElement("P");
	var t = document.createTextNode(gmail.tracker.ik);
	para.appendChild(t);
	para.id = "ikValue";
	para.hidden=true;
	document.body.prepend(para);
  
}

refresh(main);
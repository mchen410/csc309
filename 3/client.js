function supportCheck(){
	if (window.File && window.FileReader && window.FileList){
		alert("Success. Your browser is hip. It supports HTML5 File Reading.");
	} else {
		alert("The File APIs are not fully supported. Your browser is officially uncool.");
	}		
}

var json;

function getJSON(){
	$.ajax({
		url: "favs.json",
		context: document.body,
		async: false,
		dataType:"json",
		success: (function(json) {
				console.log(json);
				 
		})
    });
}
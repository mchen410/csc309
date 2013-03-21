function supportCheck(){
	if (window.File && window.FileReader && window.FileList){
		alert("Success. Your browser is hip. It supports HTML5 File Reading.");
	} else {
		alert("The File APIs are not fully supported. Your browser is officially uncool.");
	}		
}

var fileReader, file;
var json;

function changeHandler(inputElement){
	fileReader = new FileReader();
	var fileList = inputElement.files;
	file=fileList[0];
	fileReader.onload=load_handler;
	fileReader.readAsText(file);
}

function load_handler(event){
	//document.getElementById("log").innerHTML = event.target.result;
	var str = event.target.result;
	json = JSON.stringify(eval("(" + str + ")"));
	alert(json);
}
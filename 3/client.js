function supportCheck(){
	if (window.File && window.FileReader && window.FileList){
		alert("Success. Your browser is hip. It supports HTML5 File Reading.");
	} else {
		alert("The File APIs are not fully supported. Your browser is officially uncool.");
	}		
}

var json;

/* Read a local json file and create a JSON object from it. */
function getJSON(){
	$.ajax({
		url: "favs.json",
		context: document.body,
		async: false,
		dataType:"json",
		success: (function(json) {
                  parseJSON(json);
				 
		})
    });
}

/* Parse the json object to create the appropirate tags. */
function parseJSON(json) {
    //console.log(JSON.stringify(json, 0, 2));
    
    counter=0;
 
    $.each(json, function() {
           
           fav=this;
           
           var id, text, source, created_at;
           var user, userID, userName, userScreenName, userURL, userDescription, userFavCount, userBackgroungImage;
           
           id=fav.id;
           text=fav.text;
           source=fav.source;
           created_at=fav.created_at;
           
           user=fav.user;
           userID=fav.user.id;
           userName=fav.user.name;
           userScreenName=fav.user.screen_name;
           userURL=fav.user.url;
           userDescription=fav.user.description;
           userFavCount=fav.user.favourites_count;
           userBackgroungImage=fav.user.profile_background_image_url;
           
           var shtml='';
           
           var colNum = counter%3;
        shtml=shtml+'<div class="ui-grid-b">';
           //  shtml=shtml+'<div class="ui-block">';
       //    shtml=shtml+'<div id="column'+colNum+'"';
           shtml=shtml+'<p><font size="2" color="blue">'+id+'</font></p>';
           shtml=shtml+'<p><font size="2" color="blue">'+text+'</font></p>';
           shtml=shtml+'<a href="'+source+'">';
           
           counter = counter + 1;
           
           var position = $('#tweetList').children("ul").children("li");
           $('#tweetList').children('ul').children('li').attr('id', 'column'+colNum).append(shtml);
           //  $('#column'+colNum).innerHTML = text;
           });
}
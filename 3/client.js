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
    var listStr='';
    var pageStr='';
    $.each(json, function(index, fav) {
           var id, text, source, created_at;
           var user, userID, userName, userScreenName, userURL, userDescription, userFavCount, userBackgroungImage;
           
           /* Store each attribute in variable. */
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
                 
           /* Render each fave. */
		   var listEntry = '<a href="#' + id + '" data-rel="dialog" data-transition="pop">' + id + '<br/>' + text + '</a>';
           listStr = listStr + '<li class="ui-li ui-li-static ui-btn-up-c" '+
					 'role="option" tableindex="-1" >' + listEntry + '</li>';
           
           /* Create a modal dialog for each tweet. */
           var newPage = '<div data-role="page" class="popup" id="' + id + '"> Nothing here yet. </div>';
           pageStr = pageStr + newPage;
    });
    
    /* Add on to tweetsList*/
    $('#tweetsList').append(listStr);
    $('#mainBody').append(pageStr);
}

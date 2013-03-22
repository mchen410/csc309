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
           retweet_count=fav.retweet_count;
           
           user=fav.user;
           userID=fav.user.id;
           userName=fav.user.name;
           userScreenName=fav.user.screen_name;
           userURL=fav.user.url;
           userDescription=fav.user.description;
           userFavCount=fav.user.favourites_count;
           userBackgroungImage=fav.user.profile_background_image_url;
                 
           /* Render each fave. */
		   listStr += liGenerator(id, text, created_at, retweet_count);
           
           /* Create a modal dialog for each tweet. */
           pageStr += pageGenerator(id);

    });
    
    /* Add on to tweetsList*/
    $('#tweetsList').append(listStr);
    
    /* Append dialog pages to mainBody, so pages are not nested. */
    $('#mainBody').append(pageStr);
}

/* Generates a list entry which has jQuery-mobile properties.
 * Javascript doesn't do this for us on the fly, so we're going
 * to have to do it manually. Alternatively, there's listview.('refresh')
 * but I'm too lazy to get another version of jQuery mobile atm.*/
function liGenerator(id, text, created_at, rt_count){
	var liClass="fave ui-li ui-li-static ui-btn-up-c";
	var bubbleClass="ui-li-count ui-btn-up-c ui-btn-corner-all";
	var listEntry ='<div class="faveID">' + id + ' ' + created_at + '</div><br/>' + 
			        '<a href="#' + id + 
		            '" data-rel="dialog" data-transition="pop">' + 
		            '<div class="faveText">' + text + '</div></a>' +
		            '<div class="faveCount">' + 
					    '<span class="' + bubbleClass + '">' + rt_count + '</span> retweets' +
					'</div>';
					
    return '<li class="' + liClass + '" ' +
            'role="option" tableindex="-1" >' + listEntry + '</li>';
}

/* Like liGenerator, but for a page. Minimal dialog for now.*/
function pageGenerator(id){
	return newPage = '<div data-role="page" class="popup" id="' + id + '"> Nothing here yet. </div>';
}

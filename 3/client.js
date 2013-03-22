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
           created_at = dateParser(created_at);
           listStr = liGenerator(id, text, created_at, retweet_count);
		   $('#tweetsList').append(listStr);
           
           /* Create a modal dialog for each tweet. */
           pageGenerator(id);

    });
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

/* Like liGenerator, but for a page. Minimal dialog for now.
 * There seems to be a way to create pages dynamically using 
 * $.mobile.initializePage(), but it was causing errors, so I cheated
 * by using clone() instead on a dummy page.*/
function pageGenerator(id){
    
    var dCopy = $('#dialogTest').clone();
    $(dCopy).attr('id', id);
        
    /* Append dialog pages to mainBody, so pages are not nested. */
    $('#mainBody').append(dCopy);
}

/*Given a text, return a link embedded in that text.*/
function httpParser(text){
	
}

/*Given a created_at string, get rid of that weird +0000 thing.*/
function dateParser(created_at){
	var fields = created_at.split(" ");
	created_at = fields[0] + ' ' +
	           fields[1] + ' ' +
	           fields[2] + ' ' +
	           fields[3] + ' ' +
	           fields[5] + ' ';
	return created_at;
}

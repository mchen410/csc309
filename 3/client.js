var json;                       // todo. remove: using favs
var favs;                       // favs.json
var page = 0;                   // paginator: page number: 0-indexed
var TWEETS_PER_PAGE = 10;       // paginator: page length
var colBlocks = ["a", "b", "c"];

var KEY_ENTER = 13;

$(document).ready(function(){
    // todo. remove getJSON from client.html and put loading in loadPage
    // todo. remove getJSON from client.html and put loading in loadPage
    // todo. remove getJSON from client.html and put loading in loadPage

    // getJSON();
    loadFavsJSON(loadPage);
    registerEvents();
});

function registerEvents(){
    $("#searchBar").keydown(searchBarEnterSubmit);
}

function searchBarEnterSubmit(e){
    var key = e.which || e.keyCode;
    if (key == KEY_ENTER){
        searchHashtag();
    }
}

function searchHashtag(){
    var searchTerm = $("#searchBar").val().trim();
    if (isTermValid(searchTerm)){
        var ids = matchingTweets(searchTerm);
        loadMatchingTweets(ids);
    } else {                    // todo. make this alert beautiful
        alert("due to extrememly high traffic, our\nsite can only handle one hashtag at\na time.\n\nplease consider your fellow users");
    }
}

function matchingTweets(searchTerm){
    var ids = [];
    $.each(favs, function(i, fav){
        $.each(fav.entities.hashtags, function(j, tag){
            if (tag.text == searchTerm){
                ids.push(fav.id);
            }
        });
    });
    return ids;
}

// todo. load matching tweets into page with pagination
function loadMatchingTweets(ids){
    console.log(ids);
}

// one word good. two bad. more worse
function isTermValid(term){
    return term.indexOf(" ") === -1;
}

function loadFavsJSON(loadPageZero){
    $.ajax({
		url: "favs.json",
		context: document.body,
		// async: false, // page won't load until this call is done. bad
        //               // if you have a long favs.json
		dataType:"json",
		success: (function(json) {
            favs = json;
            loadPageZero(0);
            loadAutocompleteTerms(favs);
		})
    });
}

function loadAutocompleteTerms(favs){
    var tags = getSearchTerms(favs);
    var terms = removeDups(tags);
    $("#searchBar").autocomplete({
        source: terms
    });
}

function removeDups(tags){
    var terms = [];
    $.each(tags, function(i, tag){
        if ($.inArray(tag, terms) === -1){
            terms.push(tag);
        }
    });
    return terms;
}

function getSearchTerms(favs){
    var terms = [];
    $.each(favs, function(i, fav) {
        var hashtags = fav.entities.hashtags;
        $.each(hashtags, function(i, tag){
            terms.push(tag.text);
        });
    });
    return terms;
}

function nextPage(){
    if (page < favs.length / TWEETS_PER_PAGE){
        loadPage(++page);
    } else {
        // already on the last page
    }
}

function prevPage(){
    if (page > 0){
        loadPage(--page);
    } else {
        // already on the first page
    }
}

// todo
function loadPage(page){
    var tweets = getTweets(page);
    loadTweets(tweets);         // todo. fill in
    repaginate(page);           // todo. fill in
}

// todo. render pagination
function repaginate(page){

}

// todo. load tweets here
function loadTweets(tweets){
    // console.log(JSON.stringify(tweets, 0, 2)); // todo. remove
    // console.log(page);
}

// return the n-th set of tweets
function getTweets(page){
    return favs.slice(page, page + TWEETS_PER_PAGE);
}

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
    var counter = 3; /* start with three so when we mod, we begin with col0. */
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
        /* Add to the correct column on grid. */
        var colNum = counter % 3;
        var colStr = '#col' + colNum;
        
        created_at = dateParser(created_at);
        listStr = liGenerator(id, text, created_at, retweet_count, colNum);

		$("#tweetsGrid").append(listStr);
		counter++;

        /* Create a modal dialog for each tweet. */
        pageGenerator(id);
    });
}

/* Generates a list entry which has jQuery-mobile properties.
 * Javascript doesn't do this for us on the fly, so we're going
 * to have to do it manually. Alternatively, there's listview.('refresh')
 * but I'm too lazy to get another version of jQuery mobile atm.*/
function liGenerator(id, text, created_at, rt_count, colNum){
	var listEntry ='<div class="faveID">' + id + ' ' + created_at + '</div><br/>' +
			        '<a href="#' + id + '" ' +
		            'data-rel="dialog" data-transition="pop">' +
		            '<div class="faveText">' + text + '</div></a>';
	var retweetCount = '<div class="faveCount">' +
						rt_count + ' retweets </div>';

    return '<div class="col ui-block-'+colBlocks[colNum]+'" data-role="controlgroup" id="col'+colNum+'">'+
            '<div class="fave ui-btn-up-c" data-role="button">' + retweetCount + listEntry + '</div></div>';
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

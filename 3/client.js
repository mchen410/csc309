var json;                       // todo. remove: using favs
var favs;                       // favs.json

var tweetResults;               // results list: either favs or tweets
                                // matching a hashtag search
var page = 0;                   // paginator: page number: 0-indexed
var TWEETS_PER_PAGE = 9;       // paginator: page length

var colBlocks = ["a", "b", "c"];

var KEY_ENTER = 13;

$(document).ready(function(){
    // todo. remove getJSON from client.html and put loading in loadPage
    // todo. remove getJSON from client.html and put loading in loadPage
    // todo. remove getJSON from client.html and put loading in loadPage
	
    // getJSON();
    loadFavsJSON(firstPage);
    registerEvents();
                 
    // Code for swiping pages
    /* Swip to left to go to the next page. */
    $('div.ui-page').live("swipeleft", function() {
        nextPage();  // load the next page
    });
                   
    /* Swip to right to go to the prev page.*/
    $('div.ui-page').live("swiperight", function() {
        prevPage(); // load the prev page
    });
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
        var tweets = matchingTweets(searchTerm);
        resetPagination(tweets);
        firstPage();
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
            resetPagination(favs);
            loadPageZero();
            loadAutocompleteTerms(favs);
		})
    });
}

// todo. resetPagination(favs) when user exits search
function resetPagination(tweets){
    page = 0;
    tweetResults = tweets;
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

function firstPage(){
    page = 0;
    loadPage(page);
}

function lastPage(){
    page = tweetResults.length / TWEETS_PER_PAGE;
    loadPage(page);
}

function nextPage(){
    if (page < tweetResults.length / TWEETS_PER_PAGE){
        loadPage(++page);
		$('#pagenum').html(page + 1);
    } else {
        // already on the last page
		$('#nextPage').removeClass('activepagelink');
		$('#lastPage').removeClass('activepagelink');
    }
}

function prevPage(){
    if (page > 0){
        loadPage(--page);
		$('#pagenum').html(page + 1);
    } else {
        // already on the first page
		$('#firstPage').removeClass('activepagelink');
		$('#prevPage').removeClass('activepagelink');
    }
}

// DO NOT call this function to move from page to page: use next,
// prev, first, or lastPage() instead
function loadPage(page){
    var tweets = getTweets(page);
    loadTweets(tweets);         // todo. fill in
    repaginate(page);
	renderTweets(tweets);
}

// todo. render pagination. call first, prev, next, lastPage
function repaginate(page){
	//Not already on first page
	if (page > 0) {
		$('#firstPage').addClass('activepagelink');
		$('#prevPage').addClass('activepagelink');
		$('#firstPage').on('click', function() {
			firstPage();
		});
		$('#prevPage').on('click', function() {
			prevPage();
		});
	}
	//Not already on last page
	if (page < tweetResults.length / TWEETS_PER_PAGE) {
		$('#nextPage').addClass('activepagelink');
		$('#lastPage').addClass('activepagelink');
		$('#nextPage').on('click', function() {
			nextPage();
		});
		$('#lastPage').on('click', function() {
			lastPage();
		});
	}
}

// todo. load tweets here
function loadTweets(tweets){
    console.log(JSON.stringify(tweets, 0, 2)); // todo. remove
    console.log(page);
    renderTweets(tweets);
}

// return the n-th set of tweets
function getTweets(page){
    return tweetResults.slice(page, page + TWEETS_PER_PAGE);
}

/* Read a local json file and create a JSON object from it. */
function getJSON(){
	$.ajax({
		url: "favs.json",
		context: document.body,
		async: false,
		dataType:"json",
		success: (function(json) {
            renderTweets(json);
		})
    });
}

/* Parse the json object to create the appropirate tags. */
function renderTweets(tweetList) {

    var listStr='';
    var pageStr='';
    var counter = 3; /* start with three so when we mod, we begin with col0. */
    
    /*Initialize the grid so we don't re-render stuff.*/
    document.getElementById("tweetsGrid").innerHTML = '';
    
    $.each(tweetList, function(index, fav) {
		console.log("Got here");
        var id, text, source, created_at;
        var user, entities, userID, userName, userScreenName, userLocation,userURL, userDescription, userFavCount, userBackgroundImage, userProfileImage, userTweets, userFollowing, userFollowers;

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
		userLocation=fav.user.location||"Unknown";
        userURL=fav.user.url;
        userDescription=fav.user.description;
        userFavCount=fav.user.favourites_count;
        userBackgroundImage=fav.user.profile_background_image_url;
		userProfileImage=fav.user.profile_image_url;
		userTweets=fav.user.statuses_count;
		userFollowing=fav.user.friends_count;
		userFollowers=fav.user.followers_count;

			console.log("Booyah");
			console.log(fav.entities.media);
			console.log("Booyoh");
		if ( "media" in fav.entities ) {
			media = fav.entities.media[0].media_url;
		} else {
			media = "";
		}

        /* Render each fave. */
        /* Add to the correct column on grid. */
        var colNum = counter % 3;
        var colStr = '#col' + colNum;

        created_at = dateParser(created_at);
        text = httpParser(text);
        listStr = liGenerator(id, text, created_at, retweet_count, colNum);

		$("#tweetsGrid").append(listStr);
		counter++;

        /* Create a modal dialog for each tweet. */
        pageGenerator(id, text, userName, created_at, media, retweet_count, userScreenName, userLocation, userDescription, userURL, userProfileImage, userTweets, userFollowing, userFollowers);
    });
}

/* Generates a list entry which has jQuery-mobile properties.
 * Javascript doesn't do this for us on the fly, so we're going
 * to have to do it manually. Alternatively, there's listview.('refresh')
 * but I'm too lazy to get another version of jQuery mobile atm.*/
function liGenerator(id, text, created_at, rt_count, colNum){
	var info = '<div class="faveID">' + 'Date: ' + created_at + '</div>';
	var listEntry = info + '<br/>' +
			        '<a class="faveText" href="#' + id + '" ' +
		            'data-rel="dialog" data-transition="pop">' +
		            text + '</a>';
	var retweetCount = '<div class="faveCount">' +
						rt_count + ' retweets </div>';

    return '<div class="col ui-block-'+colBlocks[colNum]+'" data-role="controlgroup" id="col'+colNum+'">'+
            '<div class="fave ui-btn-up-c" data-role="button">' + retweetCount + listEntry + '</div></div>';
}

/* Like liGenerator, but for a page. Minimal dialog for now.
 * There seems to be a way to create pages dynamically using
 * $.mobile.initializePage(), but it was causing errors, so I cheated
 * by using clone() instead on a dummy page.*/
function pageGenerator(id, text, userName, created_at, media, retweet_count, userScreenName, userLocation, userDescription, userURL, userProfileImage, userTweets, userFollowing, userFollowers){

    var dCopy = $('#activeDialog').clone();
    $(dCopy).attr('id', id);

	$(dCopy).find('.header').html('<h1>Details</h1><a href="/" data-rel="back" data-theme="a"><div>Close</div></a>');
	var contentDiv = $(dCopy).find('.content');

	var content = '<div class="dialogusername">' + userName + '</div>' +
					'<div class="dialogscreenname">@' + userScreenName + '</div>' +
					'<div class="dialoglocation">' + userLocation + ' &#8211; <a href="' + userURL + '">' + userURL + '</a>' +
					'</br>' + addCommas(userTweets) + ' tweets &#8211; ' + addCommas(userFollowing) + ' following &#8211; ' + addCommas(userFollowers) + ' followers</div>' +
					'<div class="dialogdescription">' + userDescription + '</div>' +
					'<div class="dialogtweet"><img src="' + userProfileImage + '"><div class="dialogtext"><strong>' + created_at +
					'<div class="dialogretweet"><img src="./images/retweet.png"/>' + addCommas(retweet_count) + '</div>' +
					'</strong></br>' + text + '</div></div>';

	/* Handle an image, if applicable */
	if ( media != "" ) {
		content += '<img class="dialogpicture" src="' + media + '">';
	}

	$(contentDiv).html(content);

    /* Append dialog pages to mainBody, so pages are not nested. */
    $('#mainBody').append(dCopy);
}

/*Given a text, return a new string with the links as html links.*/
function httpParser(text){
	var parsedText = '';
	var linkStart = text.indexOf("http://", 0);

	while (linkStart != -1){
		console.log(linkStart);
		var plain = text.substring(0, linkStart);
		var space = text.indexOf(" ", linkStart);
		if (space == -1){
			space = text.length;
		}
		var link = text.substring(linkStart, space);

		/* add hrefs to link. */
		var linkified = '<a href="" onclick=window.open("' + link + '")>' + link + '</a>';
		//$(linkified).attr('onclick', window.open(link));

		/* update the string. */
		parsedText = parsedText + plain + linkified;
		text = text.substring(space);
		linkStart = text.indexOf("http://", 0);
	}
	console.log(parsedText + text);
	return parsedText + text;
}

function addCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
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

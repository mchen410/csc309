var numTopics = 0;
var topicOpen = 0;
var commentOpen = 0;
var numComments = 0;
// var upvotes = new Array();

// Sorting topics by votes. TODO. Sort comments by votes.
jQuery.fn.sort = function() {
    return this.pushStack([].sort.apply(this, arguments), []);
};

function sortByTotalVotes(a, b){
    if (a.totalVotes == b.totalVotes){
        return 0;
    }
    return a.totalVotes > b.totalVotes ? 1 : -1;
};

function sortByTotalVotesDesc(a, b){
    return sortByTotalVotes(a, b) * -1;
};

/**RENDER ELEMENTS FROM SERVER**/

//Render the elements on the page
function loadPage()
{
	$.getJSON('topics', function(json) {
        var sortedTopics = $(json.topics).sort(sortByTotalVotesDesc);
		$.each(sortedTopics, function(i, topic) {
			renderTopic(topic.id, topic); //show all topics
			loadComments(topic.id); //load all the comments for each topic
		});
	});
};

//Display the topic with id i.
function renderTopic(i, topic)
{
	//Create a new div to populate inside topicsList
	var topicDiv = document.createElement('div');
	topicDiv['id'] = 'topic' + i;
	topicDiv.className = 'topic';
	$(topicDiv).appendTo('#topicsList');

    // Text and link
	$('<a class="topicTitle"/>').attr('id', 'link' + i).appendTo(topicDiv);
	document.getElementById('link' + i).innerHTML = topic.title + '<br/>';

	$('<a class="topicLink" href="' + topic.link + '"> ' + topic.link + '</a> <br/>').appendTo(topicDiv);

    // Num votes
    $("<div/>", {
        id: "votes" + i,
        href: "#",
        onclick: "upboat('" + i + "')", // Only supporting up voting. Down vote opt.
        class: "votes",
        html: topic.votes,
    }).appendTo("#topic" + i);

    // Num comments
	document.getElementById('topic' + i).innerHTML += 'number of comments: ' + topic.numComments + '<br/>';

	//Create a button for posting a comment
	$('<button id="postB' + i + '" class="postComment" onClick=commentBox()>Post a Comment</button>').appendTo(topicDiv);
	$('<button id="showB' + i + '" class="showComment">Show Comments</button>').appendTo(topicDiv);
	var pb = document.getElementById('postB' + i);
	pb.setAttribute('onclick', 'commentBox(' + topicDiv + ')');

	//Create div container for elements
	var container = document.createElement('div');
	container['id'] = 'cmmtContainer' + i;
	container.className = 'cmmtContainer';
	$(container).appendTo(topicDiv);

	//Set the onclick function of Show Comments button
	//We need comment container to do this
	document.getElementById('showB' + i).setAttribute('onclick', 'showComments("' + i + '")');
}

function upboat(postID){
    $("#votes" + postID).html(parseInt($("#votes" + postID).html()) + 1);
    $.post("/vote/" + postID, function(res){
        // TODO. Do something opt.
	});
}
// /*
//  */
// function upvote(topicId)
// {
// 	if (upvotes[topicId] == 1) {
// 		var karmaId = 'karma' + topicId;
// 		document.getElementById(karmaId).innerHTML = parseInt(document.getElementById(karmaId).innerHTML) - 1;
// 		upvotes[topicId] = 0
// 	} else {
// 		var karmaId = 'karma' + topicId;
// 		document.getElementById(karmaId).innerHTML = parseInt(document.getElementById(karmaId).innerHTML) + 1;
// 		upvotes[topicId] = 1
// 	}
// }

//Acquire from the server all the comments of the topic with topicID.
function loadComments(topicID)
{
	var str = '/topic/' + topicID + '/children'
	$.getJSON(str, function(data) {
		// retrieve the comments from data dict

        // OPT TODO. Change server.js to return a good var name
        // instead of urlVar3.
        var cmmtDict = $(data.urlVar3).sort(sortByTotalVotesDesc);

		if (!jQuery.isEmptyObject(cmmtDict)){
			//create a div that contains all comments for this topic
			var container = document.getElementById('cmmtContainer' + topicID);

			//now disable the onclick on the topic's title, to prevent
			//duplication of comment loads; once comments show, they
			//will not retract
			$('#link' + topicID).removeAttr('onclick');

			var depth=1;
			//render each comment
			$.each(cmmtDict, function(key, comment){
				renderComment(comment, container, depth, 0);
			});
		}

	});
}

// Render each comment, and add commenting functionality on each.
// At first load, all comments are hidden.
function renderComment(comment, container, depth, showComment)
{
	//create a div for each individual comment
	var cmmtDiv = document.createElement('div');
	var divID = comment.id; //set divID as the path to the comment (stored in comment id), for easier storage at the backend
	cmmtDiv['id'] = divID;
	cmmtDiv.className = 'cmmtDiv';
	$(cmmtDiv).appendTo(container);

	//manually indent to give illusion of nesting
	var leftMargin = depth * 20;
	cmmtDiv.style.marginLeft='' + leftMargin + 'px';

	//show the text and the number of votes
	cmmtDiv.innerHTML += comment.text + '<br/>';

    // Num votes
    $("<div/>", {
        id: "votes" + comment.id,
        href: "#",
        onclick: "upfloat('" + comment.id + "')", // Only supporting up voting. Down vote opt.
        class: "votes",
        html: comment.votes,
    }).appendTo(cmmtDiv);
	// cmmtDiv.innerHTML += 'Number of votes: ' + comment.votes + '<br/>';
	// create an upvote button
	// $('<button id="voteB' + divID + '" class="cmmtVote" onClick=upVote()>Vote!</button>').appendTo(cmmtDiv);

	//create a comment button, to allow commenting on comments
	$('<button id="cmmtB' + divID + '" class="cmmtComment">Post a Comment</button>').appendTo(cmmtDiv);
	document.getElementById('cmmtB' + divID).setAttribute('onclick', 'commentBox("' + divID + '")');
	$('<button id="showB' + divID + '" class="showComment">Show Comments</button>').appendTo(cmmtDiv);
	document.getElementById('showB' + divID).setAttribute('onclick', 'showComments("' + divID + '")');

	if (showComment == 0){
		$(cmmtDiv).hide(); //hide comment
	} else {
		$(cmmtDiv).show(); //hide comment
	}

    comment.children = $(comment.children).sort(sortByTotalVotesDesc);

	//If this comment has comments, render its children
	if (!jQuery.isEmptyObject(comment.children)){
		$.each(comment.children, function(key, childCmmt){
			//naturally hide its children
			renderComment(childCmmt, cmmtDiv, depth+1, 0);
		});
	}
}

/*Show the comments that belong to the topic/comment with divID.*/
function showComments(divID){
	//get the element with id divID; may either be a topic or a comment
	if ( divID.split('x').length == 1) {
		//this is a topic; we have to get its cmmtContainer
		var cont = 'cmmtContainer' + divID;
	} else {
		//this is a comment; it doesn't have its own cmmtContainer
		var cont = divID;
	}

	//get its comment children, and show them
	$("div#" + cont + " > .cmmtDiv").show();

	//change the button to Hide Button
	var button = document.getElementById('showB' + divID);
	button.innerHTML = 'Hide Comments';
	$("#showB"+divID).attr('onclick', 'hideComments("' + divID + '")');

}

/*Hide the comments that belong to the topic/comment with divID.*/
function hideComments(divID){
	//get the element with id divID; may either be a topic or a comment
	if ( divID.split('x').length == 1) {
		//this is a topic; we have to get its cmmtContainer
		var cont = 'cmmtContainer' + divID;
	} else {
		//this is a comment; it doesn't have its own cmmtContainer
		var cont = divID;
	}

	//get its comment children, and hide them
	$("div#" + cont + " > .cmmtDiv").hide();

	//change the button to Show Button
	var button = document.getElementById('showB' + divID);
	button.innerHTML = 'Show Comments';
	$("#showB"+divID).attr('onclick', 'showComments("' + divID + '")');
}

function upfloat(postID){
    // Don't know why jquery selection doesn't work here, like in
    // upboat: $("#votes" + postID).html() returns undefined.
    document.getElementById("votes" + postID).innerHTML = parseInt(document.getElementById("votes" + postID).innerHTML) + 1;
    $.post("/vote/" + postID, function(res){
        // TODO. Do something opt.
	});
}

/**RENDER ELEMENTS TO ALLOW POST TO SERVER**/

/* The client clicks on "Submit a topic" button, to submit a new topic to the server.
 * The function generates textboxes for inserting the title and the link of the topic
 * and append them to the topicActivated div.
 * Moreover, it generates the "Submit your topic" and "Cancel Submission" buttons. */

function wantToPost()
{
	if (topicOpen == 0) {
		var division = document.createElement('div');
		division['id'] = 'topicActivated';
		document.getElementById('NewTopics').appendChild(division);

		/* Create a textbox for the topic title. */
        var titleBox = document.createElement('textarea');
		titleBox['id'] = 'topicTitle';
		titleBox['cols'] = '50';
		titleBox['rows'] = '3';
		document.getElementById('topicActivated').appendChild(titleBox);

		document.getElementById('topicActivated').innerHTML += '<br />';

		/* Create a textbox for the topic link. */
        var linkBox = document.createElement('textarea');
		linkBox['id'] = 'topicLink';
		linkBox['cols'] = '50';
		linkBox['rows'] = '1';
		document.getElementById('topicActivated').appendChild(linkBox);

		document.getElementById('topicActivated').innerHTML += '<br />';

        /* Submit the topic. */
		document.getElementById('topicActivated').innerHTML += '<button id="topicSubmission" onclick="submitTopic()">Submit your Topic</button>&emsp;&emsp;';

        /* Cancel the active submission process. */
		document.getElementById('topicActivated').innerHTML += '<button id="topicCancellation" onclick="cancelTopic()">Cancel Submission</button>';

		topicOpen = 1;
	}
}

//Removes text box for posting topics.
function cancelTopic()
{
	var topic = document.getElementById('topicActivated');
	topic.parentNode.removeChild(topic);
	topicOpen = 0;
}

// This function provides a textbox to write a comment.
function commentBox(divID)
{
	//To prevent more than one comment box to appear at the same time;
	//Technically there could be a comment box for each comment / topic, but we're assuming
	//one client is only worried about commenting on 1 thing at a time.
	if (commentOpen == 0){
		//Create a div in which to store the box
		var division = document.createElement('div');
		division['id'] = 'commentActivated';

		//This box must appear directly below the comment/topic the user is commenting on
        $(division).insertAfter("#showB" + divID + ".showComment");

		//Create text area
		var commentBox = document.createElement('textarea');
		commentBox['id'] = 'comment';
		commentBox['cols'] = '50';
		commentBox['rows'] = '3';
		division.appendChild(commentBox);

		//Create links to submit comment / cancel comment
		division.innerHTML += '<br />';
		division.innerHTML += '<button id="commentSubmission">Submit Your Comment</button>&emsp;&emsp;';
		division.innerHTML += '<button id="commentCancel">Cancel Comment</button>&emsp;&emsp;';
		document.getElementById('commentSubmission').setAttribute('onclick', 'submitComments("' + divID + '")');
		document.getElementById('commentCancel').setAttribute('onclick', 'cancelComment()');

		commentOpen = 1;
	}
}

//Removes text box for posting topics.
function cancelComment()
{
	var cmmtBox = document.getElementById('commentActivated');
	cmmtBox.parentNode.removeChild(cmmtBox);
	commentOpen = 0;
}

//Submit the topic inside the user input boxes
function submitTopic()
{
	var link = document.getElementById('topicLink').value;
	var title = document.getElementById('topicTitle').value;

    /* Check that the provided link represents an actual link. */
	if ((link.substring(0, 7) !== 'http://') || title.length == 0) {
		alert('Invalid topic! Please revise.');
	} else {
		numTopics += 1;
		cancelTopic();

		//send new topic to the server, then render the new topic that was just sent
		var data = 'topicTitle=' + title + '&topicLink=' + link;
		$.post('/post/topic', data, function(response){
			renderTopic(response.id, response);
		}, 'json');
	}
}

//Submit the comment inside the comment box
function submitComments(path) {
    var comment = document.getElementById('comment').value;
    var data = 'commentText=' + comment + '&commentPath=' + path;
	cancelComment();
    $.post('/post/comment', data, function(response) {
		   var pathList = response.id.split('x');
		   //keep track of nesting!!
		   var depth = pathList.length - 1;
		   //this is the div of the comment's parent
		   var containerStr = response.id.substring(0, response.id.length - 2);

		   showComment = 1;

		   if (pathList.length == 2) //this is a direct comment to a post
		   {
				//Topic divs = 'topic' + id; as opposed to comment divs
				//which are just paths. REMEMBER TO CHANGE!!!!
				containerStr = 'topic' + pathList[0];
		   }
		   var container = document.getElementById(containerStr);
		   renderComment(response, container, depth, showComment);
           }, 'json');
}

// This function runs when the page is ready to load the existing topics.
function loadTopics() {
}

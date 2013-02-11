// TODO
//     hide "show comment button" when no children
//     show topics comment box on top

var numTopics = 0;
var topicOpen = 0;
var commentOpen = 0;
var numComments = 0;

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
	topicDiv['id'] = i; //a topic's divID is its path
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
    }).appendTo("#" + i);

    $("<div/>", {
        id: "totalvotes" + i,
        html: topic.totalVotes,
    }).appendTo("#" + i).hide();

    // Num comments
	document.getElementById(i).innerHTML += 'number of comments: ' + topic.numComments + '<br/>';

	//Create a button for posting and showing comments
	$('<button id="postB' + i + '" class="postComment">Post a Comment</button>').appendTo(topicDiv);
	document.getElementById('postB' + i).setAttribute('onclick', 'commentBox("' + i + '")');
	
	$('<button id="showB' + i + '" class="showComment">Show Comments</button>').appendTo(topicDiv);
	document.getElementById('showB' + i).setAttribute('onclick', 'showComments("' + i + '")');
	if (topic.numComments == 0) {
		$("#showB" + i).css({ opacity: 0 });
	}
}

//currently not in use
function topicCommentBox(id)
{
	if (commentOpen == 0){

		var division = document.createElement('div');
        division['id'] = 'commentActivated';

        //This box must appear directly below the comment/topic the user is commenting on
        $(division).insertAfter("#showB" + id + ".showComment");

		var commentBox = document.createElement('textarea');
		commentBox['id'] = 'comment';
		commentBox['cols'] = '50';
		commentBox['rows'] = '3';

		division.appendChild(commentBox);
		division.innerHTML += '<br />';
		division.innerHTML += '<button id="commentSubmission">Submit Your Comment</button>&emsp;&emsp;';
		division.innerHTML += '<button id="commentCancel">Cancel Comment</button>&emsp;&emsp;';
		document.getElementById('commentSubmission').setAttribute('onclick', 'submitComments("' + id + '")');
		document.getElementById('commentCancel').setAttribute('onclick', 'cancelComment()');

		commentOpen = 1;
	}
}

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
			//get the topic's comment container
			var container = document.getElementById(topicID);

			var depth=1;
			//render each comment
			$.each(cmmtDict, function(key, comment){
				//args: comment, container, depth, boolean showComment
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
        onclick: "upboat('" + comment.id + "')", // Only supporting up voting. Down vote opt.
        class: "votes",
        html: comment.votes,
    }).appendTo(cmmtDiv);

    $("<div/>", {
        id: "totalvotes" + comment.id,
        html: comment.totalVotes,
    }).appendTo(cmmtDiv).hide();

	//create a comment button, to allow commenting on comments
	$('<button id="cmmtB' + divID + '" class="cmmtComment">Post a Comment</button>').appendTo(cmmtDiv);
	document.getElementById('cmmtB' + divID).setAttribute('onclick', 'commentBox("' + divID + '")');
	$('<button id="showB' + divID + '" class="showComment">Show Comments</button>').appendTo(cmmtDiv);
	document.getElementById('showB' + divID).setAttribute('onclick', 'showComments("' + divID + '")');
	if ($("div[id^=" + divID + "x]").length == 0) {
		document.getElementById('showB' + divID).setAttribute('style', 'opacity : 0');
	}
	
	if (showComment == 0){
		$(cmmtDiv).hide(); //hide comment
	} else {
		$(cmmtDiv).show(); //show comment
	}

    comment.children = $(comment.children).sort(sortByTotalVotesDesc);
	
	//If this comment has comments, render its children
	if (!jQuery.isEmptyObject(comment.children)){
		$.each(comment.children, function(key, childCmmt){
			//showComment = 0 -> naturally hide its children
			renderComment(childCmmt, cmmtDiv, depth+1, 0);
		});
	}
}

/*Show the comments that belong to the topic/comment with divID.*/
function showComments(divID){
	//get the element with id divID; may either be a topic or a comment
	if ( divID.split('x').length == 1) {
		//this is a topic; we have to get its cmmtContainer
		var cont = divID;
	} else {
		//this is a comment; it doesn't have its own cmmtContainer
		var cont = divID;
	}

	//get the element's comment children, and show them
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
		var cont = divID;
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

function upboat(postID){
    // don't know why this one doesn't work, but the one below does:
    // $("#votes" + postID).html(parseInt($("#votes" + postID).html()) + 1);
    document.getElementById("votes" + postID).innerHTML = parseInt(document.getElementById("votes" + postID).innerHTML) + 1;
    upfloat(postID, true);
    $.post("/vote/" + postID, function(res){});
}

// moving posts around when user up votes
function upfloat(postID, firsttimefloating){
    var thisdiv = $("#" + postID);
    var prevdiv = thisdiv.prev();
    if (ispost(thisdiv)){
        if (firsttimefloating){
            incretotalvotes(postID); // beginner's luck :D
        }
        if (ispost(prevdiv) && hasmorevotes(thisdiv, prevdiv)){
            prevdiv.before(thisdiv);
            thisdiv.after(prevdiv);
            upfloat(thisdiv.attr("id"), false); // moving up till top
        } else {
            upfloat(thisdiv.parent().attr("id"), true);
        }
    } else if (iscommentcontainer(thisdiv)){
        upfloat(thisdiv.parent().attr("id"), true);
    }
}

function iscommentcontainer(thisdiv){
    return thisdiv.hasClass("cmmtContainer");
}

function incretotalvotes(postID){
    document.getElementById("totalvotes" + postID).innerHTML = parseInt(document.getElementById("totalvotes" + postID).innerHTML) + 1;
}

function hasmorevotes(thispost, prevpost){
    var thisid = thispost.attr("id");
    var previd = prevpost.attr("id");
    var thisvotes = parseInt(thispost.children("#totalvotes" + thisid).html());
    var prevvotes = parseInt(prevpost.children("#totalvotes" + previd).html());
    return thisvotes >= prevvotes;
    // >= encourages people to upvote more than >
}

function ispost(post){
    return post.hasClass("topic") || post.hasClass("cmmtDiv");
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
		division.innerHTML += 'Topic (Max 140 Chars): <br />' 
        var titleBox = document.createElement('textarea');
		titleBox['id'] = 'topicTitle';
		titleBox['cols'] = '25';
		titleBox['rows'] = '6';
		division.appendChild(titleBox);

		division.innerHTML += '<br />';

		/* Create a textbox for the topic link. */
		division.innerHTML += 'Link: <br />' 
        var linkBox = document.createElement('textarea');
		linkBox['id'] = 'topicLink';
		linkBox['cols'] = '25';
		linkBox['rows'] = '2';
		division.appendChild(linkBox);

		division.innerHTML += '<br />';

        /* Submit the topic. */
		division.innerHTML += '<button id="topicSubmission" onclick="submitTopic()">Submit your Topic</button>&emsp;&emsp;';

        /* Cancel the active submission process. */
		division.innerHTML += '<button id="topicCancellation" onclick="cancelTopic()">Cancel Submission</button>';

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
		alert('Please write a topic! Please start link with http:// .');
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

		   showComment = 1; //show this new comment

		   var container = document.getElementById(containerStr);
		   renderComment(response, container, depth, showComment);
           }, 'json');
	$("#showB" + path).css({ opacity: 1 });
}

// This function runs when the page is ready to load the existing topics.
function loadTopics() {
}

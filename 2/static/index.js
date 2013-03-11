$(document).ready(function(){
    // return false avoids navigating back to top of page
    $("#call").click(function(){call(); return false;});
});

function call(){
    eval($("#callback").val());
    var data = eval("(" + $("#data").val() + ")");
    $.ajax({
        url: $("#apiurl").val(),
        type: $("#method").val(),
        dataType: $("#datatype").val(), // "json", // jsonp, // can't do cross domain ajax with json
        data: data,
        // data: {
        //     // tumblr api_key for tumblrbee app
        //     api_key: "Sm43FEhw5K5Z37BnENbJHC0XFgw4XHvTbE2j6NYkfk5McKZNPz",
        // },
        success: callback, // callback is the name of the function in textarea#callback. keep them both the same
    });
}

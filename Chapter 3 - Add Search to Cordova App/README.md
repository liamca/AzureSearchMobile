# Chapter 3 - Adding Search to the Cordova Application

In the previous chapter we create a basic Cordova application that leverage JQuery.  The goal of this next chapter is to extend this application to provide full text search, using Azure Search.  

To get started go back to the command console under c:\demo\AzureSearchCordovaDemo\www and open the index.html file in a text editor such as Notepad++ and update the page 1 content separated by <!-- jquery mobile page 1 --> and <!-- end page 1 --> with the following:

```html
		<div data-role="page" id="homepage">
		  <div data-role="panel" id="filterPanel"> 
              <form id="FilterResType"></form>
              <form id="FilterState"></form>
              <form id="FilterNumCBldg"></form>
		  </div> 

			<div data-role="header">
                <a href="#filterPanel" data-icon="grid" data-theme="b">Filter</a>
				<h1>Historic US Sites</h1>
			</div>

			<div data-role="main" class="ui-content">
                <b><a href="https://azure.microsoft.com/en-us/services/search/">Powered by Azure Search</a></b>
				<input type="search" placeholder="Search Historic Sites" id="searchbar" /><br>
				<ul data-role="listview" id="searchResults"></ul>
			</div>

		</div> 
```
This code will do multiple things:
* Create a Panel called filterPanel that will appear from the left that will eventually allow users to filter search results
* Add a header to the page with the text "Historic US Sites"
* Add a search text box that will allow user to search for specific historic sites using full text search

Build and run the emulation of this app using the following commands:

<pre><code>cordova build browser
cordova emulate browser
</code></pre>

You should see an application that looks like this:

<img src="https://raw.githubusercontent.com/liamca/AzureSearchMobile/master/Chapter%203%20-%20Add%20Search%20to%20Cordova%20App/screenshot_adding_searchbox.png" width="502" width="172">

Now that we have some core HTML code for this page, we will next add a reference to a new JavaScript file just above the closing </body> that will contain our Azure Search javascript code:

<pre><code><script type="text/javascript" src="js/search.js"></script>
</code></pre>

Next create a file called search.js and place it in the /www/js directory with the following content:

```html
var apikey = "252044BE3886FE4A8E3BAA4F595114BB";
var inSearch = false;
var lastSearchTerm = '';

$(document).ready(function () {
	execSearch();
	$('#searchbar').on('keyup', function (event) {
		if (inSearch != true)
			execSearch();
	});
});

function execSearch()
{
	inSearch = true;
	$.mobile.loading("show", {
		text: "Loading...",
		textVisible: true,
		textonly: true,
		theme: "b"
	});
	lastSearchTerm = $("#searchbar").val();

    // Extract parameters from URL for search
    var searchAPI = "https://azs-playground.search.windows.net/indexes/historicsites/docs?api-version=2015-02-28-Preview&$select=NRIS_Refnum,RESNAME,ResType,City,State,ImageCount&facet=ResType,sort:value&facet=State,sort:value&$top=10&scoringProfile=default&queryType=full&search=" + lastSearchTerm;

    $.ajax({
        url: searchAPI,
        beforeSend: function (request) {
            request.setRequestHeader("api-key", apikey);
            request.setRequestHeader("Content-Type", "application/json");
            request.setRequestHeader("Accept", "application/json; odata.metadata=none");
        },
        type: "GET",
        success: function (data) {
            $("#searchResults").html('');
            for (var item in data.value)
            {
                var thumbNail = 'https://azsplayground.blob.core.windows.net/historicsites/img/nrhp_thumbnail.png';
                if (data.value[item]["ImageCount"] > 0)
                    thumbNail = 'https://azsplayground.blob.core.windows.net/historicsites/img/' + data.value[item]["NRIS_Refnum"] + '_1.jpeg';
                htmlString = '<li id="' + data.value[item]["NRIS_Refnum"] + '"><a><img src="' + thumbNail + '" style="padding-top:15px;padding-left:20px;margin-right:60px;">';

                htmlString += '<div style="padding-left: 15px;"><font style="white-space:normal; font-size: small;" >' + data.value[item]["RESNAME"];
                htmlString += '<br>';
                htmlString += data.value[item]["City"] + ', ';
                htmlString += data.value[item]["State"];
                htmlString += '<br>';
                htmlString += data.value[item]["ResType"];
                htmlString += '</font></div></a></li>';
                $("#searchResults").append(htmlString);
            }
            $("#searchResults").listview("refresh");

			// Handle case where user entered text while in search 
            if ((lastSearchTerm != $("#searchbar").val()) && (lastSearchTerm != '*'))
            {
                lastSearchTerm = $("#searchbar").val();
                execSearch(lastSearchTerm);
            } else {
                $.mobile.loading("hide");
                inSearch = false;
            }
        }
    });
}
```

This code will do multiple things:
* In the $(document).ready function, the application will do a default search with no text by calling execSearch
* The $('#searchbar').on('keyup' function will execute a search after each character entered into the search box
* The execSearch function executes a full text search against Azure Search using the text entered into the search box
* When a response is returned, the data is parsed and loaded into a div called searchResults

###[Next Chapter - Chapter 2 - Create the Cordova App...](https://github.com/liamca/AzureSearchMobile/tree/master/Chapter%202%20-%20Create%20the%20Cordova%20App)

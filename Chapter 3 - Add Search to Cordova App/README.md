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

<pre><code>cordova platform add windows
cordova-jquery</code></pre>

You should see an application that looks like this:

<img src="https://raw.githubusercontent.com/liamca/AzureSearchMobile/master/Chapter%203%20-%20Add%20Search%20to%20Cordova%20App/screenshot_adding_searchbox.png" width="502" width="172">

Now that we have some core HTML code for this page, we will next add a reference to a new JavaScript file just above the closing </body> that will contain our Azure Search javascript code:

<pre><code><script type="text/javascript" src="js/search.js"></script>
</code></pre>


###[Next Chapter - Chapter 2 - Create the Cordova App...](https://github.com/liamca/AzureSearchMobile/tree/master/Chapter%202%20-%20Create%20the%20Cordova%20App)

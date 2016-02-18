# Chapter 4 - Adding Filtering

In the previous chapter we added full text search to the Cordova application allowing us to type text in the search box to see results displayed in the Cordova app.  The goal of this next chapter is to extend this application to provide filtering of results returned from the full text search.  To do this, we will leverage the existing Filter button created earlier and allow people to filter results based on the type of historic site and the state it is located in.

The first thing we will need to do is to return facets.  You can think of a facet as a grouped set of categories based on the documents returned.  For example, one facet might be State and the results would include Washington with a count of 6 and Oregon with a count of 12, telling us that based on the search we executed, there are 6 results in Washington and 12 in Oregon.  Facets are almost always used in conjunction with filters, where you might click on Washington to filter the results to only show items in the State of Washhington.

To tell Azure Search to return facet counts, open search.js and modify the line:

<pre><code>
var searchAPI = "https://azs-playground.search.windows.net/indexes/historicsites/docs?api-version=2015-02-28-Preview&$top=10&search=" + lastSearchTerm;
</code></pre>

to 

<pre><code>
var searchAPI = "https://azs-playground.search.windows.net/indexes/historicsites/docs?api-version=2015-02-28-Preview&facet=ResType,sort:value&facet=State,sort:value&$top=10&search=" + lastSearchTerm;
</code></pre>

Notice how we extended the search query to add the parameters &facet=ResType,sort:value&facet=State,sort:value.  This will allow Azure Search to return facet counts for the ResType (which is a field that defines the historic site type) as well as States.

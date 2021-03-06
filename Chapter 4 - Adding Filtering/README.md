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

Next, there is a lot of code to handle the faceting & filtering, so I am going to include the entire set of JavaSCript code for your search.js file.  

```html
var apikey = "252044BE3886FE4A8E3BAA4F595114BB";
var inSearch = false;
var lastSearchTerm = '';

var filterArray = [];
var filterQuery='';

$(document).ready(function () {
	execSearch();
	
	$('#searchbar').on('keyup', function (event) {
		if (inSearch != true)
			execSearch();
	});

	// Don't use back button on WP and rely on hardware button
	if(navigator.userAgent.match(/Windows Phone/i)){
		$("#backButton").hide();
	}

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
	
    // Append ~ to each word  for fuzzy search
    if (lastSearchTerm == '')
        lastSearchTerm = '*';

    var fuzzyQ = "";
    if (lastSearchTerm.length > 2) {
        var res = lastSearchTerm.split(" ");
        for (var item in res) {
            fuzzyQ += res[item] + '~ ';
        }
    } else
        fuzzyQ = lastSearchTerm;

    // Get Facet Query
    RefreshFacets();

    // Extract parameters from URL
    var searchAPI = "https://azs-playground.search.windows.net/indexes/historicsites/docs?api-version=2015-02-28-Preview&$select=NRIS_Refnum,RESNAME,ResType,City,State,ImageCount&facet=ResType,sort:value&facet=State,sort:value&$top=10&scoringProfile=default&queryType=full&search=" + fuzzyQ + filterQuery;

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

            $('#searchResults').delegate('li', 'click', function () {
				if (inSearch == false)
					changePage('#homepage', '#pageDetails', false, $(this).attr('id'));
            });

            $("#searchResults").listview("refresh");

            facets = data["@search.facets"];
            updateFacets();
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

function getStaticHTML(html)
{
		if(Object.hasOwnProperty.call(window, "ActiveXObject")){     //using IE
			return window.toStaticHTML(html);
		} else {
			return html;
		}
}

function checkIfSelected(facet, value)
{
	for (var filter in filterArray) {
		if ((filterArray[filter].facet == facet) && 
			(filterArray[filter].value == value))
			return 'checked';
	}
	return '';
}

function updateFacets()
{
    $("#FilterResType").html('');
    $("#FilterResType").append('<legend>Type:</legend>').trigger('create');;
    for (var facet in facets.ResType)
    {
		// Check if this is a selected facet
		var checked = checkIfSelected('ResType', facets.ResType[facet].value);
		var html = getStaticHTML('<label id="' + facets.ResType[facet].value + '"><input type="checkbox" value = "' + facets.ResType[facet].value + '" ' + checked + ' id="chk' + facets.ResType[facet].value + '">' + facets.ResType[facet].value + ' (' + facets.ResType[facet].count + ')</label>');
        $("#FilterResType").append(html).trigger('create');
        $('#chk' + facets.ResType[facet].value).change(function () {
            RefreshfilterArray('ResType', this.value, this.checked);
        });
    }

    $("#FilterState").html('');
    $("#FilterState").append('<legend>State:</legend>').trigger('create');;
    for (var facet in facets.State) {
		var checked = checkIfSelected('State', facets.State[facet].value);
        var html = getStaticHTML('<label id="' + facets.State[facet].value + '"><input type="checkbox" value = "' + facets.State[facet].value + '" ' + checked + ' id="chk' + facets.State[facet].value + '">' + facets.State[facet].value + ' (' + facets.State[facet].count + ')</label>');
        $("#FilterState").append(html).trigger('create');
        $('#chk' + facets.State[facet].value).change(function () {
            RefreshfilterArray('State', this.value, this.checked);
        });
    }

}

function RefreshfilterArray(facet, value, checked)
{
    if (checked) {
        filterArray.push({ facet: facet, value: value });
		if (inSearch != true)
			execSearch();
	} else
    {
        filterArray.forEach(function (result, index) {
            if ((result.facet == facet) && (result.value == value) ){
                //Remove from array
                filterArray.splice(index, 1);
				if (inSearch != true)
					execSearch();
            }
        });
    }
}

function RefreshFacets()
{
    var lastFacet = '';
	filterQuery = '';
    if (filterArray.length > 0 ){
        filterQuery = '&$filter=';
        filterArray = filterArray.sort(compare);

        for (var filter in filterArray) {
            if (filterArray[filter].facet != lastFacet) 
                filterQuery += "(";
            else
                filterQuery = filterQuery.substring(0, filterQuery.length-6) + " or ";

            filterQuery += filterArray[filter].facet + " eq '" + filterArray[filter].value + "') and ";

            lastFacet = filterArray[filter].facet;
        }
        filterQuery = filterQuery.substring(0,filterQuery.length - 5);

    }

}

function compare(a, b) {
    if (a.facet < b.facet)
        return -1;
    if (a.facet > b.facet)
        return 1;
    return 0;
}
```
Build and run the emulation of this app using the following commands:

<pre><code>cordova build browser
cordova emulate browser
</code></pre>

You should see an application that looks like this.  Try clicking on the Filter button to see the facets.

<img src="https://raw.githubusercontent.com/liamca/AzureSearchMobile/master/Chapter%204%20-%20Adding%20Filtering/filtering.png">

###[Next Chapter 5 - Adding a Details Page...](https://github.com/liamca/AzureSearchMobile/tree/master/Chapter%205%20-%20Adding%20a%20Details%20Page)

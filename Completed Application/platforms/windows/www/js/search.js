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

	//document.addEventListener("deviceready", onDeviceReady, false);
	
	if (window.WinJS && window.WinJS.Application) {
		$("#backButton").hide();
		window.WinJS.Application.onbackclick = function () {
			if (window.location.hash === '#/') {
				return false;
			}

			window.history.back();
			return true;
		};
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
                changePage('#pageDetails', false, $(this).attr('id'));
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

function execLookup(q) {
    // Do a lookup on a specific item to get details
    var searchAPI = "https://azs-playground.search.windows.net/indexes/historicsites/docs/" + q +"?api-version=2015-02-28&$select=RESNAME,ResType,Address,City,County,State,NumCBldg,NumCSite,NumCStru,CertifiedDate,Edited,ImageCount";

    $.ajax({
        url: searchAPI,
        beforeSend: function (request) {
            request.setRequestHeader("api-key", apikey);
            request.setRequestHeader("Content-Type", "application/json");
            request.setRequestHeader("Accept", "application/json; odata.metadata=none");
        },
        type: "GET",
        success: function (data) {
            $("#detailsResNameAndType").html(data["RESNAME"] + " (" + data["ResType"] + ")");
            $("#detailsAddress").html('<label>Address: ' + data["Address"] + ", " + data["City"] + ", " + data["State"] + '</label>');

            $("#detailsCertified").html("Certified: " + data["CertifiedDate"].substring(0, 10));
            $("#detailsLastEdited").html("Last Edited: " + data["Edited"].substring(0, 10));
            var pdfLoc = "http://focus.nps.gov/pdfhost/docs/nrhp/text/" + q + ".pdf";
            $("#detailsLastEdited").html("<a href='" + pdfLoc + "'>Learn more...</a>");
            $("#detailsImages").html("");
            for (var i = 1; i <= data["ImageCount"]; i++)
            {
                $("#detailsImages").append("<img style='width: 100%;height: auto;max-width: 100%;' src='https://azsplayground.blob.core.windows.net/historicsites/img/" + q + "_" + i + ".jpeg'>");
            }

        }
    });
}

function changePage(page, reverse, nrisRefnum)
{
    $.mobile.changePage(page, { transition: 'slide', reverse: reverse });
    if (page == "#pageDetails")
        execLookup(nrisRefnum);

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

// function onDeviceReady() {
    // // Register the event listener
    // if (device.platform == "windows") {
        // // Get the back button working in WP8.1
        // WinJS.Application.onbackclick = function () {
            // onBackKeyDown();
            // return true; // This line is important, without it the app closes.
        // }
    // }
    // else {
        // document.addEventListener("backbutton", onBackKeyDown, false);
    // }
// }

// function onBackKeyDown() {
    // changePage("#homepage", true, false);
// }

function compare(a, b) {
    if (a.facet < b.facet)
        return -1;
    if (a.facet > b.facet)
        return 1;
    return 0;
}

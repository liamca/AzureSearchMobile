# Chapter 5 - Adding a Details Page

In the previous chapter we added faceting and filtering to easily drill into search results based on what we are interested in.  The goal of this next chapter will be to let a user click on a historic site and then see the details of this site.

To start, we will create the HTML code for the details page.  To do this open up the index.html file and update all the content between the lines:<br>
  <!-- jquery mobile page 2 --><br>
	<!-- end page 2 -->

with: 
```html
		<div data-role="page" id="pageDetails">
			<div data-role="header">
                <a href="javascript:void(null);" onclick="changePage('#pageDetails', '#homepage', true, null);" data-icon="grid" data-theme="b" id="backButton">Back</a>
				<h1>Historic US Sites</h1>
			</div>

			<div role="main" class="ui-content">
                    <h3 id="detailsResNameAndType"></h3>
                    <p><b id="moreDetails"></b></p>
                    <ul data-role="listview" data-inset="true" data-divider-theme="a" class="ui-listview ui-listview-inset ui-corner-all ui-shadow">
                        <li data-role="list-divider" role="heading" class="ui-li-divider ui-bar-a ui-first-child">Address</li>
                        <li class="ui-last-child" ><font style="white-space:normal; font-size: small;" id="detailsAddress"></font></li>
                    </ul>
                    <p id="detailsCertified"></p>
                    <p id="detailsLastEdited"></p>
                    <div id="detailsImages"></div>

			</div>
			<!-- end of page 2 content -->

		</div>
````

Next we will add some code to execute a documenent lookup.  To do this add the following code to the search.js file to allow the application to do this lookup query as well as to transition from one page to another.

```html
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

function changePage(fromPage, toPage, reverse, nrisRefnum)
{
	if (fromPage == '#homepage')
	{
		$.mobile.changePage(toPage, { transition: 'slide', reverse: reverse });
        execLookup(nrisRefnum);
	} else {
		$.mobile.changePage(toPage, { transition: 'slide', reverse: reverse });
		//navigator.app.backHistory();
	}

}


```

Build and run the emulation of this app using the following commands:

<pre><code>cordova build browser
cordova emulate browser
</code></pre>


###[Download the complete code...](https://github.com/liamca/AzureSearchMobile/tree/master/Completed%20Application)

# Chapter 1 - Getting Started

In this chapter we will get our Cordova environment configured as well as to get comfortable with the Azure services that will be used throughout the tutorial

### Azure Search & Azure Blob Storage

The purpose of this tutorial is not to learn how to create an Azure Search Service, so we will be using a pre-created service and Azure Blob storage account that already has all of the data created.  If you are interested in learning more about how an Azure Search service and index are created, please check out the MSDN [documentation here](https://azure.microsoft.com/en-us/documentation/services/search/).

**Testing Azure Search**

Let's try a sample search query against Azure Search using JSFiddle:

<pre><code><a href='http://fiddle.jshell.net/liamca/gkvfLe6s/?index=historicsites&apikey=5E81A6D21EB1A028B5C4F7F80C1A9914&query=api-version=2015-02-28%26search=seattle building' target='_blank'>Search Historic Sites that contain the words 'Seattle Building'</a>
</code></pre>

Feel free to adjust the query search text to other values to get the idea.  In future chapters we will start taking a look at more interesting queries such as facets and filters.

One thing that you might want to notice is the Query ApiKey used.  This key allows you to execute search queries, but unlike the Azure Search admin key, it does not allow you to make updates or changes to the search service.

**Testing Azure Blob Storage**

The images of the Historic Sites are stored outside of Azure Search in Azure Blob Storage since it is a lower cost store and binary content does not need to be used as part of the full text search.

<pre><code><a href = 'https://azsplayground.blob.core.windows.net/historicsites/img/00000003_1.jpeg' target='_blank'>Example Historic Image</a></code></pre>

### Install Apache Cordova

The next thing you will need to do is to install [Apache Cordova](https://cordova.apache.org/#getstarted) along with all the requried components such as Node.js, Apache ANT and Java.  I am not going to document this, sinc there are already a lot of great examples of how to do this, such as [this one for Windows](https://evothings.com/doc/build/cordova-install-windows.html).

Once you have completed the installations, you can check the version you have installed as follows:

<pre><code>node --version<br>
v4.2.1
</code></pre>

At the time of writing this tutorial, I am using Cordova 6.0.0.  

###[Next Chapter - Chapter 2 - Create the Cordova App...](https://github.com/liamca/AzureSearchMobile/tree/master/Chapter%202%20-%20Create%20the%20Cordova%20App)

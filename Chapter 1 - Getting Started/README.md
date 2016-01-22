# Chapter 1 - Getting Started

In this chapter we will get our Cordova environment configured as well as to set up Azure.

### Azure Search & Azure Blob Storage

The purpose of this tutorial is not to learn how to create an Azure Search Service, so we will be using a pre-created service and Azure Blob storage account that already has all of the data created.  If you are interested in learning more about how an Azure Search service and index are created, please check out the MSDN [documentation here](https://azure.microsoft.com/en-us/documentation/services/search/).

**Testing Azure Search**

Let's try a few sample search queries against Azure Search using JSFiddle:

<pre><code><a href='http://fiddle.jshell.net/liamca/gkvfLe6s/?index=historicsites&apikey=5E81A6D21EB1A028B5C4F7F80C1A9914&query=api-version=2015-02-28%26search=seattle'>Search Historic Sites that contain the word 'Seattle'</a>
</code></pre>

### Install Apache Cordova

The first thing you will need to do is to install [Apache Cordova](https://cordova.apache.org/#getstarted) along with all the requried components such as Node.js, Apache ANT and Java.  I am not going to document this, sinc there are already a lot of great examples of how to do this, such as [this one for Windows](https://evothings.com/doc/build/cordova-install-windows.html).

At the time of writing this tutorial, I am using Cordova 4.2.1.  You can check the version you have installed as follows:

<pre><code>node --version<br>
v4.2.1
</code></pre>



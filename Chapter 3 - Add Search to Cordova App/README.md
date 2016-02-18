# Chapter 2 - Create the Cordova Application

To get started from a command console create a directory under c:\demo\AzureSearchCordovaDemo and run the following command from this directory:
<pre><code>C:\demo\AzureSearchCordovaDemo> cordova create c:\demo\AzureSearchCordovaDemo com.AzureSearch.AzureSearchCordovaDemo AzureSearchCordovaDemo
</code></pre>

After running this command you should see the following directories:
<img src="https://raw.githubusercontent.com/liamca/AzureSearchMobile/master/Chapter%202%20-%20Create%20the%20Cordova%20App/create_app.png" width="930" width="299">

<pre><code>cordova platform add windows
cordova-jquery</code></pre>

This will configure the Cordova application to support Windows (and we will add more later), as well as to start leveraging JQuery within the application.  When prompted use the following responses:

<pre><code>Would you like to add jQuery mobile to the current Apache Cordova project? (Y/n) Y
Would you like to add jQuery mobile to the current Apache Cordova project? Yes
What would you like to do now that jQuery is enabled? applyTemplate
Which jQuery mobile template would you like to apply to your Apache Cordova project? multiPage
Would you like to keep the current code?  ...it could get ugly! No
</code></pre>

Once this is complete, the output should look as follows:
<img src="https://raw.githubusercontent.com/liamca/AzureSearchMobile/master/Chapter%202%20-%20Create%20the%20Cordova%20App/configure_app.png" width="1270" width="329">

**Test the App**

Now that we have a very basic Cordova application, let's run it to see what it looks like, using the following commands.  NOTE: (you need to accept any certificate prompts in the emulation step.

In the version of Cordova and JQuery that I am using, there is an issue where the default template crashes after opening.  As a result, to make progress open the file index.js from within \www\js and remove the following code:

<pre><code>var parentElement = document.getElementById(id);
var listeningElement = parentElement.querySelector('.listening');
var receivedElement = parentElement.querySelector('.received');
listeningElement.setAttribute('style', 'display:none;');
receivedElement.setAttribute('style', 'display:block;');
console.log('Received Event: ' + id);
</code></pre>

At this point you can now build and run this app: 

<pre><code>cordova build windows
cordova emulate windows</code></pre>




###[Next Chapter - Chapter 2 - Create the Cordova App...](https://github.com/liamca/AzureSearchMobile/tree/master/Chapter%202%20-%20Create%20the%20Cordova%20App)

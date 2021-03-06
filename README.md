# Azure Search Cross Platform Tutorial

This is a tutorial on how to build a cross platform mobile application using Azure Search and Cordova.  It allows you to build a search enabled mobile application for devices such as iPhone, Android and Windows Phone.

I have split this tutorial into multiple steps to allow you to build out the final application.  The final goal of this tutorial is a mobile application that allows people to search for Historic Sites located in the United States.  Some of the features that will be shown and used in this final application include:

* **Full Text Search** to allow you to find sites that match a users entered text
* **Filtering & Faceting** to allow you to drill into various categories of historic sites
* **PDF Text Extraction** where the text from PDF's related to these historic sites are indexed and searchacble from the application
* **Spelling Mistake, Stemming & Phonetic Search** to allow users to find content even if they mistype or otherwise make small errors in the search 

<table>
<tr><td><b>Main Page</b></td><td><b>Filtering</b></td><td><b>Details Page</b></td></tr>
<tr><td>
<img src="https://raw.githubusercontent.com/liamca/AzureSearchMobile/master/images/HistoricSites1.png" width="240" width="320">
</td><td>
<img src="https://raw.githubusercontent.com/liamca/AzureSearchMobile/master/images/HistoricSites2.png" width="240" width="320">
</td><td>
<img src="https://raw.githubusercontent.com/liamca/AzureSearchMobile/master/images/HistoricSites3.png" width="240" width="320">
</td></tr>
</table>


## Technologies Used

There are three main technologies used to build out this application which include:
* **<a href="https://cordova.apache.org/">Apache Cordova</a>** which is the technology used to create the cross platform JavaScript application
* **<a href="https://azure.microsoft.com/en-us/services/search/">Azure Search</a>** which is the full text search service that contains the details on the Historic Sites and is where the application executes its search
* **<a href="https://azure.microsoft.com/en-us/services/storage/">Azure Blob Storage</a>** contains the images used within the application

## Chapters
[**Chapter 1 - Getting Started**](https://github.com/liamca/AzureSearchMobile/tree/master/Chapter%201%20-%20Getting%20Started)

[**Chapter 2 - Building the Cordova App**](https://github.com/liamca/AzureSearchMobile/tree/master/Chapter%202%20-%20Create%20the%20Cordova%20App)

[**Chapter 3 - Adding Search to the Cordova Application**](https://github.com/liamca/AzureSearchMobile/tree/master/Chapter%203%20-%20Add%20Search%20to%20Cordova%20App)

[**Chapter 4 - Adding Filtering**](https://github.com/liamca/AzureSearchMobile/tree/master/Chapter%204%20-%20Adding%20Filtering)

[**Chapter 5 - Adding a Details Page**](https://github.com/liamca/AzureSearchMobile/tree/master/Chapter%205%20-%20Adding%20a%20Details%20Page)

[**Completed Application**](https://github.com/liamca/AzureSearchMobile/tree/master/Completed%20Application)

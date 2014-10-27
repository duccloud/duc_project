import os
import datetime
from pymongo import Connection

def initDatabaseConnection():
	c = Connection()
	database = c.website_crawler 
	siteModels = database.site_items
	return siteModels, database

def isSiteModelIsExisting(sModels, siteLink):
	return sModels.find_one({'href': siteLink}) is not None

def checkHrefIsDownloadFile(linkDownload):	
	fileName, extensionLink  = os.path.splitext(linkDownload)
	return extensionLink == ".zip"

def insertSiteModel(sModels, name, hrefs, cover, source, typeSite):
	if not isSiteModelIsExisting(sModels, hrefs):
		model = {
			"name": name, 
			"cover": cover, 
			"href": hrefs, 
			"type": typeSite,
			"source": source,
			"createdAt": datetime.datetime.utcnow(),
			"updatedAt": datetime.datetime.utcnow()
		}		

		idModel = sModels.insert(model)	
		print idModel

def insertWPSiteModel(sModels, name, hrefs, cover, source):
	insertSiteModel(sModels, name, hrefs, cover, source, "wordpress");
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

def insertSideMode(sModels, name, href, cover, source):
	if not isSiteModelIsExisting(sModels, href):
		model = {
			"name": name, 
			"cover": cover, 
			"href": href, 
			"source": source,
			"createdAt": datetime.datetime.utcnow(),
			"updatedAt": datetime.datetime.utcnow()
		}		

		idModel = sModels.insert(model)	
		print idModel
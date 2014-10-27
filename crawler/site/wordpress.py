import urlparse
import urllib
import os
from bs4 import BeautifulSoup
import sys

sys.path.insert(0, os.path.join(os.path.dirname(os.path.abspath(__file__)), ".."))
import process

def craw(siteModels, db):	
	url = "https://wordpress.org/themes/"
	
	try:
		htmlText = urllib.urlopen(url).read()
	except:
		print url

	soup = BeautifulSoup(htmlText)

	for tag in soup.findAll("div"):

		#check main content
		if tag.get('class') is not None and "block-content" in tag.get('class'):
			nameItem = tag.h4.a.string

			for tagA in tag.find_all('a', href=True):					
				if process.checkHrefIsDownloadFile(tagA['href']):
					hrefItem = urlparse.urljoin(url, tagA['href'])

			if str(hrefItem) > 0:
				coverItem = urlparse.urljoin(url, tag.img['src'])
									
				process.insertWPSiteModel(siteModels, nameItem, [hrefItem], coverItem, 'wordpress')
				
		#craw right column
		if tag.get('class') is not None and "col-3" in tag.get('class'):
			for li in tag.find_all('li'):
				if str(li.a['href']) > 0:

					try:
						htmlText = urllib.urlopen(li.a['href']).read()
					except:
						print li.a['href']

					soupChild = BeautifulSoup(htmlText)

					#get cover
					for img in soupChild.find_all('img', 'screenshot'):
						coverItem = img['src']

					#get link
					for tagCol3 in soupChild.find_all('div', 'col-3'):							
						if process.checkHrefIsDownloadFile(tagCol3.a['href']):
							hrefItem = urlparse.urljoin(url, tagCol3.a['href'])

					#get name
					h2 = soupChild.find('div', id="plugin-title").h2
					nameItem = h2.string

					if str(hrefItem) > 0:
						process.insertWPSiteModel(siteModels, nameItem, [hrefItem], coverItem, 'wordpress')
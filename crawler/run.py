import process
import os
import sys
sys.path.insert(0, os.path.join(os.path.dirname(os.path.abspath(__file__)), "site"))

import wordpress as wp

siteModels, db = process.initDatabaseConnection()

print 'Running...'
wp.craw(siteModels, db)
print 'Done'
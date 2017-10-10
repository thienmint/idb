# eSportGuru

#
# Include Files
#

import MySQLdb

from igdb_scraper import scrape_games
from pandascore_scraper import scrape_data

#
# Public Function Definitions
#

if __name__ == "__main__" :
	db = MySQLdb.connect(host="db.esportguru.com", 
											 user="persia", 
											 passwd="bigboss",
											 db="devDB")

	cur = db.cursor()

	cur.execute("describe GAME")

	for row in cur.fetchall() : 
		print (row[0])

	db.close()
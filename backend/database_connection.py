# eSportGuru

#
# Include Files
#

import MySQLdb

from igdb_scraper import scrape_games
from pandascore_scraper import scrape_data

#
# Global Variables - Query Statements
#

INSERT_GAME = "INSERT INTO GAME(id, name, summary, release_date, website, screenshots) VALUES (%s, %s, %s, %s, %s, %s)"

#
# Public Function Definitions
#

if __name__ == "__main__" :
	db = MySQLdb.connect(host="db.esportguru.com", 
										 user="persia", 
										 passwd="bigboss",
										 db="devDB")
	cur = db.cursor()

	# Make sure character set is utf8
	db.set_character_set('utf8')
	cur.execute('SET NAMES utf8;')
	cur.execute('SET CHARACTER SET utf8;')
	cur.execute('SET character_set_connection=utf8;')

	# Mine GAME data from IGDB
	cur.execute("describe GAME")
	games = scrape_games()
	for g in games :
		try:
			cur.execute(INSERT_GAME, (g.g_id, g.name, g.summary, g.release_date, 
															 g.websites, g.screenshots))
			print ("Succeeded in adding " + g.name)
			db.commit()
		except Exception as e:
			db.rollback()
			print ("Could not insert " + g.name + " into db.")
			print (e)
			print ()


	cur.execute("SELECT * FROM GAME")

	db.close()
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

INSERT_PLAYER = """INSERT INTO PLAYER
									 VALUES ({}, {}, {}, {}, {}, {}, {}, {}, {})"""

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

	# Get scraped data
	# players = []
	# for x in range(0, 20) :
	# 	players += scrape_data("players")

	# cur.execute("describe PLAYER")
	# for p in players :
	# 	cur.execute(INSERT_PLAYER.format(p.id, p.name, p.first_name, p.last_name,
	# 																	 p.role, p.hometown, p.image_url,
	# 																	 p.current_team_id, p.current_videogame))
	cur.execute("describe GAME")
	games = scrape_games()
	for g in games :
		try:
			cur.execute(INSERT_GAME, (g.g_id, g.name, g.summary, g.release_date, 
															 g.websites, g.screenshots))
			db.commit()
		except:
			db.rollback()
			print ("Could not insert " + g.name + " into db.")


	cur.execute("SELECT * FROM GAME")

	db.close()
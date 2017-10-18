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
INSERT_PLAYER = "INSERT INTO PLAYER(id, tag, first_name, last_name, role, hometown, image_url, current_team, current_game) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s)"
INSERT_TEAM = "INSERT INTO TEAM(id, name, acronym, image_url, current_players, current_game) VALUES (%s, %s, %s, %s, %s, %s)"

#
# Public Function Definitions
#

def scrape_games (db, cur):
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

def scrape_players (db, cur):
	# Mine GAME data from IGDB
	cur.execute("describe PLAYER")
	result = cur.fetchall()
	for row in result :
		print (row[0] + '\t' + row[1])

	players = []
	for page in range(0, 100):
		players += scrape_data("players", page)

	for p in players :
		try:
			cur.execute(INSERT_PLAYER, (p.id, p.name, p.first_name, p.last_name,
																	p.role, p.hometown, p.image_url,
																	p.current_team, p.current_videogame))
			print ("Succeeded in adding " + p.name)
			db.commit()
			
		except Exception as e:
			db.rollback()
			print ("Could not insert " + p.name)
			print (e)
			print ()

def scrape_teams (db, cur):
	# Mine GAME data from IGDB
	cur.execute("describe TEAM")
	result = cur.fetchall()
	for row in result :
		print (row[0] + '\t' + row[1])

	teams = []
	for page in range(0, 100):
		teams += scrape_data("teams", page)

	for t in teams :
		try:
			cur.execute(INSERT_TEAM, (t.t_id, t.name, t.acronym, t.image_url, 
															  t.player_ids, t.current_videogame))
			print ("Succeeded in adding " + str(t.t_id))
			db.commit()

		except Exception as e:
			db.rollback()
			print ("Could not insert " + t.name)
			print (e)
			print ()

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

	cur.execute('SET FOREIGN_KEY_CHECKS=0')

	scrape_teams(db, cur)

	cur.execute('SET FOREIGN_KEY_CHECKS=1')

	db.close()

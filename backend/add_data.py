# eSportGuru

#
# Include Files
#

import pymysql as MySQLdb
import json

#
# Global Variables - Query Statements
#

INSERT_GAME = "INSERT INTO GAME(id, name, summary, release_date, website, screenshots) VALUES (%s, %s, %s, %s, %s, %s)"
INSERT_PLAYER = "INSERT INTO PLAYER(id, tag, first_name, last_name, role, hometown, image_url, current_team, current_game) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s)"
INSERT_TEAM = "INSERT INTO TEAM(id, name, acronym, image_url, current_players, current_game) VALUES (%s, %s, %s, %s, %s, %s)"
INSERT_TOURNEY = "INSERT INTO TOURNEY(id, name, slug, begin_at, end_at, teams, game) VALUES (%s, %s, %s, %s, %s, %s, %s)"

LEAGUE_URL = "https://upload.wikimedia.org/wikipedia/commons/d/d3/LoL_New_Logo.png"

#
# Public Function Definitions
#

def add_tourney_urls (db, cur):
  query = "UPDATE TOURNEY2 SET league_image = \'{0}\' WHERE game = {1} and league_image is null".format(LEAGUE_URL, 1)
  # query = "UPDATE TOURNEY2 SET league_image = null WHERE league_image = \'1\'"#.format(1, LEAGUE_URL)
  try:
    cur.execute(query)
    db.commit()
  except Exception as e:
    db.rollback()
    print ("Could not update")
    print (e)

if __name__ == "__main__" :
  db = MySQLdb.connect(host="db.esportguru.com", 
                     user="persia", 
                     passwd="bigboss",
                     db="devDB")
  cur = db.cursor()

  # Make sure character set is utf8
  # db.set_character_set('utf8')
  cur.execute('SET NAMES utf8;')
  cur.execute('SET CHARACTER SET utf8;')
  cur.execute('SET character_set_connection=utf8;')

  cur.execute('SET FOREIGN_KEY_CHECKS=0')

  add_tourney_urls(db, cur)

  cur.execute('SET FOREIGN_KEY_CHECKS=1')

  db.close()

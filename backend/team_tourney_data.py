# eSportGuru

#
# Include Files
#

import pymysql as MySQLdb
import json
import re

#
# Query Statements
#

GET_TOURNEY_TEAMS = "SELECT id, teams FROM TOURNEY"
GET_TEAMS = "SELECT id FROM TEAM"
INSERT_TEAMS = "UPDATE TEAM SET tournaments = \'{0}\' WHERE id = {1}"

#
# Public Function Declarations
#


def get_tourney_teams(db, cur):
  cur.execute(GET_TOURNEY_TEAMS)
  result = cur.fetchall()

  tourneys = []
  for row in result:
    tourneys += [{"id": row[0], "teams": json.loads(row[1])}]
    # tourneys["teams"] = re.findall(r'\d+', str(row[1]))

  return tourneys


def find_team_tourneys(tourneys):
  cur.execute(GET_TEAMS)
  result = cur.fetchall()

  teams = []
  for row in result:
    teams += [int(row[0])]

  data = []
  for team in teams:
    tourneys_attended = []
    for tourney in tourneys:
      if str(team) in str(tourney["teams"]):
        tourneys_attended += [tourney["id"]]
    data += [{"id": team, "tournaments": tourneys_attended}]

  return data


def insert_tourneys_to_teams(db, cur, data):
  for tourney_data in data:
    team_id = tourney_data["id"]
    tourney_ids_json = json.dumps(tourney_data["tournaments"])
    query = INSERT_TEAMS.format(tourney_ids_json, team_id)

    try:
      cur.execute(query)
      db.commit()
      print("Successfully added tourney to {0}".format(team_id))
    except Exception as e:
      db.rollback()
      print("Could not add tourney to {0}".format(team_id))
      print(e)

if __name__ == "__main__":
  db = MySQLdb.connect(host="db.esportguru.com",
                       user="persia",
                       passwd="bigboss",
                       db="devDB")
  cur = db.cursor()

  # Make sure character set is utf8
  cur.execute('SET NAMES utf8;')
  cur.execute('SET CHARACTER SET utf8;')
  cur.execute('SET character_set_connection=utf8;')

  cur.execute('SET FOREIGN_KEY_CHECKS=0')

  data = find_team_tourneys(get_tourney_teams(db, cur))
  insert_tourneys_to_teams(db, cur, data)

  cur.execute('SET FOREIGN_KEY_CHECKS=1')

  db.close()

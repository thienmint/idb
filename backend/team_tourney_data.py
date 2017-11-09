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
GET_TEAM_TOURNEYS = "SELECT id, tournaments FROM TEAM"
INSERT_TEAM_TOURNEYS = "INSERT INTO TEAM_TOURNAMENTS (team_id, tournament_id) VALUES ({0}, {1})"

#
# Public Function Declarations
#

# Fetching data from tourney to put into teams


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


# Putting team-tourney data into join table
def get_team_tourney_pairs(db, cur):
  cur.execute(GET_TEAM_TOURNEYS)
  result = cur.fetchall()

  team_tourney_pairs = []
  for row in result:
    tourney_list = str(json.loads(row[1]))
    tourney_list = re.findall(r'\d+', tourney_list)
    team_tourney_pairs += [{"id": row[0], "tournaments": tourney_list}]

  return team_tourney_pairs


def insert_into_team_tourney_table(db, cur, team_tourney_pairs):
  for team_tourney in team_tourney_pairs:
    team_id = team_tourney["id"]
    tourneys = team_tourney["tournaments"]

    for tourney_id in tourneys:
      query = INSERT_TEAM_TOURNEYS.format(team_id, tourney_id)
      try:
        cur.execute(query)
        db.commit()
        # print("Successfully added pair {0} {1}".format(team_id, tourney_id))
      except Exception as e:
        db.rollback()
        print("Could not add pair {0} {1}".format(team_id, tourney_id))
        print(e)

  #
  # Main
  #

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

  # Insert team-tourney data
  # data = find_team_tourneys(get_tourney_teams(db, cur))
  # insert_tourneys_to_teams(db, cur, data)

  insert_into_team_tourney_table(db, cur, get_team_tourney_pairs(db, cur))

  cur.execute('SET FOREIGN_KEY_CHECKS=1')

  db.close()

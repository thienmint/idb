# eSportGuru

#
# Include Files
#

import json
import time

from igdb_api_python.igdb import igdb

#
# Typedefs
#

class Game:
	g_id = 0
	name = "null"
	release_date = "null"
	summary = "null"
	websites = []
	screenshots = []

#
# Public Function Definitions
#

def scrape_games() :
	games = []

	gdb = igdb("0b9882f6e66f4a7157102571ea180e80")
	result = gdb.games(
		{
			# 'filters': 
			# {
			# 	'[rating][gt]': 70,
			# },
			'order': 'name:asc',
			'limit': 50,
			'scroll': 1
		})

	r = result
	for x in range(0, 50) :
		games += parse_games(r.body)
		r = gdb.scroll(result)

	return games

def parse_games(data) :
	games = []
	for game in data :
		g = Game()

		g.g_id = game["id"]
		g.name = game["name"]

		if ("first_release_date" in game) :
			date = game["first_release_date"] / 1000
			g.release_date = time.strftime('%Y-%m-%d', time.localtime(date))

		if ("summary" in game) :
			g.summary = game["summary"]

		if ("websites" in game) :
			for k in range(0, len(game["websites"])) :
				g.websites += [game["websites"][k]["url"]]

		if ("screenshots" in game) :
			for k in range(0, len(game["screenshots"])) :
				g.screenshots += [game["screenshots"][k]["url"]]

		g.websites = json.dumps(g.websites)
		g.screenshots = json.dumps(g.screenshots)

		games += [g]

	return games

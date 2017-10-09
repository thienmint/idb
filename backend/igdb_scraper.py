import json
import datetime

from igdb_api_python.igdb import igdb

class Game:
	g_id = 0
	name = "null"
	release_date = "null"
	summary = "null"
	websites = set()
	screenshots = set()

def parse_games(data) :
	games = set()
	for game in data :
		g = Game()

		g.g_id = game["id"]
		g.name = game["name"]

		if ("first_release_date" in game) :
			g.release_date = game["first_release_date"]

		if ("summary" in game)
			g.summary = game["summary"]

		if ("websites" in game) :
			for k in range(0, len(game["websites"])) :
				g.genres.add(game["websites"][k]["url"])

		if ("screenshots" in game) :
			for k in range(0, len(game["screenshots"])) :
				g.genres.add(game["screenshots"][k]["url"])

		games.add(g)

	return games

def scrape() :
	gdb = igdb("0b9882f6e66f4a7157102571ea180e80")
	result = gdb.games(
		{
			'filters': 
			{
				'[rating][gt]': 70,
			},
			'order': 'name:asc',
			'limit': 50
		})

	games = parse_games(result.body)

	# for game in games :
	# 	print ("Retrieved: " + game.name)

scrape()
import requests
import json

API_TOKEN = 'Bearer lfKRr_rlDBE2Fua9xDMe00HTXd-7bWlJ8y4ZJBTtdglCmGnDufs'
BASE_URL = 'https://api.pandascore.co/'

class Player:
	p_id = 0
	name = "null"
	first_name = "null"
	last_name = "null"
	role = "null"
	hometown = "null"
	image_url = "null"
	current_team_id = 0
	current_videogame = "null"

class Team:
	t_id = 0
	name = "null"
	acronym = "null"
	image_url = "null"
	player_ids = set()
	current_videogame = "null"

class Tournaments:
	t_id = 0
	name = "null"
	begin_at = "null"
	end_at = "null"
	videogame = "null"
	team_ids = set()

def parse_players(data) :
	players = set()
	for player in data :
		p = Player()

		p.id = player["id"]
		p.name = player["name"]
		p.first_name = player["first_name"]
		p.last_name = player["last_name"]
		p.hometown = player["hometown"]
		p.role = player["role"]
		p.current_team = (player["current_team"]["id"] 
							if player["current_team"] != None else None)
		p.current_videogame = (player["current_videogame"]["name"] 
								if player["current_videogame"] != None else None)

		players.add(p)

	return players

def parse_teams(data) :
	teams = set()
	for team in data :
		p = Team()

		p.t_id = team["id"]
		p.name = team["name"]
		p.acronym = team["acronym"]
		p.image_url = team["image_url"]
		p.current_videogame = team["current_videogame"]

		for k in range(0, len(team["players"])) :
			p.player_ids.add(team["players"][k]["id"])

		teams.add(p)

	return teams

def parse_tournaments(data) :
	
	tourneys = set()
	for tourney in data :
		p = Tournaments()

		p.t_id = tourney["id"]
		p.name = tourney["name"]
		p.begin_at = tourney["begin_at"]
		p.end_at = tourney["end_at"]
		p.videogame = tourney["videogame"]["name"]

		for k in range(0, len(tourney["teams"])) :
			p.team_ids.add(tourney["teams"][k]["id"])

		tourneys.add(p)

	return tourneys

# api_request is the additional url params for the api call
def scrape_data (class_name) :
	global API_TOKEN, BASE_URL
	session = requests.Session()
	response = session.get(BASE_URL, headers={'Authorization': API_TOKEN})

	if (response.status_code == requests.codes.ok) :
		response = session.get(BASE_URL + class_name + '/', 
							   headers={'Authorization': API_TOKEN})

		if (response.status_code == requests.codes.ok) :
			data = json.loads(response.text)

			if class_name == 'players' :
				players = parse_players(data)
				print(next(iter(players)).name)

			elif class_name == 'teams' :
				teams = parse_teams(data)
				print(next(iter(teams)).name)

			elif class_name == 'tournaments' :
				tourneys = parse_tournaments(data)
				print(next(iter(tourneys)).name)

			# elif class_name == 'games' :
			# 	games = parse_games(data)
			# 	print(games[0].name)

		else :
			raise Exception ('Could not get data from ' + api_request)
	else :
		raise Exception ('Could not authorize PandaScore API token!')

scrape_data('players')
scrape_data('teams')
scrape_data('tournaments')
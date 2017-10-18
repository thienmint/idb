# eSportGuru

#
# Include Files
#

import requests
import json

# Global Variables

API_TOKEN = 'Bearer lfKRr_rlDBE2Fua9xDMe00HTXd-7bWlJ8y4ZJBTtdglCmGnDufs'
BASE_URL = 'https://api.pandascore.co/'

#
# Typedefs
#

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
	player_ids = []
	current_videogame = "null"

class Tournaments:
	t_id = 0
	name = "null"
	slug = "null"
	begin_at = "null"
	end_at = "null"
	videogame = "null"
	team_ids = []

#
# Public Function Definitions
#

# api_request is the additional url params for the api call
def scrape_data (class_name, page=0) :
	global API_TOKEN, BASE_URL
	session = requests.Session()
	response = session.get(BASE_URL, headers={'Authorization': API_TOKEN})

	if (response.status_code == requests.codes.ok) :
		response = session.get(BASE_URL + class_name + '/?page=' + str(page), 
							   headers={'Authorization': API_TOKEN})

		if (response.status_code == requests.codes.ok) :
			data = json.loads(response.text)

			if class_name == 'players' :
				return parse_players(data)

			elif class_name == 'teams' :
				return parse_teams(data)

			elif class_name == 'tournaments' :
				return parse_tournaments(data)

			else :
				raise Exception ('Could not get data from ' + api_request)
		else :
			raise Exception ('Could not authorize PandaScore API token!')

def parse_players(data) :
	players = []
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

		if (p.current_videogame != None) :
			players += [p]

	return players

def parse_teams(data) :
	teams = []
	for team in data :
		p = Team()

		p.t_id = team["id"]
		p.name = team["name"]
		p.acronym = team["acronym"]
		p.image_url = team["image_url"]
		p.current_videogame = (team["current_videogame"]["id"] 
								if team["current_videogame"] != None else None)

		for k in range(0, max(0, len(team["players"]))) :
			p.player_ids += [team["players"][k]["id"]]

		if (p.current_videogame != None) :
			p.player_ids = json.dumps(p.player_ids)
			teams += [p]

	return teams

def parse_tournaments(data) :
	tourneys = []
	for tourney in data :
		p = Tournaments()

		p.t_id = tourney["id"]
		p.name = tourney["name"]
		p.slug = tourney["slug"]
		p.begin_at = (tourney["begin_at"][:10]
						if tourney["begin_at"] != None else None)
		p.end_at = (tourney["end_at"][:10]
						if tourney["end_at"] != None else None)
		p.videogame = (tourney["videogame"]["id"] 
								if tourney["videogame"] != None else None)

		for k in range(0, max(0, len(tourney["teams"]))) :
			p.team_ids += [tourney["teams"][k]["id"]]

		if (p.videogame != None) :
			p.team_ids = str(json.dumps(p.team_ids))
			#print(p.team_ids)
			tourneys += [p]

	return tourneys
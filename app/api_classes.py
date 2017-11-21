from collections import OrderedDict
import json


class Helper:
    def __init__(self):
        pass

    @staticmethod
    def process_players(players_row):
        if players_row is not None:
            json_players = json.loads(players_row)
            return [OrderedDict([('id', player['id']), ('tag', player['tag'])]) for player in json_players]
        else:
            return list()

    @staticmethod
    def process_teams(teams_row):
        if teams_row is not None:
            json_teams = json.loads(teams_row)
            return [OrderedDict([('id', team['id']), ('name', team['name'])]) for team in json_teams]
        else:
            return list()


class GameInstance:
    def __init__(self, row):
        self.row = row

    def get_dict(self, search=False):
        row = self.row
        game = OrderedDict()
        game['id'] = row['id']
        game['name'] = row['name']
        game['summary'] = row['summary']
        game['release_date'] = str(row['release_date'])
        if search:
            game['sample_players'] = row['list_players']
            game['sample_teams'] = row['list_teams']
        else:
            game['website'] = json.loads(row['website'])
            game['screenshots'] = json.loads(row['screenshots'])
            game['sample_players'] = Helper.process_players(row['list_players'])
            game['sample_teams'] = Helper.process_teams(row['list_teams'])

        return game


class PlayerInstance:
    def __init__(self, row):
        self.row = row

    def get_dict(self):
        row = self.row
        player = OrderedDict()

        team = {
            "id": row['current_team'],
            "name": row['team_name']
        }

        game = {
            "id": row['current_game'],
            "name": row['game_name']
        }

        player['id'] = row['id']
        player['tag'] = row['tag']
        player['first_name'] = row['first_name']
        player['last_name'] = row['last_name']
        player['role'] = row['role']
        player['hometown'] = row['hometown']
        player['image_url'] = row['image_url']
        player['current_team'] = team
        player['current_game'] = game
        return player


class TeamInstance:
    def __init__(self, row):
        self.row = row

    def get_dict(self):
        row = self.row
        team = OrderedDict()
        list_players = Helper.process_players(row['list_players'])

        game = {
            "id": row['current_game'],
            "name": row['game_name']
        }

        team['id'] = row['id']
        team['name'] = row['name']
        team['acronym'] = row['acronym']
        team['image_url'] = row['image_url']
        team['current_players'] = list_players
        team['current_game'] = game

        return team


class TourneyInstance:
    def __init__(self, row):
        self.row = row

    def get_dict(self):
        row = self.row
        tourney = OrderedDict()

        game = {
            "id": row['game'],
            "name": row['game_name']
        }

        tourney['id'] = row['id']
        tourney['name'] = row['name']
        tourney['slug'] = row['slug']
        tourney['begin_at'] = row['begin_at']
        tourney['end_at'] = row['end_at']
        tourney['game'] = game
        tourney['teams'] = json.loads(row['list_teams'])
        tourney['league'] = row['league']
        tourney['image_url'] = row['league_image']

        return tourney

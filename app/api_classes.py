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


    @staticmethod
    def form_regex(search_str):
        if search_str == "":
            return None

        return search_str.replace(" ", "|")


class GameInstance:
    def __init__(self, row=None):
        self.row = row

    def get_dict(self, search=False, input_row=None):
        row = self.row if input_row is None else input_row
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
    def __init__(self, row=None):
        self.row = row

    def get_dict(self, search=False, input_row=None):
        row = self.row if input_row is None else input_row
        player = OrderedDict()

        player['id'] = row['id']
        player['tag'] = row['tag']
        player['first_name'] = row['first_name']
        player['last_name'] = row['last_name']
        player['role'] = row['role']
        player['hometown'] = row['hometown']
        if search:
            player['current_game'] = row['game_name']
            player['current_team'] = row['team_name']
        else:
            player['image_url'] = row['image_url']
            player['current_team'] = {
                "id": row['current_team'],
                "name": row['team_name']
            }
            player['current_game'] = {
                "id": row['current_game'],
                "name": row['game_name']
            }

        return player


class TeamInstance:
    def __init__(self, row=None):
        self.row = row

    def get_dict(self, search=False, input_row=None):
        row = self.row if input_row is None else input_row
        team = OrderedDict()
        team['id'] = row['id']
        team['name'] = row['name']
        team['acronym'] = row['acronym']

        if search:
            team['current_players'] = row['players_name']
            team['current_game'] = row['game_name']
        else:
            team['image_url'] = row['image_url']
            team['current_players'] = Helper.process_players(row['list_players'])
            team['current_game'] = {
                "id": row['current_game'],
                "name": row['game_name']
            }

        return team


class TourneyInstance:
    def __init__(self, row=None):
        self.row = row

    def get_dict(self, search=False, input_row=None):
        row = self.row if input_row is None else input_row
        tourney = OrderedDict()

        tourney['id'] = row['id']
        tourney['name'] = row['name']
        tourney['slug'] = row['slug']
        tourney['begin_at'] = row['begin_at']
        tourney['end_at'] = row['end_at']
        if search:
            tourney['game'] = row['game_name']
            tourney['teams'] = row['team_names']
        else:
            tourney['game'] = {
                "id": row['game'],
                "name": row['game_name']
            }
            tourney['teams'] = json.loads(row['list_teams'])
            tourney['league'] = row['league']
            tourney['image_url'] = row['league_image']

        return tourney

from collections import OrderedDict
import json


class GameInstance:
    def __init__(self, row):
        self.row = row

    def get_dict(self):
        game = OrderedDict()
        game['id'] = self.row['id']
        game['name'] = self.row['name']
        game['summary'] = self.row['summary']
        game['release_date'] = str(self.row['release_date'])
        game['website'] = json.loads(self.row['website'])
        game['screenshots'] = json.loads(self.row['screenshots'])
        game['sample_players'] = GameInstance.process_players(self.row['list_players'])
        game['sample_teams'] = GameInstance.process_teams(self.row['list_teams'])
        return game

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


class PlayerInstance:
    def __init__(self):
        pass


class TeamInstance:
    def __init__(self):
        pass


class TourneyInstance:
    def __init__(self):
        pass

from flask import Flask, request, render_template, redirect, Markup
from flask_restful import Resource, Api
from flask_cors import CORS, cross_origin
# from flaskext.markdown import Markdown
from sqlalchemy import create_engine
import MySQLdb
from json import dumps
from flask_jsonpify import jsonify
from collections import OrderedDict
import os
import json
import random
# import markdown

# API Formatter classes
from api_classes import Helper, GameInstance, PlayerInstance, TeamInstance, TourneyInstance

# Queries
from api_queries import game_query, player_query, team_query, tourney_query
from search_queries import search_game, search_player, search_team, search_tourney


'=====================START CONFIGURATION====================='

engine = create_engine(
    'mysql://{0}:{1}@{2}:3306/{3}?charset=utf8'.format(
        os.environ['DB_USER'],
        os.environ['DB_PASS'],
        os.environ['DB_HOST'],
        os.environ['DB_NAME']))

app = Flask(__name__, static_url_path='/static')
# Markdown(app)
app.config["JSON_SORT_KEYS"] = False
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Access-Control-Allow-Origin'
api = Api(app)

'=====================END CONFIGURATION====================='
'=====================START UI ROUTING====================='


@app.route('/')
@cross_origin()
def home():
    return render_template('api.html')


@app.errorhandler(404)
def page_not_found(e):
    return "What are you looking for m8?"


'=====================END UI ROUTING====================='
'=====================START API====================='


class Players(Resource):
    def get(self):
        conn = engine.connect()
        query = conn.execute(player_query())
        list_players = []
        for row in query:
            player = PlayerInstance(row).get_dict()
            list_players.append(player)
        conn.close()
        return jsonify(list_players)


class Player(Resource):
    def get(self, player_id):
        conn = engine.connect()
        query = conn.execute(player_query(player_id))
        row = query.fetchone()
        player = PlayerInstance(row).get_dict()
        conn.close()
        return jsonify(player)


class Teams(Resource):
    def get(self):
        conn = engine.connect()
        conn.execute("set @@session.group_concat_max_len=4294967295")
        query = conn.execute(team_query())
        list_teams = []
        for row in query:
            team = TeamInstance(row).get_dict()
            list_teams.append(team)
        conn.close()
        return jsonify(list_teams)


class Team(Resource):
    def get(self, team_id):
        conn = engine.connect()
        conn.execute("set @@session.group_concat_max_len=4294967295")
        query = conn.execute(team_query(team_id))
        row = query.fetchone()
        team = TeamInstance(row).get_dict()
        conn.close()
        return jsonify(team)


class Tourneys(Resource):
    def get(self):
        conn = engine.connect()
        query = conn.execute(tourney_query())
        list_tourneys = []
        for row in query:
            tourney = TourneyInstance(row).get_dict()
            list_tourneys.append(tourney)

        conn.close()
        return jsonify(list_tourneys)


class Tourney(Resource):
    def get(self, tourney_id):
        conn = engine.connect()
        _ = conn.execute("set @@session.group_concat_max_len=18446744073709551615")

        query = conn.execute(tourney_query(tourney_id))
        row = query.fetchone()
        tourney = TourneyInstance(row).get_dict()
        conn.close()
        return jsonify(tourney)


class Games(Resource):
    def get(self):
        conn = engine.connect()
        _ = conn.execute("set @@session.group_concat_max_len=18446744073709551615")

        query = conn.execute(game_query())
        list_games = []
        for row in query:
            list_games.append(GameInstance(row).get_dict())
        conn.close()
        return jsonify(list_games)


class Game(Resource):
    def get(self, game_id):
        conn = engine.connect()
        _ = conn.execute("set @@session.group_concat_max_len=18446744073709551615")
        query = conn.execute(game_query(game_id))
        row = query.fetchone()
        conn.close()
        return jsonify(GameInstance(row).get_dict())


class Search(Resource):
    def get(self, search_str):
        search_str = Helper.form_regex(search_str)
        if search_str is None:
            return jsonify(["Please enter at least one keyword."])

        search_results = OrderedDict()
        conn = engine.connect()

        _ = conn.execute("set @@session.group_concat_max_len=18446744073709551615")

        game_results = conn.execute(search_game(search_str))
        player_results = conn.execute(search_player(search_str))
        team_results = conn.execute(search_team(search_str))
        tourney_results = conn.execute(search_tourney(search_str))

        game_data = []
        player_data = []
        team_data = []
        tourney_data = []

        game_formatter = GameInstance()
        player_formatter = PlayerInstance()
        team_formatter = TeamInstance()
        tourney_formatter = TourneyInstance()

        for row in game_results:
            game_data.append(game_formatter.get_dict(search=True, input_row=row))

        for row in player_results:
            player_data.append(player_formatter.get_dict(search=True, input_row=row))

        for row in team_results:
            team_data.append(team_formatter.get_dict(search=True, input_row=row))

        for row in tourney_results:
            tourney_data.append(tourney_formatter.get_dict(search=True, input_row=row))

        search_results['games'] = game_data
        search_results['players'] = player_data
        search_results['teams'] = team_data
        search_results['tournaments'] = tourney_data

        return jsonify(search_results)

api.add_resource(Players, '/players', '/players/')
api.add_resource(Player, '/players/<player_id>')

api.add_resource(Teams, '/teams', '/teams/')
api.add_resource(Team, '/teams/<team_id>')

api.add_resource(Tourneys, '/tournaments', '/tournaments/')
api.add_resource(Tourney, '/tournaments/<tourney_id>')

api.add_resource(Games, '/games', '/games/')
api.add_resource(Game, '/games/<game_id>')

api.add_resource(Search, '/search/<search_str>')

'=====================END API====================='

if __name__ == '__main__':
    app.run()

from flask import Flask, request, render_template
from flask_restful import Resource, Api
from sqlalchemy import create_engine
import MySQLdb
from json import dumps
from flask_jsonpify import jsonify
from collections import OrderedDict
import os

'=====================START CONFIGURATION====================='

engine = create_engine(
    'mysql://{0}:{1}@{2}:3306/{3}?charset=utf8'.format(
        os.environ['DB_USER'],
        os.environ['DB_PASS'],
        os.environ['DB_HOST'],
        os.environ['DB_NAME']))

app = Flask(__name__)
app.config["JSON_SORT_KEYS"] = False
api = Api(app)

'=====================END CONFIGURATION====================='
'=====================START UI ROUTING====================='


@app.route('/')
def hello_world():
    return render_template('api.html')

@app.errorhandler(404)
def page_not_found(e):
    return "What are you looking for m8?"

'=====================END UI ROUTING====================='
'=====================START API====================='


class Players(Resource):
    def get(self):
        conn = engine.connect()
        query = conn.execute("select * from PLAYER")
        list_players = []
        for row in query:
            player = OrderedDict()
            player['id'] = row['id']
            player['tag'] = row['tag']
            player['first_name'] = row['first_name']
            player['last_name'] = row['last_name']
            player['role'] = row['role']
            player['hometown'] = row['hometown']
            player['image_url'] = row['image_url']
            player['current_team'] = row['current_team']
            player['current_game'] = row['current_game']
            list_players.append(player)
        conn.close()
        return jsonify(list_players)


class Player(Resource):
    def get(self, player_id):
        conn = engine.connect()
        query = conn.execute("select * from PLAYER where id=%d" % int(player_id))
        player = OrderedDict()
        row = query.fetchone()
        player['id'] = row['id']
        player['tag'] = row['tag']
        player['first_name'] = row['first_name']
        player['last_name'] = row['last_name']
        player['role'] = row['role']
        player['hometown'] = row['hometown']
        player['image_url'] = row['image_url']
        player['current_team'] = row['current_team']
        player['current_game'] = row['current_game']
        conn.close()
        return jsonify(player)


class Teams(Resource):
    def get(self):
        conn = engine.connect()
        query = conn.execute(
            """
              select t.id, t.name, t.acronym, t.image_url, t.current_game, 
                     g.name as game_name
              from TEAM t
              join GAME g on g.id = t.current_game
            """
        )
        list_teams = []
        for row in query:
            team = OrderedDict()

            players_query = conn.execute("select id, tag from PLAYER where current_team = %d" % int(row['id']))
            list_players = []
            for player_row in players_query:
                player = OrderedDict()
                player['id'] = player_row['id']
                player['tag'] = player_row['tag']
                list_players.append(player)

            game = {
                "id": row['current_game'],
                "name": row['game_name']
            }

            team['id'] = row['id']
            team['name'] = row['name']
            team['acronym'] = row['acronym']
            team['image_url'] = row['image_url']
            # team['current_players'] = row['current_players']
            team['current_players'] = list_players
            # team['current_game'] = row['current_game']
            team['current_game'] = game
            list_teams.append(team)
        conn.close()
        return jsonify(list_teams)


class Team(Resource):
    def get(self, team_id):
        conn = engine.connect()
        query = conn.execute(
            """
              select t.id, t.name, t.acronym, t.image_url, t.current_game, 
                     g.name as game_name
              from TEAM t
              join GAME g on g.id = t.current_game
              where t.id=%d
            """ % int(team_id)
        )
        row = query.fetchone()

        players_query = conn.execute("select id, tag from PLAYER where current_team = %d" % int(row['id']))
        list_players = []
        for player_row in players_query:
            player = OrderedDict()
            player['id'] = player_row['id']
            player['tag'] = player_row['tag']
            list_players.append(player)

        game = {
            "id": row['current_game'],
            "name": row['game_name']
        }

        team = OrderedDict()
        team['id'] = row['id']
        team['name'] = row['name']
        team['acronym'] = row['acronym']
        team['image_url'] = row['image_url']
        # team['current_players'] = row['current_players']
        team['current_players'] = list_players
        team['current_game'] = game
        conn.close()
        return jsonify(team)


class Tourneys(Resource):
    def get(self):
        conn = engine.connect()
        query = conn.execute("select * from TOURNEY")
        list_tourneys = []
        for row in query:
            tourney = OrderedDict()
            tourney['id'] = row['id']
            tourney['name'] = row['name']
            tourney['slug'] = row['slug']
            tourney['begin_at'] = row['begin_at']
            tourney['end_at'] = row['end_at']
            tourney['game'] = row['game']
            tourney['teams'] = row['teams']
            list_tourneys.append(tourney)
        conn.close()
        return jsonify(list_tourneys)


class Tourney(Resource):
    def get(self, tourney_id):
        conn = engine.connect()
        query = conn.execute("select * from TOURNEY where id=%d" % int(tourney_id))
        row = query.fetchone()
        tourney = OrderedDict()
        tourney['id'] = row['id']
        tourney['name'] = row['name']
        tourney['slug'] = row['slug']
        tourney['begin_at'] = row['begin_at']
        tourney['end_at'] = row['end_at']
        tourney['game'] = row['game']
        tourney['teams'] = row['teams']
        conn.close()
        return jsonify(tourney)


class Games(Resource):
    def get(self):
        conn = engine.connect()
        query = conn.execute("select * from GAME")
        list_games = []
        for row in query:
            game = OrderedDict()
            game['id'] = row['id']
            game['name'] = row['name']
            game['summary'] = row['summary']
            game['release_date'] = str(row['release_date'])
            game['website'] = row['website']
            game['screenshots'] = row['screenshots']
            list_games.append(game)
        conn.close()
        return jsonify(list_games)


class Game(Resource):
    def get(self, game_id):
        conn = engine.connect()
        query = conn.execute("select * from GAME where id=%d" % int(game_id))
        row = query.fetchone()
        game = OrderedDict()
        game['id'] = row['id']
        game['name'] = row['name']
        game['summary'] = row['summary']
        game['release_date'] = str(row['release_date'])
        game['website'] = row['website']
        game['screenshots'] = row['screenshots']
        conn.close()
        return jsonify(game)

api.add_resource(Players, '/players')
api.add_resource(Player, '/players/<player_id>')

api.add_resource(Teams, '/teams')
api.add_resource(Team, '/teams/<team_id>')

api.add_resource(Tourneys, '/tournaments')
api.add_resource(Tourney, '/tournaments/<tourney_id>')

api.add_resource(Games, '/games')
api.add_resource(Game, '/games/<game_id>')

'=====================END API====================='


if __name__ == '__main__':
    app.run()

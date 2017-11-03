from flask import Flask, request, render_template, redirect
from flask_restful import Resource, Api
from flask_cors import CORS, cross_origin
from sqlalchemy import create_engine
import MySQLdb
from json import dumps
from flask_jsonpify import jsonify
from collections import OrderedDict
import os
import json
import random

'=====================START CONFIGURATION====================='

engine = create_engine(
    'mysql://{0}:{1}@{2}:3306/{3}?charset=utf8'.format(
        "persia",
        "bigboss",
        "db.esportguru.com",
        "devDB"))

app = Flask(__name__)
app.config["JSON_SORT_KEYS"] = False
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Access-Control-Allow-Origin'
api = Api(app)

'=====================END CONFIGURATION====================='
'=====================START UI ROUTING====================='


@app.route('/')
@cross_origin()
def hello_world():
    return render_template('api.html')

@app.errorhandler(404)
def page_not_found(e):
    return "What are you looking for m8?"

'=====================END UI ROUTING====================='
'=====================START API QUERIES====================='


def player_query(player_id=None):
    query = (
        """
            select p.id, p.tag, p.first_name, p.last_name, p.role, p.hometown, p.image_url, 
                   p.current_game, p.current_team,
                   g.name as game_name, t.name as team_name
            from PLAYER p
            join GAME g on g.id = p.current_game
            join TEAM t on t.id = p.current_team
            {0}
            """.format("where p.id = %d" % int(player_id) if player_id is not None else "")
    )

    return query


def team_query(team_id=None):
    query = (
        """
          select t.id, t.name, t.acronym, t.image_url, t.current_game, 
                 g.name as game_name,
                 pt.list_players
          from TEAM t
          
          join GAME g on g.id = t.current_game
          left join (
            select concat('[', group_concat(json_object("id", p.id, "tag", p.tag)), ']') list_players, p.current_team
            from PLAYER p
            group by p.current_team
          ) pt on pt.current_team = t.id
          {0}
        """.format("where t.id = %d" % int(team_id) if team_id is not None else "")
    )

    return query


def tourney_query(tourney_id = None):
    query = (
        """
          select tn.id, tn.name, tn.slug, tn.begin_at, tn.end_at, tn.game, tn.teams,
                 g.name as game_name
          from TOURNEY tn
          join GAME g on g.id = tn.game
          {0}
          LIMIT 40
        """.format("where tn.id = %d" % int(tourney_id) if tourney_id is not None else "")
    )

    return query


def get_teams_info(list_teams):
    conditions = []
    # TODO: Make this in to list comprehension
    list_teams = random.sample(list_teams, min(len(list_teams), 30))
    for t_id in list_teams:
        t_id = int(t_id)
        conditions.append("t.id=%d" % t_id)

    query = (
        """
            select t.id, t.name
            from TEAM t
            {0}
        """.format(
            "where %s" % (' or '.join(conditions)) if len(conditions) > 0 else '')
        )
    # print(query)
    return query


def game_query(game_id = None):
    query = (
        """
          select g.id, g.name, g.release_date, g.screenshots, g.summary, g.website,
                 pt.list_players, tt.list_teams
          from GAME g
          left join (
            select concat('[', 
            substring_index(
              group_concat(
                json_object("id", p.id, "tag", p.tag)), ',', 20), ']') list_players, p.current_game
            from PLAYER p
            group by p.current_game
          ) pt on pt.current_game = g.id
          left join (
            select concat('[', 
              substring_index(
                group_concat(
                  json_object("id", t.id, "name", t.name)), ',', 20), ']') list_teams, t.current_game
            from TEAM t
            group by t.current_game
          ) tt on tt.current_game = g.id
          {0}
        """.format("where g.id = %d" % int(game_id) if game_id is not None else "")
    )

    return query


def process_players(players_row):
    if players_row is not None:
        json_players = json.loads(players_row)
        return [OrderedDict([('id', player['id']), ('tag', player['tag'])]) for player in json_players]
    else:
        return list()


def process_teams(teams_row):
    if teams_row is not None:
        json_teams = json.loads(teams_row)
        return [OrderedDict([('id', team['id']), ('name', team['name'])]) for team in json_teams]
    else:
        return list()


'=====================END API QUERIES====================='
'=====================START API====================='


class Players(Resource):
    def get(self):
        conn = engine.connect()
        query = conn.execute(player_query())
        list_players = []
        for row in query:
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
            list_players.append(player)
        conn.close()
        return jsonify(list_players)


class Player(Resource):
    def get(self, player_id):
        conn = engine.connect()
        query = conn.execute(player_query(player_id))
        player = OrderedDict()
        row = query.fetchone()

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
        conn.close()
        return jsonify(player)


class Teams(Resource):
    def get(self):
        conn = engine.connect()
        conn.execute("set @@session.group_concat_max_len=4294967295")
        query = conn.execute(team_query())
        list_teams = []
        for row in query:
            team = OrderedDict()
            list_players = process_players(row['list_players'])

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
            list_teams.append(team)
        conn.close()
        return jsonify(list_teams)


class Team(Resource):
    def get(self, team_id):
        conn = engine.connect()
        conn.execute("set @@session.group_concat_max_len=4294967295")
        query = conn.execute(team_query(team_id))
        row = query.fetchone()
        list_players = process_players(row['list_players'])

        game = {
            "id": row['current_game'],
            "name": row['game_name']
        }

        team = OrderedDict()
        team['id'] = row['id']
        team['name'] = row['name']
        team['acronym'] = row['acronym']
        team['image_url'] = row['image_url']
        team['current_players'] = list_players
        team['current_game'] = game
        conn.close()
        return jsonify(team)


class Tourneys(Resource):
    def get(self):
        conn = engine.connect()
        query = conn.execute(tourney_query())
        list_tourneys = []
        for row in query:
            tourney = OrderedDict()

            game = {
                "id": row['game'],
                "name": row['game_name']
            }

            json_teams = json.loads(row['teams'])
            teams = set(json_teams)

            query_2 = conn.execute(get_teams_info(list(teams)))

            list_teams = []
            for team_row in query_2:
                one_team = OrderedDict()
                one_team['id'] = team_row['id']
                one_team['name'] = team_row['name']
                list_teams.append(one_team)

            tourney['id'] = row['id']
            tourney['name'] = row['name']
            tourney['slug'] = row['slug']
            tourney['begin_at'] = row['begin_at']
            tourney['end_at'] = row['end_at']
            tourney['game'] = game
            tourney['teams'] = list_teams
            list_tourneys.append(tourney)
        conn.close()
        return jsonify(list_tourneys)


class Tourney(Resource):
    def get(self, tourney_id):
        conn = engine.connect()
        query = conn.execute(tourney_query(tourney_id))
        row = query.fetchone()
        tourney = OrderedDict()

        game = {
            "id": row['game'],
            "name": row['game_name']
        }

        json_teams = json.loads(row['teams'])
        teams = set(json_teams)

        query_2 = conn.execute(get_teams_info(list(teams)))

        list_teams = []
        for team_row in query_2:
            one_team = OrderedDict()
            one_team['id'] = team_row['id']
            one_team['name'] = team_row['name']
            list_teams.append(one_team)

        tourney['id'] = row['id']
        tourney['name'] = row['name']
        tourney['slug'] = row['slug']
        tourney['begin_at'] = row['begin_at']
        tourney['end_at'] = row['end_at']
        tourney['game'] = game
        tourney['teams'] = list_teams
        conn.close()
        return jsonify(tourney)


class Games(Resource):
    def get(self):
        conn = engine.connect()
        _ = conn.execute("set @@session.group_concat_max_len=18446744073709551615")

        query = conn.execute(game_query())
        list_games = []
        for row in query:
            game = OrderedDict()
            game['id'] = row['id']
            game['name'] = row['name']
            game['summary'] = row['summary']
            game['release_date'] = str(row['release_date'])
            game['website'] = json.loads(row['website'])
            game['screenshots'] = json.loads(row['screenshots'])
            game['sample_players'] = process_players(row['list_players'])
            game['sample_teams'] = process_teams(row['list_teams'])
            list_games.append(game)
        conn.close()
        return jsonify(list_games)


class Game(Resource):
    def get(self, game_id):
        conn = engine.connect()
        _ = conn.execute("set @@session.group_concat_max_len=18446744073709551615")
        query = conn.execute(game_query(game_id))
        row = query.fetchone()
        game = OrderedDict()
        game['id'] = row['id']
        game['name'] = row['name']
        game['summary'] = row['summary']
        game['release_date'] = str(row['release_date'])
        game['website'] = json.loads(row['website'])
        game['screenshots'] = json.loads(row['screenshots'])
        game['sample_players'] = process_players(row['list_players'])
        game['sample_teams'] = process_teams(row['list_teams'])
        conn.close()
        return jsonify(game)

api.add_resource(Players, '/players', '/players/')
api.add_resource(Player, '/players/<player_id>')

api.add_resource(Teams, '/teams', '/teams/')
api.add_resource(Team, '/teams/<team_id>')

api.add_resource(Tourneys, '/tournaments', '/tournaments/')
api.add_resource(Tourney, '/tournaments/<tourney_id>')

api.add_resource(Games, '/games', '/games/')
api.add_resource(Game, '/games/<game_id>')

'=====================END API====================='


if __name__ == '__main__':
    app.run()

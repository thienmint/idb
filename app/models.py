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


def tourney_query(tourney_id=None):
    query = (
        """
          select tn.id, tn.name, tn.slug, tn.begin_at, tn.end_at, tn.game, tn.teams,
                 g.name as game_name
          from TOURNEY tn
          join GAME g on g.id = tn.game
          {0}
        """.format("where tn.id = %d" % int(tourney_id) if tourney_id is not None else "")
    )

    return query


def tourney2_query(tourney_id = None):
    query = (
        """
          select tn.id, tn.name, tn.slug, tn.begin_at, tn.end_at, tn.game, tn.teams,
                 tn.league, tn.league_image, g.name as game_name
          from TOURNEY2 tn
          join GAME g on g.id = tn.game
          {0}
        """.format("where tn.id = %d" % int(tourney_id) if tourney_id is not None else "")
    )

    return query

def tourney2_query(tourney_id = None):
    query = (
        """
          select tn.id, tn.name, tn.slug, tn.begin_at, tn.end_at, tn.game, tn.teams,
                 tn.league, tn.league_image, g.name as game_name
          from TOURNEY2 tn
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


def game_query(game_id=None):
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


def form_regex(search_str):
    # Game
    if search_str == "":
        return None

    return search_str.replace(" ", "|")


def search_game(search_str):
    query = (
        """
        select g.id, g.name, g.summary, g.release_date,
             pt.list_players, tt.list_teams
          from GAME g
          left join (
            select group_concat(p.tag) as list_players, p.current_game
            from PLAYER p
            where p.tag REGEXP "{0}"
            group by p.current_game
          ) pt on pt.current_game = g.id
          left join (
            select group_concat(t.name) as list_teams, t.current_game
            from TEAM t
            where t.name REGEXP "{0}"
            group by t.current_game
          ) tt on tt.current_game = g.id
        where g.name REGEXP "{0}" or g.summary REGEXP "{0}" or g.release_date REGEXP "{0}" or
        tt.list_teams is not null or pt.list_players is not null
        """.format(search_str)
    )
    return query


def search_player(search_str):
    query = (
        """
            select p.id, p.tag, p.first_name, p.last_name, p.role, p.hometown, 
                   t.name as team_name, g.name as game_name
            from PLAYER p
            join TEAM t on t.id = p.current_team
            join GAME g on g.id = p.current_game
            where 
              p.tag REGEXP "{0}" or p.first_name REGEXP "{0}" or p.last_name REGEXP "{0}" or
              p.role REGEXP "{0}" or p.hometown REGEXP "{0}" or
              t.name REGEXP "{0}" or g.name REGEXP "{0}"
        """.format(search_str)
    )
    return query


def search_team(search_str):
    query = (
        """
            select t.id, t.name, t.acronym, g.name as game_name, pt.list_players as players_name
            from TEAM t
            join GAME g on g.id = t.current_game
            left join (
              select group_concat(p.tag) as list_players, p.current_team
              from PLAYER p
              where p.tag REGEXP "{0}"
              group by p.current_team
            ) pt on pt.current_team = t.id
            where t.name REGEXP "{0}" or t.acronym REGEXP "{0}" or 
                  g.name REGEXP "{0}" or pt.list_players is not null
        """.format(search_str)
    )
    return query


def search_tourney(search_str):
    query = (
        """
            select tn.id, tn.name, tn.slug, tn.begin_at, tn.end_at, g.name as game_name, R.list_names as team_names
            from TOURNEY2 tn
            join GAME g on g.id = tn.game
            left join (
              select tt.tournament_id as id, group_concat(t.name) as list_names
              from TEAM_TOURNAMENTS tt
              join TEAM t on tt.team_id = t.id
              where t.name REGEXP "{0}"
              group by tt.tournament_id
            ) R on tn.id = R.id
            where tn.name REGEXP "{0}" or tn.slug REGEXP "{0}" or tn.begin_at REGEXP "{0}" or tn.end_at REGEXP "{0}" or
                  g.name REGEXP "{0}" or R.list_names is not null
        """.format(search_str)
    )
    return query

'=====================END API QUERIES====================='
'=====================START API====================='
from api_classes import Helper, GameInstance, PlayerInstance


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
        query = conn.execute(tourney2_query())
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
            tourney['league'] = row['league']
            tourney['image_url'] = row['league_image']

            list_tourneys.append(tourney)

        conn.close()
        return jsonify(list_tourneys)


class Tourney(Resource):
    def get(self, tourney_id):
        conn = engine.connect()
        query = conn.execute(tourney2_query(tourney_id))
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
        tourney['league'] = row['league']
        tourney['image_url'] = row['league_image']

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
        search_str = form_regex(search_str)
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

        for row in game_results:
            game = OrderedDict()
            game['id'] = row['id']
            game['name'] = row['name']
            game['summary'] = row['summary']
            game['release_date'] = row['release_date']
            game['sample_players'] = row['list_players']
            game['sample_teams'] = row['list_teams']
            game_data.append(game)

        for row in player_results:
            player = OrderedDict()
            player['id'] = row['id']
            player['tag'] = row['tag']
            player['first_name'] = row['first_name']
            player['last_name'] = row['last_name']
            player['role'] = row['role']
            player['hometown'] = row['hometown']
            player['current_game'] = row['game_name']
            player['current_team'] = row['team_name']
            player_data.append(player)

        for row in team_results:
            team = OrderedDict()
            team['id'] = row['id']
            team['name'] = row['name']
            team['acronym'] = row['acronym']
            team['current_players'] = row['players_name']
            team['current_game'] = row['game_name']
            team_data.append(team)

        for row in tourney_results:
            tourney = OrderedDict()
            tourney['id'] = row['id']
            tourney['name'] = row['name']
            tourney['slug'] = row['slug']
            tourney['begin_at'] = row['begin_at']
            tourney['end_at'] = row['end_at']
            tourney['game'] = row['game_name']
            tourney['teams'] = row['team_names']
            tourney_data.append(tourney)

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

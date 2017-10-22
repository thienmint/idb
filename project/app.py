from flask import Flask, request
from flask_restful import Resource, Api
from sqlalchemy import create_engine
import MySQLdb
from json import dumps
from flask_jsonpify import jsonify
from collections import OrderedDict


'=====================START CONFIGURATION====================='

engine = create_engine('mysql://thien:thienmint@db.esportguru.com:3306/devDB?charset=utf8')
app = Flask(__name__)
app.config["JSON_SORT_KEYS"] = False
api = Api(app)

'=====================END CONFIGURATION====================='

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

api.add_resource(Players, '/api/players') # Route_1
api.add_resource(Player, '/api/player/<player_id>') # Route_2

'=====================END API====================='


if __name__ == '__main__':
    app.run(host='0.0.0.0')

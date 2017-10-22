from flask import Flask, render_template, request
from flask_restful import Resource, Api
from sqlalchemy import create_engine
import MySQLdb
from json import dumps
from flask_jsonpify import jsonify
from collections import OrderedDict


'=====================START CONFIGURATION====================='

engine = create_engine('mysql://thien:thienmint@db.esportguru.com/devDB?charset=utf8')
app = Flask(__name__)
app.config["JSON_SORT_KEYS"] = False
api = Api(app)

'=====================END CONFIGURATION====================='

'=====================START ROUTING====================='


@app.route('/')
def index():
    return render_template('home.html')


@app.route('/players')
def hello():
    return render_template('players.html')


@app.route('/about')
def about():
    return render_template('about.html')


@app.route('/games')
def games():
    return render_template('games.html')


@app.route('/teams')
def teams():
    return render_template('teams.html')


@app.route('/tournaments')
def tournaments():
    return render_template('tournaments.html')


@app.route('/yiliang')
def yiliang():
    return  render_template('yiliang_peng.html')


@app.route('/nikola')
def nikola():
    return render_template('nikola-kovac.html')


@app.route('/adam')
def adam():
    return render_template('adam_lindgren.html')


@app.route('/league')
def league():
    return render_template('league-of-legends.html')


@app.route('/ssbm')
def ssbm():
    return render_template('ssbm.html')


@app.route('/csgo')
def csgo():
    return render_template('csgo.html')


@app.route('/soloMid')
def soloMid():
    return render_template('soloMid.html')



@app.route('/solomid')
def solomid():
    return render_template('soloMid.html')


@app.route('/fnatic')
def fnatic():
    return render_template('fnatic.html')


@app.route('/liquid')
def liquid():
    return render_template('liquid.html')


@app.route('/dreamhack')
def dreamhack():
    return render_template('dreamhack.html')


@app.route('/nalcs')
def nalcs():
    return render_template('nalcs.html')


@app.route('/ti7')
def ti7():
    return render_template('ti7.html')

'=====================END ROUTING====================='

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
    app.run()

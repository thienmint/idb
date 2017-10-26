from flask import Flask, render_template

app = Flask(__name__)


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


if __name__ == '__main__':
    app.run()

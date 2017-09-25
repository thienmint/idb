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


if __name__ == '__main__':
    app.run()

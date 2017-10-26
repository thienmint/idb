# eSportGuru
import unittest
import requests
import json

BASE_URL = 'http://api.esportguru.com/'


class TestApi(unittest.TestCase):

  #
  # Test Connection
  #
  def test_connection(self):
    session = requests.Session()
    response = session.get(BASE_URL)

    self.assertEqual(response.status_code, 200)

  #
  # Validate base data
  #
  def test_validate_players(self):
    session = requests.Session()
    response = session.get(BASE_URL + 'players')

    self.assertEqual(response.status_code, 200)

    data = json.loads(response.text)
    self.assertGreater(len(data), 0)
    for player in data:
      self.assertTrue(player["id"] is not None and type(player["id"]) == int)

  def test_validate_teams(self):
    session = requests.Session()
    response = session.get(BASE_URL + 'teams')

    self.assertEqual(response.status_code, 200)

    data = json.loads(response.text)
    self.assertGreater(len(data), 0)
    for team in data:
      self.assertTrue(team["id"] is not None and type(team["id"]) == int)

  def test_validate_tournaments(self):
    session = requests.Session()
    response = session.get(BASE_URL + 'tournaments')

    self.assertEqual(response.status_code, 200)

    data = json.loads(response.text)
    self.assertGreater(len(data), 0)
    for tourney in data:
      self.assertTrue(
          tourney["id"] is not None and type(tourney["id"]) == int)

  def test_validate_games(self):
    session = requests.Session()
    response = session.get(BASE_URL + 'games')

    self.assertEqual(response.status_code, 200)

    data = json.loads(response.text)
    self.assertGreater(len(data), 0)
    for game in data:
      self.assertTrue(game["id"] is not None and type(game["id"]) == int)

  #
  # Validate player data
  #
  def test_validate_player_tags(self):
    session = requests.Session()
    response = session.get(BASE_URL + 'players')

    self.assertEqual(response.status_code, 200)

    data = json.loads(response.text)
    for player in data:
      self.assertTrue(player["tag"] is not None and player["tag"] is not "")

  def test_validate_specific_player(self):
    session = requests.Session()
    response = session.get(BASE_URL + 'players/4464')

    self.assertEqual(response.status_code, 200)

    player = json.loads(response.text)
    self.assertTrue(player["id"] == 4464)
    self.assertTrue(player["tag"] == "G")
    self.assertTrue(player["first_name"] == "Sergey Alexandrovich")
    self.assertTrue(player["last_name"] == "Bragin")
    self.assertTrue(player["role"] is None)
    self.assertTrue(player["hometown"] == "Russia")
    self.assertTrue(player["image_url"] is None)
    self.assertTrue(player["current_team"] == {"id": 588, "name": "Virtus.pro"})
    self.assertTrue(player["current_game"] == {"id": 2, "name": "Hearthstone"})

  #
  # Validate team data
  #
  def test_validate_team_names(self):
    session = requests.Session()
    response = session.get(BASE_URL + 'teams')

    self.assertEqual(response.status_code, 200)

    data = json.loads(response.text)
    for team in data:
      self.assertTrue(team["name"] is not None and team["name"] is not "")

  def test_validate_specific_team(self):
    session = requests.Session()
    response = session.get(BASE_URL + 'teams/45')

    self.assertEqual(response.status_code, 200)

    team = json.loads(response.text)
    self.assertTrue(team["id"] == 45)
    self.assertTrue(team["name"] == "CLG Academy")
    self.assertTrue(team["acronym"] == "CLA")
    self.assertTrue(
        team["image_url"] == "https://pandacdn.blob.core.windows.net/cdn/" +
                             "uploads/clg-black-51p7vy3s.png")
    self.assertTrue(team["current_players"] == [
                    {"id": 3505, "tag": "Linsanity"}])
    self.assertTrue(team["current_game"] == {
                    "id": 1, "name": "League of Legends"})

  #
  # Validate tourney data
  #
  def test_validate_tourney_names(self):
    session = requests.Session()
    response = session.get(BASE_URL + 'tournaments')

    self.assertEqual(response.status_code, 200)

    data = json.loads(response.text)
    for team in data:
      self.assertTrue(team["name"] is not None and team["name"] is not "")
      self.assertTrue(type(team["game"]["id"]) == int)

  #
  # Validate game data
  #
  def test_validate_game_data(self):
    session = requests.Session()
    response = session.get(BASE_URL + 'games')

    self.assertEqual(response.status_code, 200)

    data = json.loads(response.text)
    for game in data:
      self.assertTrue(type(game["id"]) == int)
      self.assertTrue(game["name"] is not None and game["name"] is not "")
      self.assertTrue(game["summary"] is not None and game["summary"] is not "")
      self.assertTrue(game["release_date"] is not None)
      self.assertGreater(len(game["website"]), 0)
      self.assertGreater(len(game["screenshots"]), 0)

if __name__ == '__main__':
  unittest.main()

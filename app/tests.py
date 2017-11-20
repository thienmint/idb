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
    for tourney in data:
      self.assertTrue(tourney["name"] is not None and tourney["name"] is not "")
      self.assertTrue(type(tourney["game"]["id"]) == int)

  def test_validate_new_leagues(self):
    session = requests.Session()
    response = session.get(BASE_URL + 'tournaments')

    self.assertEqual(response.status_code, 200)

    data = json.loads(response.text)
    for tourney in data:
      self.assertTrue(tourney["league"] is not None and
                      tourney["league"] is not "")
      self.assertTrue(tourney["image_url"] is not None and
                      tourney["image_url"] is not "")

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

  #
  # Test search functionality
  #
  def test_empty_search(self):
    session = requests.Session()
    response = session.get(BASE_URL + 'search')

    self.assertEqual(response.status_code, 200)
    self.assertEqual(response.text, 'What are you looking for m8?')

  def test_no_char_search(self):
    session = requests.Session()
    response = session.get(BASE_URL + 'search/      ')

    self.assertEqual(response.status_code, 500)

  def test_simple_search(self):
    session = requests.Session()
    response = session.get(BASE_URL + 'search/pokemon')

    self.assertEqual(response.status_code, 200)

    model = json.loads(response.text)
    self.assertTrue(model["games"] is not None)
    self.assertTrue(model["players"] is not None)
    self.assertTrue(model["teams"] is not None)
    self.assertTrue(model["tournaments"] is not None)

  def test_db_attribute_1_search(self):
    session = requests.Session()
    response = session.get(BASE_URL + 'search/begin_at')

    self.assertEqual(response.status_code, 200)

    model = json.loads(response.text)
    self.assertTrue(model["games"] == [])
    self.assertTrue(model["players"] == [])
    self.assertTrue(model["teams"] == [])
    self.assertTrue(model["tournaments"] == [])

  def test_db_attribute_2_search(self):
    session = requests.Session()
    response = session.get(BASE_URL + 'search/hometown')

    self.assertEqual(response.status_code, 200)

    model = json.loads(response.text)
    self.assertTrue(model["games"] == [])
    self.assertTrue(model["players"] == [])
    self.assertTrue(model["teams"] == [])
    self.assertTrue(model["tournaments"] == [])

  def test_db_attribute_3_search(self):
    session = requests.Session()
    response = session.get(BASE_URL + 'search/summary')

    self.assertEqual(response.status_code, 200)

    model = json.loads(response.text)
    self.assertTrue(model["games"] == [])
    self.assertTrue(model["players"] == [])
    self.assertTrue(model["teams"] == [])
    self.assertTrue(model["tournaments"] == [])

  def test_db_attribute_4_search(self):
    session = requests.Session()
    response = session.get(BASE_URL + 'search/current_players')

    self.assertEqual(response.status_code, 200)

    model = json.loads(response.text)
    self.assertTrue(model["games"] == [])
    self.assertTrue(model["players"] == [])
    self.assertTrue(model["teams"] == [])
    self.assertTrue(model["tournaments"] == [])

  def test_db_attribute_5_search(self):
    session = requests.Session()
    response = session.get(BASE_URL + 'search/acronym')

    self.assertEqual(response.status_code, 200)

    model = json.loads(response.text)
    self.assertTrue(model["games"] == [])
    self.assertTrue(model["players"] == [])
    self.assertTrue(model["teams"] == [])
    self.assertTrue(model["tournaments"] == [])

  # def test_validate_simple_search_player_data(self):
  #   session = requests.Session()
  #   response = session.get(BASE_URL + 'search/pokemon')

  #   self.assertEqual(response.status_code, 200)

  #   model = json.loads(response.text)
  #   self.assertTrue(model["games"] == [])
  #   self.assertTrue(model["teams"] == [])
  #   self.assertTrue(model["tournaments"] == [])

  #   self.assertTrue(model["players"] is not None)
  #   self.assertTrue(model["players"][0]["id"] is not None and model[
  #                   "players"][0]["id"] == 7441)
  #   self.assertTrue(model["players"][0]["tag"] is not None and model[
  #                   "players"][0]["tag"] == 'Pokemon')
  #   self.assertTrue(model["players"][0]["first_name"] is not None and model[
  #                   "players"][0]["first_name"] == 'Zeng')
  #   self.assertTrue(model["players"][0]["last_name"] is not None and model[
  #                   "players"][0]["last_name"] == 'Tao')
  #   self.assertTrue(model["players"][0]["role"] is not None and model[
  #                   "players"][0]["role"] == 'jun')
  #   self.assertTrue(model["players"][0]["hometown"] is not None and model[
  #                   "players"][0]["hometown"] == 'Unknown')

  def test_validate_simple_search_team_data(self):
    session = requests.Session()
    response = session.get(BASE_URL + 'search/enemy')

    self.assertEqual(response.status_code, 200)

    model = json.loads(response.text)
    self.assertTrue(model["teams"] is not None)
    self.assertTrue(model["teams"][0]["id"] is not None and model[
                    "teams"][0]["id"] == 10)
    self.assertTrue(model["teams"][0]["name"] is not None and model[
                    "teams"][0]["name"] == 'Enemy')
    self.assertTrue(model["teams"][0]["acronym"] is not None and model[
                    "teams"][0]["acronym"] == 'NME')

  def test_validate_simple_search_tourney_data(self):
    session = requests.Session()
    response = session.get(
        BASE_URL + 'search/world-championship-2014-knockout-stage')

    self.assertEqual(response.status_code, 200)

    model = json.loads(response.text)
    self.assertTrue(model["games"] == [])
    self.assertTrue(model["players"] == [])
    self.assertTrue(model["teams"] == [])

    self.assertTrue(model["tournaments"] is not None)
    self.assertTrue(model["tournaments"][0]["id"] is not None and model[
                    "tournaments"][0]["id"] == 9)
    self.assertTrue(model["tournaments"][0]["name"] is not None and model[
                    "tournaments"][0]["name"] == 'Knockout stage')
    self.assertTrue(model["tournaments"][0]["slug"] is not None and model[
                    "tournaments"][0]["slug"] ==
                    'world-championship-2014-knockout-stage')
    self.assertTrue(model["tournaments"][0]["begin_at"] is not None and model[
                    "tournaments"][0]["begin_at"] ==
                    'Thu, 25 Sep 2014 00:00:00 GMT')
    self.assertTrue(model["tournaments"][0]["end_at"] is not None and model[
                    "tournaments"][0]["end_at"] ==
                    'Thu, 25 Sep 2014 00:00:00 GMT')

  def test_validate_simple_search_game_data(self):
    session = requests.Session()
    response = session.get(BASE_URL + 'search/2009-10-26')

    self.assertEqual(response.status_code, 200)

    model = json.loads(response.text)
    self.assertTrue(model["tournaments"] == [])
    self.assertTrue(model["players"] == [])
    self.assertTrue(model["teams"] == [])

    self.assertTrue(model["games"] is not None)
    self.assertTrue(model["games"][0]["id"] is not None and model[
                    "games"][0]["id"] == 1)
    self.assertTrue(model["games"][0]["name"] is not None and model[
                    "games"][0]["name"] == 'League of Legends')
    self.assertTrue(model["games"][0]["summary"] is not None)
    self.assertTrue(model["games"][0]["release_date"] is not None and model[
                    "games"][0]["release_date"] ==
                    'Mon, 26 Oct 2009 00:00:00 GMT')

  def test_players_keyword_search(self):
    session = requests.Session()
    response = session.get(BASE_URL + 'search/canada')

    self.assertEqual(response.status_code, 200)

    model = json.loads(response.text)
    for p in model["players"]:
      self.assertTrue(p["hometown"] == 'Canada')

  def test_simple_multiple_keyword_search(self):
    session = requests.Session()
    response = session.get(BASE_URL + 'search/armada solomid smash')

    self.assertEqual(response.status_code, 200)

    model = json.loads(response.text)
    self.assertTrue(model["tournaments"] == [])
    self.assertTrue(model["players"] == [])
    self.assertTrue(model["teams"] == [])
    self.assertTrue(model["games"] == [])

  def test_complex_multiple_keyword_search(self):
    session = requests.Session()
    response = session.get(BASE_URL + 'search/armada solomid smash tsm')

    self.assertEqual(response.status_code, 200)

    model = json.loads(response.text)
    self.assertTrue(model["players"] == [])
    self.assertTrue(model["teams"][0]["name"] == "TSM")
    self.assertTrue(model["games"][0]["sample_teams"] == "TSM")

    for t in model["tournaments"]:
      self.assertTrue(t["teams"] == "TSM")

  def test_date_search(self):
    session = requests.Session()
    response = session.get(BASE_URL + 'search/2017')

    self.assertEqual(response.status_code, 200)

    model = json.loads(response.text)
    self.assertTrue(model["players"] == [])
    self.assertTrue(model["teams"] == [])
    self.assertTrue(model["games"] == [])

    for t in model["tournaments"]:
      if (t["teams"] is not None and t["teams"]["being_at"] is not None and
              t["teams"]["end_at"] is not None):
        self.assertTrue("2017" in t["teams"]["begin_at"])
        self.assertTrue("2017" in t["teams"]["end_at"])

  def test_search_bug_1_search(self):
    session = requests.Session()
    response = session.get(BASE_URL + 'search/double double')

    self.assertEqual(response.status_code, 200)

    model = json.loads(response.text)
    self.assertTrue(model["players"] == [])
    self.assertTrue(model["games"] == [])

    # This is a bug, should return double dimension, since appears in
    # tournaments
    self.assertTrue(model["teams"] == [])

    for t in model["tournaments"]:
      self.assertTrue(t["teams"] == "Double Dimension")

  def test_search_bug_2_search(self):
    session = requests.Session()
    response = session.get(BASE_URL + 'search/Jan')

    self.assertEqual(response.status_code, 200)

    model = json.loads(response.text)
    # This is a bug bc there are many tournaments that display a start/end date
    # in Jan; also 2017 works but this doesn't
    self.assertTrue(model["tournaments"] == [])

  def test_search_bug_3_search(self):
    session = requests.Session()
    response = session.get(BASE_URL + 'search/\"Jan\"')

    # Search cannot handle double quotes
    self.assertEqual(response.status_code, 500)

if __name__ == '__main__':
  unittest.main()

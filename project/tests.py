# eSportGuru
import unittest
import requests
import json

BASE_URL = 'http://api.esportguru.com/'


class TestApi(unittest.TestCase):

  def test_connection(self):
    session = requests.Session()
    response = session.get(BASE_URL)

    self.assertEqual(response.status_code, 200)

  def test_players(self):
    session = requests.Session()
    response = session.get(BASE_URL + 'players')

    self.assertEqual(response.status_code, 200)

    data = json.loads(response.text)
    for player in data:
      self.assertTrue(player["id"] is not None)


if __name__ == '__main__':
  unittest.main()

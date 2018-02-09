# eSportGuru

#
# Include Files
#

import requests
import json

# Global Variables

BASE_URL = 'http://api.museumary.me/artist/?entries_per_page=12000'

#
# Typedefs
#


class Artist:

  def __init__(self):
    self.name = ""
    self.birthdate = -1
    self.birthplace = ""
    self.culture = ""
    self.deathdate = -1
    self.deathplace = ""

#
# Public Function Declarations
#


def get_artist_data():
  session = requests.Session()
  response = session.get(BASE_URL)

  if (response.status_code == requests.codes.ok):
    data = json.loads(response.text)

    artists = {}
    for a in data["objects"]:
      if (a["birth"] == 0 or a["death"] == 0 or
              a["name"] == None or a["culture"] == None):
        continue

      artist = Artist()
      artist.name = a["name"]
      artist.birthdate = a["birth"]
      artist.birthplace = a["birthplace"]
      artist.culture = a["culture"]
      artist.deathdate = a["death"]
      artist.deathplace = a["deathplace"]

      century = artist.birthdate // 100
      if (century not in artists):
        artists[century] = {}

      century_dict = artists[century]
      if (artist.culture not in century_dict):
        century_dict[artist.culture] = set()

      culture_set = century_dict[artist.culture]
      culture_set.add(artist)

    create_json(artists)

  else:
    print("Could not reach api")


def create_json(artists):
  d3_artists = list()
  for century, culture_dict in artists.items():
    cultures = list()
    for culture, artist_set in culture_dict.items():
      arts = list()
      for a in artist_set:
        arts.append({"name": a.name, "size": 1})

      cultures.append({"name": culture, "children": arts})

    d3_artists.append({"name": century * 100, "children": cultures})

  artists_json = json.dumps(d3_artists)
  file = open("raw_artists_data.json", "w")
  file.write(artists_json)
  file.close()

get_artist_data()

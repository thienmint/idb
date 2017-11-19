# eSportGuru

#
# Include Files
#

import requests
import json

# Global Variables

BASE_URL = 'https://phonedb.info/models'

#
# Typedefs
#


class Brand:

  def __init__(self):
    self.name = ""
    self.models = set()
    self.manufacturers = set()
    self.markets = set()
    self.carriers = set()

#
# Public Function Declarations
#


def get_model_data():
  session = requests.Session()
  response = session.get(BASE_URL)

  if (response.status_code == requests.codes.ok):
    data = json.loads(response.text)

    brands = {}
    for phone in data:
      if (phone["brand"] == None or phone["model"] == None or
          phone["manufacturers"] == None or phone["market_regions"] == None or
              phone["carriers"] == None):
        continue

      brand_name = phone["brand"]
      if (brand_name not in brands):
        brands[brand_name] = Brand()

      b = brands[brand_name]
      b.name = brand_name
      b.models.add(phone["model"])

      for m in phone["manufacturers"]:
        b.manufacturers.add(m)

      for mr in phone["market_regions"]:
        b.markets.add(mr)

      for c in phone["carriers"]:
        b.carriers.add(c)

      brands[brand_name] = b

    create_json(brands)

  else:
    print("Could not reach api")


def create_json(brands):
  d3_brands = list()
  for _, brand in brands.items():

    models = list()
    for model in brand.models:
      models.append({"name": model, "size": 1})

    manufacturers = list()
    for m in brand.manufacturers:
      manufacturers.append({"name": m, "size": 1})

    market_regions = list()
    for mr in brand.markets:
      market_regions.append({"name": mr, "size": 1})

    carriers = list()
    for c in brand.carriers:
      carriers.append({"name": c, "size": 1})

    # d3_brands.append({
    #     "name": brand.name,
    #     "children": [
    #         {"name": "Models", "size": len(brand.models)},
    #         {"name": "Manufacturers", "size": len(brand.manufacturers)},
    #         {"name": "Market Regions", "size": len(brand.markets)},
    #         {"name": "Carriers", "size": len(brand.carriers)}
    #     ]
    # })

    d3_brands.append({
        "name": brand.name,
        "children": [
            {"name": "Models", "children": models},
            {"name": "Manufacturers", "children": manufacturers},
            {"name": "Market Regions", "children": market_regions},
            {"name": "Carriers", "children": carriers}
        ]
    })

  brands_json = json.dumps(d3_brands)
  file = open("raw_brands_data.json", "w")
  file.write(brands_json)
  file.close()

get_model_data()

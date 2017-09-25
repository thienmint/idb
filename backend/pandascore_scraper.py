import requests
import json

API_TOKEN = 'Bearer lfKRr_rlDBE2Fua9xDMe00HTXd-7bWlJ8y4ZJBTtdglCmGnDufs'
BASE_URL = 'https://api.pandascore.co/'

# api_request is the additional url params for the api call
def scrape_data (api_request) :
	global API_TOKEN, BASE_URL
	session = requests.Session()
	response = session.get(BASE_URL, headers={'Authorization': API_TOKEN})

	if (response.status_code == requests.codes.ok) :
		response = session.get(BASE_URL + api_request, 
							   headers={'Authorization': API_TOKEN})
		if (response.status_code == requests.codes.ok) :
			json = response.json()
			print (json)
		else :
			raise Exception ('Could not get data from ' + api_request)
	else :
		raise Exception ('Could not authorize PandaScore API token!')


scrape_data('players/')
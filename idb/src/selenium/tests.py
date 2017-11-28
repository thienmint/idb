# import unittest
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
# class PythonOrgSearch(unittest.TestCase):

#     def setUp(self):
        # driver = webdriver.Firefox()

# def test_search_in_python_org(self):
driver = webdriver.Firefox()
driver.get("https://www.esportguru.com/")
#this tests search
searchBox = driver.find_element_by_id('searchInput')
searchBox.send_keys("League of Legends")
searchBox.send_keys(Keys.RETURN)

link_games = driver.find_element_by_link_text('Games')
link_games.click()
driver.implicitly_wait(10)
link_about = driver.find_element_by_link_text('About')
link_about.click()
driver.implicitly_wait(10)
link_teams = driver.find_element_by_link_text('Teams')
link_teams.click()
driver.implicitly_wait(10)
link_tournaments = driver.find_element_by_link_text('Tournaments')
link_tournaments.click()
driver.implicitly_wait(10)
link_players = driver.find_element_by_link_text('Players')
link_players.click()
driver.implicitly_wait(10)
# this test is to see if link is clickable in the players tab
link_league = driver.find_element_by_link_text('League of Legends')
link_players.click()
driver.implicitly_wait(10)
#this test checks if the player is clickable within the league info page
link_league_players = driver.find_element_by_link_text('PCS Tet')
link_league_players.click()
driver.implicitly_wait(10)

link_home_button = driver.find_element_by_link_text('eSport Guru')
link_home_button.click()
driver.implicitly_wait(10)
    # def tearDown(self):
driver.close()

# if __name__ == "__main__":
#     unittest.main()

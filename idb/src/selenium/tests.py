# import unittest
from selenium import webdriver
from selenium.webdriver.common.keys import Keys

driver = webdriver.Firefox()
driver.get("https://www.esportguru.com/")
# this tests search
searchBox = driver.find_element_by_tag_name('input')
searchBox.send_keys("League of Legends")
searchBox.send_keys(Keys.RETURN)
assert "League of Legends" in driver.page_source
driver.implicitly_wait(10)
link_home_button = driver.find_element_by_link_text('eSport Guru')
link_home_button.click()

# this test checks to see if the infinite loop still exists
searchBox2 = driver.find_element_by_tag_name('input')
searchBox2.send_keys("Pokemon")
searchBox2.send_keys(Keys.RETURN)
assert "Oh no! No results were found for your search." in driver.page_source
driver.implicitly_wait(10)
link_home_button = driver.find_element_by_link_text('eSport Guru')
link_home_button.click()

searchBox3 = driver.find_element_by_tag_name('input')
searchBox3.send_keys("0")
searchBox3.send_keys(Keys.RETURN)
assert "0" in driver.page_source
driver.implicitly_wait(10)

# this checks navbar functionality 
link_games = driver.find_element_by_link_text('Games')
link_games.click()
assert "Games" in driver.page_source
driver.implicitly_wait(10)
link_about = driver.find_element_by_link_text('About')
link_about.click()
assert "About" in driver.page_source
driver.implicitly_wait(10)
link_teams = driver.find_element_by_link_text('Teams')
link_teams.click()
assert "Teams" in driver.page_source
driver.implicitly_wait(10)
link_tournaments = driver.find_element_by_link_text('Tournaments')
link_tournaments.click()
assert "Tournaments" in driver.page_source
driver.implicitly_wait(10)
link_players = driver.find_element_by_link_text('Players')
link_players.click()
assert "Players" in driver.page_source
driver.implicitly_wait(10)
# this test is to see if link is clickable in the players tab
link_league = driver.find_element_by_link_text('League of Legends')
link_players.click()
assert "League of Legends" in driver.page_source
driver.implicitly_wait(10)
# #this test checks if the player is clickable within the league info page
link_league_players = driver.find_element_by_link_text('PCS Tet')
link_league_players.click()
assert "PCS Tet" in driver.page_source
driver.implicitly_wait(10)

link_home_button = driver.find_element_by_link_text('eSport Guru')
link_home_button.click()
driver.implicitly_wait(10)

driver.close()


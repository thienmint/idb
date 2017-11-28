# import unittest
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
# class PythonOrgSearch(unittest.TestCase):

#     def setUp(self):
        # driver = webdriver.Firefox()

# def test_search_in_python_org(self):
driver = webdriver.Firefox()
driver.get("https://www.esportguru.com/")
# searchBox = driver.find_element_by_id('loginForm')
# searchBox.send_keys("League of Legends")
# searchBox.send_keys(Keys.RETURN)

link_games = driver.find_element_by_link_text('Games')
link_games.click()
driver.implicitly_wait(10)
link_games = driver.find_element_by_link_text('About')
link_games.click()
driver.implicitly_wait(10)
link_games = driver.find_element_by_link_text('Teams')
link_games.click()
driver.implicitly_wait(10)
link_games = driver.find_element_by_link_text('Tournaments')
link_games.click()
driver.implicitly_wait(10)
link_games = driver.find_element_by_link_text('Players')
link_games.click()
driver.implicitly_wait(10)

    # def tearDown(self):
driver.close()

# if __name__ == "__main__":
#     unittest.main()

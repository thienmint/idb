# import unittest
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
# class PythonOrgSearch(unittest.TestCase):

#     def setUp(self):
        # driver = webdriver.Firefox()

# def test_search_in_python_org(self):
driver = webdriver.Firefox()
driver.get("https://www.esportguru.com/")
searchBox = driver.findElement(By.id("loginForm"));
searchBox.send_keys("League of Legends")
searchBox.send_keys(Keys.RETURN)




link_games = driver.find_element_by_link_text('Games')
link_games.click()


    # def tearDown(self):
driver.close()

# if __name__ == "__main__":
#     unittest.main()

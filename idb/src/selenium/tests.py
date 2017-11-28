from selenium import webdriver
from selenium.webdriver.common.keys import Keys

driver = webdriver.Firefox()
driver.get("https://www.esportguru.com/")
searchBox = driver.findElement(By.id("loginForm"));
searchBox.send_keys("League of Legends")
searchBox.send_keys(Keys.RETURN)
driver.close()
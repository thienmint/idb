import org.openqa.selenium.WebDriver;
import org.openqa.selenium.firefox.FirefoxDriver;
 
import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;
 
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;
 
import org.junit.Assert;
 
public class Example  {
  public static void main(String[] args) {
 
    // Create an instance of the driver
    // Test 1?
    WebDriver driver = new FirefoxDriver();
 
    // Navigate to a web page
    driver.get("https://www.esportguru.com/");
 
    // Perform actions on HTML elements, entering text and submitting the form

    WebElement searchBox        = driver.findElement(By.id("loginForm"));
 
    searchBox.sendKeys("League of Legends");
 
    searchBox.submit();        // submit by form element
  

    Thread.sleep(5000);




    // Test 2
    WebElement linkGames = driver.findElement(By.linkText("Games"));
    linkGames.click();
    Thread.sleep(5000);
    WebElement linkLeague = driver.findElement(By.linkText("League of Legends"));
    linkLeague.click();
    Thread.sleep(5000);
    WebElement linkLeaguePlayers = driver.findElement(By.linkText("PCS Tet"));
    linkLeaguePlayers.click();
    Thread.sleep(5000);
    // Test 3
    WebElement linkPlayers = driver.findElement(By.linkText("Players"));
    linkPlayers.click();
    Thread.sleep(5000);
    // Test 4
    WebElement linkTeams = driver.findElement(By.linkText("Teams"));
    linkTeams.click();
    Thread.sleep(5000);
    // Test 5
    WebElement linkTournaments = driver.findElement(By.linkText("Tournaments"));
    linkTournaments.click();
    Thread.sleep(5000);
    // Test 6
    WebElement linkLogo = driver.findElement(By.linkText("eSport Guru"));
    linkLogo.click();
    Thread.sleep(5000);
    // Test 7
    WebElement linkAbout = driver.findElement(By.linkText("About"));
    linkAbout.click();
    WebElement linkGithub = driver.findElement(By.linkText("Technical Report"));
    Thread.sleep(5000);
    // Conclude a test
    driver.quit();
 
  }
}
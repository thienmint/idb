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



    WebElement link = driver.findElement(By.linkText("About"));
    link.click();
    Thread.sleep(5000);

    // Test 3
    WebElement link = driver.findElement(By.linkText("Games"));
    link.click();
    Thread.sleep(5000);
    // Test 4
    WebElement link = driver.findElement(By.linkText("Players"));
    link.click();
    Thread.sleep(5000);
    // Test 5
    WebElement link = driver.findElement(By.linkText("Teams"));
    link.click();
    Thread.sleep(5000);
    // Test 6
    WebElement link = driver.findElement(By.linkText("Tournaments"));
    link.click();
    Thread.sleep(5000);
    // Test 7
    WebElement link = driver.findElement(By.linkText("eSport Guru"));
    link.click();
    Thread.sleep(5000);
    // Conclude a test
    driver.quit();
 
  }
}
const chrome = require('selenium-webdriver/chrome');
const {Builder, By, Key, until,Capabilities} = require('selenium-webdriver');
var webdriver = require('selenium-webdriver');
const geckoDriverPath  = require('chromedriver').path;

let service = new chrome.ServiceBuilder(geckoDriverPath ).build();
chrome.setDefaultService(service);

(async function example() {
    let driver = new Builder().withCapabilities(Capabilities.chrome()).build();
    try {
        await driver.get('https://www.facebook.com/');
        // await driver.findElement(By.name('wd')).sendKeys('webdriver', Key.RETURN);
        // await driver.wait(until.titleIs('webdriver_百度搜索'), 1000);

        // await driver.wait(function(){
        //     return driver.isElementPresent(webdriver.By.name('fos_user_registration_form[email]'));
        // }, 3000, 'Failed to load Registration form')

        await Promise.all([
            driver.findElement(webdriver.By.id('email'))
                  .sendKeys('busuzimakaka@gmail.com'),
            driver.findElement(webdriver.By.id('pass'))
                  .sendKeys('Dr@g0n96')
        ])

        await driver.findElement(webdriver.By.id('loginbutton')).click();

        
        const userProfileLink = await driver.findElement(webdriver.By.className('_2s25 _606w')).getAttribute('href')
        await driver.get(userProfileLink)
        const aTag_NavLinks = await driver.findElements(webdriver.By.className('_6-6'))
        
        let getLinkList = []
        aTag_NavLinks.map((navLink) => {
         getLinkList.push(navLink.getAttribute('href'))
        })
        
        const navLinks = await Promise.all(getLinkList);
        let friendsLink = ""
        navLinks.map(navLink => {
            if(navLink){
               if(navLink.includes('/friends?')){
                  friendsLink = navLink
               }
            }
         })

      await driver.get(friendsLink)
      const liTagFriendTags = await driver.findElements(webdriver.By.tagName('li'))
      console.log(liTagFriendTags.length)
      let friendTagsPromises = []
      liTagFriendTags.map((friendTag) => {
         friendTagsPromises.push(friendTag.findElement(webdriver.By.tagName('a')).getAttribute('href'))
      })

      const friendTags = await Promise.allSettled(friendTagsPromises);

      console.log(friendTags)
      
      //   const friendList = await driver.findElements(webdriver.By.className('friendBrowserListUnit'))
      //   let getFriendLinkPromises = []
      //   friendList.map((someFriend) => {
      //    getFriendLinkPromises.push(someFriend.findElement(webdriver.By.tagName('a')).getAttribute('href'))
      //   });

      //   const friendLinkList = await Promise.all(getFriendLinkPromises)

      //   console.log(friendLinkList)
      //   await driver.get(friendList)
      //   await driver.findElement(webdriver.By.xpath("//a/u[contains(title(),'Profile')]")).click();

        console.log('ok')
     }
     catch(err){
      console.log(err)
     }
     //đụ má xong r để lm cc gì ko thoát
     finally {
        await driver.quit();
        await driver.close();
     }
  })();
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using OpenQA.Selenium;

namespace BeBOT
{
    class Util{

        public static bool find(string by, string pattern, IWebDriver driver , out IWebElement element) { 
            element = driver.FindElement(By.Id(pattern));
            return (element != null);
        }
    }
}

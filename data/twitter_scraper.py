import time
from selenium import webdriver
from time import strftime, strptime
from datetime import date, datetime, timedelta
import datetime



def datespan(startDate, endDate):
    dates = []
    while startDate < endDate:
        dates.append(startDate)
        startDate = startDate + datetime.timedelta(days=7)
    return dates
    
    
driver = webdriver.Chrome('C:/Users/andre/Desktop/chromedriver.exe')

driver.get('https://twitter.com/search-advanced?lang=en');
from_account = driver.find_element_by_name("q")

start_date = datetime.datetime(2015,3,1,0,0,0)
end_date = datetime.datetime(2016,2,20,0,0,0)

driver.find_element_by_xpath('//*[@id="page-container"]/div/div[1]/form/fieldset[2]/div[1]/label/input').send_keys("realDonaldTrump")
driver.find_element_by_xpath('//*[@id="since"]').send_keys(start_date.strftime('%Y-%m-%d'))
driver.find_element_by_xpath('//*[@id="until"]').send_keys(end_date.strftime('%Y-%m-%d'))
time.sleep(1)
driver.find_element_by_xpath('//*[@id="page-container"]/div/div[1]/form/button').click()

time.sleep(5)

elems = driver.find_elements_by_xpath("//*[contains(concat(' ', @class, ' '), ' js-stream-item ')]")
for elem in elems:
    with open("./trump/" + strptime(start_date, '%Y-%m-%d') + "__TO__" + strptime(end_date, '%Y-%m-%d'),"a+") as f:
        f.write(elem.text.encode("utf-8") + "\n##NEW##\n")
    
# date_list = datespan(start_date, end_date)
# 
# for i,k in zip(date_list[0::2], date_list[1::2]):
#     print str(i), '+', str(k)
# search_box.send_keys('ChromeDriver')
# search_box.submit()
# time.sleep(5)
# driver.quit()
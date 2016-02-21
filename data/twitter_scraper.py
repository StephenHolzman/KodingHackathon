import time
from selenium import webdriver
from time import strftime, strptime
from datetime import date, datetime, timedelta
from random import randint
import datetime

def datespan(startDate, endDate):
    dates = []
    while startDate < endDate:
        dates.append(startDate)
        startDate = startDate + datetime.timedelta(days=7)
    return dates
    
def getTweetsForDate(startdate, enddate):
    print(startdate, enddate)
    driver.get('https://twitter.com/search-advanced?lang=en')
    driver.find_element_by_xpath('//*[@id="page-container"]/div/div[1]/form/fieldset[2]/div[1]/label/input').send_keys("realDonaldTrump")
    driver.find_element_by_xpath('//*[@id="since"]').send_keys(startdate.strftime('%Y-%m-%d'))
    driver.find_element_by_xpath('//*[@id="until"]').send_keys(enddate.strftime('%Y-%m-%d'))
    time.sleep(1)
    driver.find_element_by_xpath('//*[@id="page-container"]/div/div[1]/form/button').click()

    time.sleep(5)

    elems = driver.find_elements_by_xpath("//*[contains(concat(' ', @class, ' '), ' js-stream-item ')]")
    for elem in elems:
        with open("./trump/" + str(startdate) + "__TO__" + str(enddate) + ".txt","a+") as f:
            f.write("\n##NEW##\n" + elem.text.encode("utf-8"))

driver = webdriver.Chrome('C:/Users/andre/Desktop/chromedriver.exe')    
start_date = datetime.date(2015,3,1)
end_date = datetime.date(2016,2,20)
date_list = datespan(start_date, end_date)

for i,k in zip(date_list[0::2], date_list[1::2]):
    getTweetsForDate(i, k)
    time.sleep(randint(5,9))
    
driver.quit()
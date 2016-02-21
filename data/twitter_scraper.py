import time
from selenium import webdriver
from itertools import izip, islice
from time import strftime, strptime
from datetime import date, datetime, timedelta
from random import randint
import datetime

handle = "marcorubio"
candidate = "rubio"

def datespan(startDate, endDate):
    dates = []
    while startDate < endDate:
        dates.append(startDate)
        startDate = startDate + datetime.timedelta(days=15)
    return dates
    
def getTweetsForDate(enddate):
    driver.get('https://twitter.com/search-advanced?lang=en')
    driver.find_element_by_xpath('//*[@id="page-container"]/div/div[1]/form/fieldset[2]/div[1]/label/input').send_keys(handle)
    # driver.find_element_by_xpath('//*[@id="since"]').send_keys(startdate.strftime('%Y-%m-%d'))
    driver.find_element_by_xpath('//*[@id="until"]').send_keys(enddate.strftime('%Y-%m-%d'))
    time.sleep(1)
    driver.find_element_by_xpath('//*[@id="page-container"]/div/div[1]/form/button').click()

    time.sleep(5)

    elems = driver.find_elements_by_xpath("//*[contains(concat(' ', @class, ' '), ' js-stream-item ')]")
    for elem in elems:
        with open("./" + candidate +"/" + str(enddate) + ".txt","a+") as f:
            f.write("\n##NEW##\n" + elem.text.encode("utf-8"))

driver = webdriver.Chrome('C:/Users/andre/Desktop/chromedriver.exe')    
start_date = datetime.date(2015,3,1)
end_date = datetime.date(2016,2,20)
date_list = datespan(start_date, end_date)

# for i, k in izip(date_list, islice(date_list, 1, None)):
for i in date_list:
    getTweetsForDate(i)
    time.sleep(randint(5,12))
    
driver.quit()
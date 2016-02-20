library(lubridate)
library(dplyr)
library(reshape2)
library(ggplot2)

df <- read.csv('/Volumes/hd.2/Code/KodingHackathon/2016-national-gop-primary.csv')

# parse Start.Date and End.Date into POSIXct date-time objects
df$Start.Date <- parse_date_time(df$Start.Date,orders='ymd',tz='UTC')
df$End.Date <- parse_date_time(df$End.Date,orders='ymd',tz='UTC')

# Rename Entry.Date.Time..ET.
names(df)[names(df)=="Entry.Date.Time..ET."] <- "Entry.Date.Time"

# remove duplicate field and parse date time for Entry.Date.Time
df$Entry.Date.Time <- df$Entry.Date.Time %>%
  as.character() %>%
  substr(1,23) %>%
  parse_date_time(orders='ymd hms',
                  tz = 'UTC')

# calculate length of poll
df <- mutate(df,
             Poll.Length = difftime(End.Date,
                                    Start.Date,
                                    tz='UTC',
                                    units='days'))

# parse Start.Date time field
df$DOW <- strftime(df$Start.Date,origin='1970-01-01',tz='UTC',format='%w')
df$Weekday <- weekdays(df$Start.Date)
df$Month <- strftime(df$Start.Date,origin='1970-01-01',tz='UTC',format='%m')
df$MonthName <- strftime(df$Start.Date,origin='1970-01-01',tz='UTC',format='%B')
df$Quarter <- quarter(df$Start.Date)
df$Year <- strftime(df$Start.Date,origin='1970-01-01',tz='UTC',format='%Y')

# output the cleaned csv
write.csv(df,"gop_primary_clean.csv")

# now, for the fancy stuff...
ggplot(df,aes(x=Number.of.Observations,color=Affiliation,fill=Affiliation)) + 
  geom_histogram(aes(y=..density..),binwidth=50,fill='white',alpha=0.5) +
  geom_density(alpha=0.6)

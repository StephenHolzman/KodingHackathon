library(lubridate)
library(dplyr)
library(reshape2)
library(ggplot2)

#########################################################
# GOP
#########################################################

gop <- read.csv('~/Desktop/2016-national-gop-primary.csv')

# parse Start.Date and End.Date into POSIXct date-time objects
gop$Start.Date <- parse_date_time(gop$Start.Date,orders='ymd',tz='UTC')
gop$End.Date <- parse_date_time(gop$End.Date,orders='ymd',tz='UTC')

# Rename Entry.Date.Time..ET.
names(gop)[names(gop)=="Entry.Date.Time..ET."] <- "Entry.Date.Time"

# remove duplicate field and parse date time for Entry.Date.Time
gop$Entry.Date.Time <- gop$Entry.Date.Time %>%
  as.character() %>%
  substr(1,23) %>%
  parse_date_time(orders='ymd hms',
                  tz = 'UTC')

# calculate length of poll
gop <- mutate(gop,
             Poll.Length = difftime(End.Date,
                                    Start.Date,
                                    tz='UTC',
                                    units='days'))

# parse Start.Date time field
gop$DOW <- strftime(gop$Start.Date,origin='1970-01-01',tz='UTC',format='%w')
gop$Weekday <- weekdays(gop$Start.Date)
gop$Month <- strftime(gop$Start.Date,origin='1970-01-01',tz='UTC',format='%m')
gop$MonthName <- strftime(gop$Start.Date,origin='1970-01-01',tz='UTC',format='%B')
gop$Quarter <- quarter(gop$Start.Date)
gop$Year <- strftime(gop$Start.Date,origin='1970-01-01',tz='UTC',format='%Y')

# output the cleaned csv
write.csv(gop,"gop_primary_clean.csv")

# now, for the fancy stuff...
ggplot(gop,aes(x=Number.of.Observations,color=Affiliation,fill=Affiliation)) + 
  geom_histogram(aes(y=..density..),binwidth=50,fill='white',alpha=0.5) +
  geom_density(alpha=0.6)

qplot(Start.Date,Number.of.Observations,color=Affiliation,data=gop) + geom_point()

# Calculate the average by Start.Date
gop_candidates <- c("Trump",
                    "Cruz",
                    "Rubio",
                    "Carson",
                    "Kasich",
                    "Bush",
                    "Christie",
                    "Fiorina",
                    "Gilmore",
                    "Graham",
                    "Huckabee",
                    "Jindal",
                    "Pataki",
                    "Perry",
                    "Rand.Paul",
                    "Santorum",
                    "Walker",
                    "Undecided")

# initialize daily averages gop
gop_daily_avg <- aggregate(gop[gop_candidates[1:length(gop_candidates)]],
                       by=list(gop$Start.Date),
                       FUN=mean) %>% 
  data.frame()

names(gop_daily_avg)[1] <- "Date"

gop_daily_avg$DOW <- strftime(gop_daily_avg$Date,origin='1970-01-01',tz='UTC',format='%w')
gop_daily_avg$Weekday <- weekdays(gop_daily_avg$Date)
gop_daily_avg$Month <- strftime(gop_daily_avg$Date,origin='1970-01-01',tz='UTC',format='%m')
gop_daily_avg$MonthName <- strftime(gop_daily_avg$Date,origin='1970-01-01',tz='UTC',format='%B')
gop_daily_avg$Quarter <- quarter(gop_daily_avg$Date)
gop_daily_avg$Year <- strftime(gop_daily_avg$Date,origin='1970-01-01',tz='UTC',format='%Y')

write.csv(gop_daily_avg,'~/Desktop/gop_daily_avg.csv')

#########################################################
# Democrats
#########################################################

dem <- read.csv('~/Desktop/2016-national-democratic-primary.csv')

# parse Start.Date and End.Date into POSIXct date-time objects
dem$Start.Date <- parse_date_time(dem$Start.Date,orders='ymd',tz='UTC')
dem$End.Date <- parse_date_time(dem$End.Date,orders='ymd',tz='UTC')

# Rename Entry.Date.Time..ET.
names(dem)[names(dem)=="Entry.Date.Time..ET."] <- "Entry.Date.Time"

# remove duplicate field and parse date time for Entry.Date.Time
dem$Entry.Date.Time <- dem$Entry.Date.Time %>%
  as.character() %>%
  substr(1,23) %>%
  parse_date_time(orders='ymd hms',
                  tz = 'UTC')

# calculate length of poll
dem <- mutate(dem,
              Poll.Length = difftime(End.Date,
                                     Start.Date,
                                     tz='UTC',
                                     units='days'))

# parse Start.Date time field
dem$DOW <- strftime(dem$Start.Date,origin='1970-01-01',tz='UTC',format='%w')
dem$Weekday <- weekdays(dem$Start.Date)
dem$Month <- strftime(dem$Start.Date,origin='1970-01-01',tz='UTC',format='%m')
dem$MonthName <- strftime(dem$Start.Date,origin='1970-01-01',tz='UTC',format='%B')
dem$Quarter <- quarter(dem$Start.Date)
dem$Year <- strftime(dem$Start.Date,origin='1970-01-01',tz='UTC',format='%Y')

# output the cleaned csv
write.csv(dem,"dem_primary_clean.csv")

# now, for the fancy stuff...
ggplot(dem,aes(x=Number.of.Observations,color=Affiliation,fill=Affiliation)) + 
  geom_histogram(aes(y=..density..),binwidth=50,fill='white',alpha=0.5) +
  geom_density(alpha=0.6)

qplot(Start.Date,Number.of.Observations,color=Affiliation,data=dem) + geom_point()

# Calculate the average by Start.Date
dem_candidates <- c("Clinton",
                    "Sanders",
                    "Biden",
                    "Chafee",
                    "Lessig",
                    "O.Malley",
                    "Webb",
                    "Undecided")

# initialize daily averages dem
dem_daily_avg <- aggregate(dem[dem_candidates[1:length(dem_candidates)]],
                           by=list(dem$Start.Date),
                           FUN=mean) %>% 
  data.frame()

names(dem_daily_avg)[1] <- "Date"

dem_daily_avg$DOW <- strftime(dem_daily_avg$Date,origin='1970-01-01',tz='UTC',format='%w')
dem_daily_avg$Weekday <- weekdays(dem_daily_avg$Date)
dem_daily_avg$Month <- strftime(dem_daily_avg$Date,origin='1970-01-01',tz='UTC',format='%m')
dem_daily_avg$MonthName <- strftime(dem_daily_avg$Date,origin='1970-01-01',tz='UTC',format='%B')
dem_daily_avg$Quarter <- quarter(dem_daily_avg$Date)
dem_daily_avg$Year <- strftime(dem_daily_avg$Date,origin='1970-01-01',tz='UTC',format='%Y')

write.csv(dem_daily_avg,'~/Desktop/dem_daily_avg.csv')


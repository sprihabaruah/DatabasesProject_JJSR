import psycopg2
import json

import sys
reload(sys)  # Reload does the trick!
sys.setdefaultencoding('UTF8')


conn = psycopg2.connect(database = "groupjjsr", user="groupjjsr", password="groupjjsrpassword", host="groupjjsr.cup5jjaxtuqn.us-west-2.rds.amazonaws.com", port="5432")

print "database opened successfully"

cur = conn.cursor()

# cur.execute(''')

cur.execute('''CREATE TABLE PersonInfo (
name text NOT NULL,
adult boolean,
personId integer PRIMARY KEY NOT NULL,
dayofbirth text,
dayofdeath text
);''')

cur.execute('''CREATE TABLE MovieInfo (
revenue integer,
movieId integer PRIMARY KEY NOT NULL,
originaltitle text,
votes integer,
title text NOT NULL,
tagline text,
directorId integer REFERENCES PersonInfo (personId),
adult boolean,
popularity double precision,
budget integer,
releasedate text,
userrating double precision,
runtime integer
);''')

cur.execute('''CREATE TABLE Roles (
movieId integer REFERENCES MovieInfo (movieId),
personId integer REFERENCES PersonInfo (personId) NOT NULL,
character text,
PRIMARY KEY (movieid, personId, character)
);''')

conn.commit()

print "table created successfully"

personIdsSeen = []
with open("TMDBPersonInfo") as f:
    
    count = 0
    thousandQueries = ""
    lineNumber = 1
    for line in f:

       # change string type to dict type
        dict = json.loads(line)
        name = dict["name"]
        name =  name.replace("'","")
        adult = dict["adult"]
        personId = dict["personId"]
        dayofbirth = dict["dayofbirth"]
        dayofdeath = dict["dayofdeath"]
        query  = "INSERT INTO PersonInfo (name, adult, personId, dayofbirth, dayofdeath) VALUES (" + "'" + str(name) + "', '" + str(adult) + "', '" + str(personId) + "', '" + str(dayofbirth) + "', '" + str(dayofdeath) + "')"  
        thousandQueries += query + ";"
        count += 1
        lineNumber += 1

        if (lineNumber == 184524):
            count = 1000
        if (count == 1000):
            print("1000 insertions successful")
            cur.execute(thousandQueries)
            count = 0
            thousandQueries = ""
            conn.commit()
            print("Next 1000")

            
    

print "Done populating PersonInfo."

print "Now populating MovieInfo and Roles..."

with open("TMDBMovieInfo") as f:
    count = 0
    thousandQueries = ""
    thousandQueries2 = ""
    lineNumber = 1
    roleEmptyNumber = 1

    for line in f:
        dict = json.loads(line)
        revenue = 0#dict["revenue"] * 1L
        movieId = dict["id"]
        originaltitle = dict["originaltitle"]
        originaltitle = originaltitle.replace("'","")
        votes = dict["votes"]
        title = dict["title"]
        title = title.replace("'","")
        tagline = dict["tagline"]
        tagline = tagline.replace("'","")
        adult = dict["adult"]
        popularity = dict["popularity"]
        budget = 0#dict["budget"] * 1L
        releasedate = dict["releasedate"]
        userrating = dict["userrating"]
        runtime = dict["runtime"]
        if (runtime == ''):
            runtime = 500
        for dictPair in dict["crew"]:
            if (dictPair["job"] == "Director"):
                directorId = dictPair["personId"]

        query = "INSERT INTO MovieInfo (revenue, movieId, originaltitle, votes, title, tagline, directorId, adult, popularity, budget, releasedate, userrating, runtime) VALUES (" + "'" + str(revenue) + "', '" + str(movieId) + "', '" + str(originaltitle) + "', '" + str(votes) + "', '" + str(title) + "', '" + str(tagline) + "', '" + str(directorId) + "', '" + str(adult) + "', '"  + str(popularity) + "', '" + str(budget) + "', '" + str(releasedate) + "', '" + str(userrating) + "', '" + str(runtime) +"')" 
        thousandQueries += query + ";"

        for dictPair2 in dict["cast"]:
            rolePersonId = dictPair2["personId"]
            roleMovieId = movieId
            roleCharacter = dictPair2["character"]
            roleCharacter = roleCharacter.replace("'","")
            if (roleCharacter == ''):
                roleCharacter = roleEmptyNumber
                roleEmptyNumber += 1

            query2 = "INSERT INTO Roles(movieId, personId, character) VALUES (" + "'" + str(roleMovieId) + "', '" + str(rolePersonId) + "', '" + str(roleCharacter) + "')"
            thousandQueries2 += query2 + ";"
        
        count += 1
        lineNumber += 1

        if (lineNumber == 26878):

            print("starting the last set")
            cur.execute(thousandQueries)
            cur.execute(thousandQueries2)
            conn.commit()
            print("done committing everything")


        if (count == 1000):
            print("1000 insertions successful")
            count = 0
            cur.execute(thousandQueries)
            cur.execute(thousandQueries2)
            conn.commit()
            thousandQueries = ""
            thousandQueries2 = ""
            print("next 1000")




print "DONE POPULATING EVERYTHING!!!!!!"

conn.commit()
conn.close()
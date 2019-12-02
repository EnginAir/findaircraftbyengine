# findaircraftbyengine
Finds aircraft by engine code based on public registration data released by the FAA

# Running the code
The code as it is right now requires data to be placed in specific locations in the Mongo database, so the first step
is to configure the Mongo database.

## Configuring the backend
MongoDB requires the following setup:
- MongoDB must be running locally on the machine in which you are running this application
- MongoDB cannot have any authentication enabled
- MongoDB must have a database created named "enginair"

Once MongoDB is setup, we need to import the documents into the correct collections. We will need to collect the ENGINES.csv,
and the MASTER.csv files from the (FAA's official website)[https://www.faa.gov/licenses_certificates/aircraft_certification/aircraft_registry/releasable_aircraft_download/].

Once we have these files, we will convert them to JSON files to be imported, and import them to MongoDB:
```bash
$ csvtojson ENGINE.txt > ENGINE.json
$ csvtojson MASTER.txt > MASTER.json

$ mongoimport --db enginair --collection engines --jsonArray --file ENGINE.json
$ mongoimport --db enginair --collection registration --jsonArray --file MASTER.json
```

## Executing the software
Make sure to run `npm install` in order to grab all the dependencies we need. Then run the software with `node ./index.js`.
The software will generate an Excel document named "output.xlsx", which can be used. It contains all the fields of the
aircraft that possess the engines requested.

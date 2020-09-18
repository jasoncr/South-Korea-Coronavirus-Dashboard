# import necessary libraries
from flask import Flask, render_template
from flask_sqlalchemy import SQLAlchemy
import psycopg2
from psycopg2.extras import RealDictCursor
import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine
from sqlalchemy import func
import pandas as pd
from configs import password
from flask_migrate import Migrate
import numpy as np
import json

#################################################
# Database Setup
#################################################
conn = psycopg2.connect(
    host="localhost", 
    port = 5432, 
    database="S_Korean_Covid_db", 
    user="postgres", 
    password=password)
cur = conn.cursor()


# create instance of Flask app
app = Flask(__name__)

# create route that renders index.html template
@app.route("/")
def index():
    # creates cursor
    cur = conn.cursor()
    # creates list of arrays of the provinces/cities, confirmed cases, deceased, their average temperature
    # should be the data for the temp vs cases scatter plot
    cur.execute("""
    SELECT time_province.province, time_province.confirmed, time_province.deceased, Avg_temp
    FROM time_province
    INNER JOIN 
        (SELECT province, AVG(avg_temp) as Avg_temp
            FROM weather
            GROUP BY province) weather
    ON weather.province = time_province.province
    """)
    weather_results = cur.fetchall() # query results is a list of arrays

    # creates list of arrays of the latitude and longitude of cases
    # should be the data for the heatmap
    cur.execute("""
    SELECT latitude, longitude
    FROM region
    """)
    heatmap_results = cur.fetchall() # query results is a list of arrays

    # creates list of arrays of the province totals with confirmed and deceased included
    # should be the data for the province barchart
    cur.execute("""
        SELECT province, confirmed, deceased
        FROM time_province
        """)
    barchar_results = cur.fetchall() # query results is a list of arrays

    # creates list of arrays of the breakdown of cases and deaths by age group
    # should be the data for the age pie chart
    cur.execute("""
    SELECT age, confirmed, deceased
    FROM time_age
    """)
    pie_age_results = cur.fetchall() # query results in a list of arrays




    return render_template("index.html", 
        scatter_data = weather_results, 
        heatmap_data=heatmap_results,
        barchar_data = barchar_results,
        pie_age_data = pie_age_results)

    # close the cursor
    cur.close()

    # close the connection
    conn.close()

if __name__ == "__main__":
    app.run(debug=True)

# multiple csv files - done
# pull csvs to db - done
# do calculations inside db alchemy etl
# pull data into flask - converts db useable form
# push json information to html dashboard



# note: unit 10 day 3  / check out titanic data as well
# heroku - more support - instead of github pages
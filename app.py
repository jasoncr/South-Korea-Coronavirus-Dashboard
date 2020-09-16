# import necessary libraries
from flask import Flask, render_template
import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine
from sqlalchemy import func


# Create an engine for the chinook.sqlite database
engine = create_engine("sqlite:///../Resources/chinook.sqlite", echo=False)

# Reflect Database into ORM classes
Base = automap_base()
Base.prepare(engine, reflect=True)
Base.classes.keys()

 # Save a reference to the invoices table as `Invoices`
Invoices = Base.classes.invoices

# Create a database session object
session = Session(engine)

# List all of the countries found in the invoices table
session.query(Invoices.BillingCountry).group_by(Invoices.BillingCountry).all()

 # Design a query that lists the invoices totals for each billing country 
# and sort the output in descending order.
session.query(Invoices.BillingCountry, func.sum(Invoices.Total)).\
    group_by(Invoices.BillingCountry).\
    order_by(func.sum(Invoices.Total).desc()).all()


# Save a reference to the invoice_items table as `Items`
Items = Base.classes.invoice_items    


# List all of the Billing Postal Codes for the USA.
results = session.query(Invoices.BillingPostalCode).\
    filter(Invoices.BillingCountry == 'USA').group_by(Invoices.BillingPostalCode).all()







# create instance of Flask app
app = Flask(__name__)


# create route that renders index.html template
@app.route("/")
def index():
    team_list = ["Jumpers", "Dunkers", "Dribblers", "Passers"]
    return render_template("index.html", list=team_list)


if __name__ == "__main__":
    app.run(debug=True)

# multiple csv files - done
# pull csvs to db - done
# do calculations inside db alchemy etl
# pull data into flask - converts db into json
# push json information to html dashboard



# note: unit 10 day 3  / check out titanic data as well
# heroku - more support - instead of github pages
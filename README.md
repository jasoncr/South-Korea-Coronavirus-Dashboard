#  South-Korea-Coronavirus-Dashboard

This is a joint project created by Gabe Djeudeu, Eli Krash, and Jason Cristini. We wanted to determine the impact of coronavirus around the world and started with a well documented country's statistics like South Korea. We also wanted to answer questions like: is there a correlation between contractions and temperature, which province was hit the hardest, what age group contracted the at the highest percent, and which age group was a the greatest risk of death. In order to do this, we started with multiple csv's from Kaggle.com which reported the cases, deaths, locations, ages, and other important metrics and loaded them into a PostgreSQL database. We then used a Flask API to access the database and run the visualizations. 

The first visualization is a user responsive map that displays the province that the user inputs. This map has markers on it that display both the number of cases as well as the deaths in that province. Below are images of this map. 

<img src="Images/entire_country_map.png" width=500 height=250> <img src="Images/seoul_popup.png" width=500 height=250>  

Next we wanted to answer the question about correlation between average temperature per province and number of cases. Below is that visualization. As you can see from the scatter plot, there does not seem to be any correlation between the average temperature and number of cases, with Daegu being a large outlyer. 

<img src="Images/temp_v_cases.png" width=900>

Then we wanted to visualize how the cases were by province as well as how they number of cases per province related to the entire country. In the image below, you can compare each province's number of cases and how the number at Daegu is over half of the nation's cases. 

<img src="Images/province_v_cases.png" width=900>

Lastly, to see the affects by age group created 2 pie charts. The first is the percent of total cases by age group. The second is the percent of mortality by age group. As you can see, the younger Koreans make up the most of the cases, but the percentage of deaths are mosting coming from the elderly. 

<img src="Images/confirmed_by_age_pie.png" width=450> <img src="Images/mortality_by_age_pie.png" width=450>  

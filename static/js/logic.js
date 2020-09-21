// dictionary of the cities and their lat and long coordinates
var city_dict = {
    'Seoul': [37.566536, 126.977966],
    'Busan': [35.179554, 129.075638],
    'Daegu': [35.871433, 128.601440],
    'Incheon': [37.456257, 126.705208],
    'Gwangju' : [35.162441, 126.910339],
    'Daejeon': [36.350410, 127.384544],
    'Ulsan': [35.548679, 129.315002],
    'Sejong': [14.000220, 106.495941],
    'Gyeonggi-do': [37.413799, 127.518303],
    'Gangwon-do': [38.780891, 127.521347],
    'Chungcheongbuk-do': [18.472019, -69.902031],
    'Chungcheongnam-do': [36.789796, 127.001849],
    'Jeollabuk-do': [35.721180, 127.141327],
    'Jeollanam-do': [35.016060, 126.710757],
    'Gyeongsangbuk-do': [36.119485, 128.344573],
    'Gyeongsangnam-do': [37.663998, 127.978459],
    'Jeju-do': [33.510139, 126.521927]
};

// Use D3 to select the dropdown menu
d3.selectAll("#selDataset").on("change", updateMenu);
var select = document.getElementById("selDataset");

// Add the test subject id numbers to the drop down list
for (i = 0; i < Object.keys(city_dict).length; i++){
    var id = Object.keys(city_dict)[i];
    var option = document.createElement("option");
    option.text = id;
    option.value = id;
    select.appendChild(option);
};

function updateMenu() {
    // Use D3 to select the dropdown menu
    var dropdownMenu = d3.select("#selDataset");
    // Assign the value of the dropdown menu option to a variable
    var city = dropdownMenu.property("value");
    console.log(city_dict[city])
    new heatmap_func(city)
};

// Start with heatmap at Seoul
var mymap = L.map('mapid').setView([37.566536, 126.977966], 13);

    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox/streets-v11',
        tileSize: 512,
        zoomOffset: -1,
        accessToken: API_KEY
    }).addTo(mymap);

// moves heatmap to new province
function heatmap_func(city) {
    mymap.panTo(new L.LatLng(city_dict[city][0], city_dict[city][1]))
}

// Scatter Plot of Temperature(Celcius) vs Cases
city_name = []
cases = []
avg_temp = []

for (var row = 0; row < scatter_data.length ; row++) {
    city_name.push(scatter_data[row][0])
    cases.push(scatter_data[row][1])
    avg_temp.push(scatter_data[row][3])
}
var trace3 = {
    type: "scatter",
    mode: "markers", 
    name: city_name,
    x: avg_temp,
    y: cases,
    marker: {
        size: 12
    }
};
var layout1 = {
    title : 'Temperature(Celcius) vs Cases',
    xaxis : {title: "Temperatures in Celcius"},
    yaxis : {title : "Coronavirus Cases"}
}
Plotly.newPlot("temp_scatter", [trace3], layout1)

// Number of Cases per Province
cities = []
confirmed = []
total_confirmed = 0

for (var row = 0; row < barchar_data.length ; row++) {
    cities.push(barchar_data[row][0])
    confirmed.push(barchar_data[row][1])
    total_confirmed += barchar_data[row][1]
}
cities.push("South Korea")
confirmed.push(total_confirmed)
var trace = {
    x: cities,
    y : confirmed,
    type : "bar"
};
var layout2 = {
    title : 'Cases by Province',
    xaxis : {title : "Province Name"},
    yaxis : {title : "Number of Cases"}
}

Plotly.newPlot("province_bar", [trace], layout2)

// Age Group Pie
labels = []
values = []
for (var row = 0; row < pie_data.length ; row++) {
    labels.push(pie_data[row][0])
    values.push(pie_data[row][1])
}
var trace1 = {
    labels: labels,
    values : values,
    type : "pie"
};
var layout2 = {
    title: "Age Group with Coronavirus",
    width: 400
}
Plotly.newPlot("age_pie", [trace1], layout2)

// Mortality Pie
labels = []
values = []
for (var row = 0; row < pie_data.length ; row++) {
    labels.push(pie_data[row][0])
    values.push(pie_data[row][2] / pie_data[row][1])
}
var trace2 = {
    labels: labels,
    values : values,
    type : "pie"
};
var layout3 = {
    title: "Mortality Rate by Age Group",
    width: 400
}
Plotly.newPlot("survival_pie", [trace2], layout3)
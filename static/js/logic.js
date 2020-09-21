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
d3.selectAll("#selDataset").on("change", updatePlotly);
var select = document.getElementById("selDataset");

// Add the test subject id numbers to the drop down list
for (i = 0; i < Object.keys(city_dict).length; i++){
    var id = Object.keys(city_dict)[i];
    var option = document.createElement("option");
    option.text = id;
    option.value = id;
    select.appendChild(option);
}

function updatePlotly() {
    // Use D3 to select the dropdown menu
    var dropdownMenu = d3.select("#selDataset");
    // Assign the value of the dropdown menu option to a variable
    var city = dropdownMenu.property("value");
    console.log(city + " " + city_dict[city])
    // heatmap_func(city)
}

// heatmap
/*function heatmap_func(city) {
    var myMap = L.map("case_heatmap", {
        center: city_dict[city],
        zoom: 4
      });
}


L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: "mapbox/streets-v11",
    accessToken: API_KEY
}).addTo(myMap);
  
var heatArray = [35.908, -127.767]

var heat = L.heatLayer(heatArray, {
    radius : 20,
    blur: 35
}).addTo(myMap)


*/
// scatter
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
    title : 'Scatter Title'
}

Plotly.newPlot("temp_scatter", [trace3], layout1)
// bar chart


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

Plotly.newPlot("province_bar", [trace])

// pies

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
var layout = {
    title: "Age"
}
Plotly.newPlot("age_pie", [trace1], layout)


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
var layout = {
    title: "Mortality Rate"
}
Plotly.newPlot("survival_pie", [trace2], layout)
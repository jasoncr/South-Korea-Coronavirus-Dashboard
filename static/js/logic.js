
function myFunc(data) {
    return data
}

var city_list = ['Seoul', 'Busan', 'Daegu', 'Incheon', 'Gwangju', 'Daejeon', 'Ulsan', 'Sejong', 'Gyeonggi-do', 
    'Gangwon-do', 'Chungcheongbuk-do', 'Chungcheongnam-do', 'Jeollabuk-do', 'Jeollanam-do', 
    'Gyeongsangbuk-do', 'Gyeongsangnam-do', 'Jeju-do']

// heatmap
/*var myMap = L.map("case_heatmap", {
    center: [35.908, -127.767],
    zoom: 4
  });

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
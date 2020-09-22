// dictionary of the cities and their lat and long coordinates
var city_dict = {
    'Seoul': [37.566536, 126.977966], 
    'Busan': [35.179554, 129.075638],
    'Daegu': [35.871433, 128.601440],
    'Incheon': [37.456257, 126.705208],
    'Gwangju' : [35.162441, 126.910339],
    'Daejeon': [36.350410, 127.384544],
    'Ulsan': [35.548679, 129.315002],
    'Sejong': [36.487, 127.2822],
    'Gyeonggi-do': [37.413799, 127.518303],
    'Gangwon-do': [37.733, 128.286],
    'Chungcheongbuk-do': [37.558, 127.505],
    'Chungcheongnam-do': [36.789796, 127.001849],
    'Jeollabuk-do': [35.721180, 127.141327],
    'Jeollanam-do': [35.016060, 126.710757],
    'Gyeongsangbuk-do': [36.119485, 128.344573],
    'Gyeongsangnam-do': [37.663998, 127.978459],
    'Jeju-do': [33.510139, 126.521927]
};
var new_dict = {
    'Seoul': [37.566536, 126.977966,  1312, 7],
    'Busan': [35.179554, 129.075638, 154, 3],
    'Daegu': [35.871433, 128.601440, 6906, 189],
    'Incheon': [37.456257, 126.705208, 341, 1],
    'Gwangju' : [35.162441, 126.910339, 44, 0], 
    'Daejeon': [36.350410, 127.384544, 117, 1],
    'Ulsan': [35.548679, 129.315002, 55, 1],
    'Sejong': [36.487, 127.2822, 50, 0],
    'Gyeonggi-do': [37.413799, 127.518303, 1207, 23],
    'Gangwon-do': [37.733, 128.286, 65, 3],
    'Chungcheongbuk-do': [37.558, 127.505, 65, 0],
    'Chungcheongnam-do': [36.789796, 127.001849, 167, 0],
    'Jeollabuk-do': [35.721180, 127.141327, 27, 0],
    'Jeollanam-do': [35.016060, 126.710757, 24, 0],
    'Gyeongsangbuk-do': [36.119485, 128.344573, 1389, 54],
    'Gyeongsangnam-do': [37.663998, 127.978459, 134, 0],
    'Jeju-do': [33.510139, 126.521927, 19, 0]
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

// Run heatmap_func with the selected province
function updateMenu() {
    // Use D3 to select the dropdown menu
    var dropdownMenu = d3.select("#selDataset");
    // Assign the value of the dropdown menu option to a variable
    var city = dropdownMenu.property("value");
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


for (var row = 0; row < Object.keys(new_dict).length ; row++) {
        city = Object.keys(new_dict)[row]
        lat = new_dict[city][0]
        long = new_dict[city][1]
        confirmed = new_dict[city][2]
        deceased = new_dict[city][3]
        const homeMarker = L.marker({ lat: lat, lng: long }, { bounceOnAdd: true });
homeMarker.bindPopup("<p><strong>" + city + "</strong></p><p>Confirmed: " +   confirmed  + 
    "</p><p>Deceased: " + deceased  + "</p>", {
        closeButton: true
    });
homeMarker.addTo(mymap);   
}


// moves heatmap to new province
function heatmap_func(city) {
    mymap.panTo(new L.LatLng(city_dict[city][0], city_dict[city][1]))
};

// Scatter Plot of Temperature(Celcius) vs Cases
city_name = []
cases = []
avg_temp = []
// Loops through and populates the lists needed for the scatter plot
for (var row = 0; row < scatter_data.length ; row++) {
    city_name.push(scatter_data[row][0])
    cases.push(scatter_data[row][1])
    avg_temp.push(scatter_data[row][3])
}

var trace3 = {
    type: "scatter",
    mode: "markers", 
    text : city_name, 
    x: avg_temp,
    y: cases,
    marker: {
        size: 14
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
// Loops through and populates lists for bar chart
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
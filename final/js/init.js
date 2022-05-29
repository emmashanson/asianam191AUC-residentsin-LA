// declare variables
let mapOptions = {'center': [34.0709,-118.444],'zoom':10}

// use the variables
const map = L.map('the_map').setView(mapOptions.center, mapOptions.zoom);

const LTT = {
    lat: 34.047863935864214,
    lng: -118.24065320000001,
    title:"Little Tokyo Towers and Miyako Gardens", 
    iconUrl:""};

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);


// create a function to add markers
function addMarker(lat,lng,title,message){
    console.log(message)
    L.marker([lat,lng]).addTo(map).bindPopup(`<h2>${title}</h2> <h3>${message}</h3>`)
    return message
}


function placeLTTMG(){
    // use this to get the options https://leafletjs.com/examples/custom-icons/
    let LTTicon = L.icon({
        iconUrl: 'NsuSlackIcon2021-2022.png',
    
        iconSize:     [38, 38], // size of the icon
        iconAnchor:   [20, 30], // point of the icon which will correspond to marker's location
        popupAnchor:  [0, -25] // point from which the popup should open relative to the iconAnchor        
    })

    L.marker([LTT.lat,LTT.lng],{icon:LTTicon}).addTo(map).bindPopup(`<h2>${LTT.title}</h2>`)
}

// !!!!STILL MUST BE DONE!!!!
// function that makes lines between previous and current residence
// when you add a new residence on the survey, it makes a new line with that marker

// 1. get markers on the map for both current and previous residence
// 2. make a line between them
//      a. the current residence has the same point.
//      b. the previous residence needs to be added 

const dataUrl = "https://docs.google.com/spreadsheets/d/e/2PACX-1vRQBjw2ziwA5er6vQq8az6tdKFe2ztPxz4CckE7OZaM9L0p7OMLnzi8QKNmsMdPZjWgJCEDQdUfOIW8/pub?output=csv"

function loadData(url){
    Papa.parse(dataUrl, {
        header: true,
        download: true,
        complete: results => processData(results)
    })
}

function processData(results){
    console.log(results)
    placeLTTMG()
    results.data.forEach(data => {
        console.log(data)
        addMarker(data.lat,data.lng, data["location"], data["leavefeel"])
    })
}

// todo: this function to draw the lines based on the lat/lng for each marker
function drawGeodesic(){
    console.log('drawing geodesic')
}

loadData(dataUrl)

const Torrance = {lat: 33.8291867, lng: -118.3169714};
const Glendale = {lat: 34.1980641, lng: -118.2351192};
const EastLA = {lat: 34.0440239, lng: -118.1854042}; 
const Westwood = {lat: 34.0631451, lng: -118.4367551}; 

const LTTtorrance = new L.Geodesic([LTT, Torrance]).addTo(map);
const LTTglendale = new L.Geodesic([LTT, Glendale]).addTo(map);
const LTTEastLA = new L.Geodesic([LTT, EastLA]).addTo(map);
const LTTWestwood = new L.Geodesic([LTT, Westwood]).addTo(map);

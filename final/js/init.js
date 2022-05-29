// declare variables
let mapOptions = {'center': [34.0709,-118.444],'zoom':10}

// use the variables
const map = L.map('the_map').setView(mapOptions.center, mapOptions.zoom);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);


// create a function to add markers
function addMarker(lat,lng,title,message){
    console.log(message)
    L.marker([lat,lng]).addTo(map).bindPopup(`<h2>${title}</h2> <h3>${message}</h3>`)
    return message
}

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
    results.data.forEach(data => {
        console.log(data)
        addMarker(data.lat,data.lng, data["location"], data["leavefeel"])
    })
}

loadData(dataUrl)

const LTT = {lat: 34.047863935864214, lng: -118.24065320000001};
const Torrance = {lat: 33.8291867, lng: -118.3169714};
const Glendale = {lat: 34.1980641, lng: -118.2351192};
const EastLA = {lat: 34.0440239, lng: -118.1854042}; 
const Westwood = {lat: 34.0631451, lng: -118.4367551}; 

const LTTtorrance = new L.Geodesic([LTT, Torrance]).addTo(map);
const LTTglendale = new L.Geodesic([LTT, Glendale]).addTo(map);
const LTTEastLA = new L.Geodesic([LTT, EastLA]).addTo(map);
const LTTWestwood = new L.Geodesic([LTT, Westwood]).addTo(map);

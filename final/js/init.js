// declare variables
let mapOptions = {'center': [34.0709,-118.444],'zoom':10}

// use the variables
const map = L.map('the_map').setView(mapOptions.center, mapOptions.zoom);

let highlivingcosts = 0;
let highhousingcosts = 0;
let loneliness = 0;
let lackaccess = 0;
let publictransit = 0;
let housingtype = 0;
let disability = 0;
let other = 0;
let surveytotal = 0;

let CartoDB_Positron = L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
	attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
	subdomains: 'abcd',
	maxZoom: 20
});

CartoDB_Positron.addTo(map);

const LTT = {
    lat: 34.047863935864214,
    lng: -118.24065320000001,
    title:"Little Tokyo Towers and Miyako Gardens", 
    iconUrl:""};


// create a function to add markers
function addMarker(lat,lng,title,message){
    console.log(message)
    L.circleMarker([lat,lng],
        {
            radius: 5,
            weight: 2,
            opacity: 1000,
            fillOpacity: 100,
        }).addTo(map).bindPopup(`<h2>${title}</h2> <h3>${message}</h3>`)
    return message
}

function incrementsurveydata(surveydata){
    let reasonforleaving = surveydata["Which, if any, of the following factors affected your decision to leave your previous residence?"]

    if (reasonforleaving.includes("High cost of living")){
        highlivingcosts += 1;  
    }
    if (reasonforleaving.includes("Loneliness")){
        loneliness += 1;
    }
    if (reasonforleaving.includes("Lack of access to Japanese groceries, Japanese services, etc.")){
        lackaccess += 1;
    }
    if (reasonforleaving.includes( "Difficulty accessing public transit / neighborhood not walkable")){
            publictransit += 1;
    }     
    if (reasonforleaving.includes( "Housing type no longer suitable (i.e. house too big, no elevator, etc)")){
            housingtype += 1;
    }      
    if (reasonforleaving.includes( "Disability (physical or mental)")){
            disability += 1;
    }      
    if (reasonforleaving.includes( "Other:")){
            other += 1;
    }
    surveytotal += 1;      
 }
    

//let factorsForLeaving = ['highliving','loneliness','lackaccess']

// extra credit :)
// function generateDatafromQuestions(questionType){
//     if (questionType == "factorsForLeaving"){
//         factorsForLeaving.forEach(theFactor => console.log(`total % ${theFactor}: ${findpercentage(theFactor)}%`))
//     }
// }

function addFactorDatatotable(){

    let tableHeader = document.getElementById('tableColumnHeader')
    let dataTable = document.getElementById('dataTable')

    tableHeader.innerHTML = "What were your factors for leaving your previous residence?"

    let contentsForThisRow = "<tr><td> High cost of living</td><td>"+highlivingcosts+"</td></tr>"

    dataTable.innerHTML += contentsForThisRow

    console.log(`total count high living costs: ${highlivingcosts}`)
    console.log(`total % high living costs: ${findpercentage(highlivingcosts)}%`)
    console.log(`total % other costs: ${findpercentage(other)}%`) 
    console.log(`total % disability costs: ${findpercentage(disability)}%`)
}

function findpercentage(questiontotal){
    console.log(`this percentage = ${questiontotal/surveytotal * 100}%`)
    return questiontotal/surveytotal * 100
}

function placeLTTMG(){
    // use this to get the options https://leafletjs.com/examples/custom-icons/
    let LTTicon = L.icon({
        iconUrl: 'https://www.pngkey.com/png/full/775-7750278_apartment-building-orange-green-yellow.png',
    
        iconSize:     [40, 40], // size of the icon
        iconAnchor:   [20, 30], // point of the icon which will correspond to marker's location
        popupAnchor:  [0, -25] // point from which the popup should open relative to the iconAnchor        
    })

    L.marker([LTT.lat,LTT.lng],{icon:LTTicon}).addTo(map).bindPopup(`<h2>${LTT.title}</h2>`)
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
    placeLTTMG()
    results.data.forEach(data => {
        console.log(data)
        addMarker(data.lat,data.lng, data["location"], data["leavefeel"])
        // look up online
        let latLng = [data.lat,data.lng] 
        let thisDataLineDirection = calculateLTTOffsets(latLng)
        // will return as northwest, southwest, northeast, southeast
        addSwoopy(data,thisDataLineDirection)
        incrementsurveydata(data)
    })
    addFactorDatatotable()
}

function calculateLTTOffsets(latLng){
// array of latlngs latlng = [34,-118]

    let differenceBetweenLat = LTT.lat - latLng[0]
    let differenceBetweenLng = LTT.lng - latLng[1]

    // is difference between lat and lng negative or positive?
    if (differenceBetweenLat < 0 && differenceBetweenLng < 0){
        // both negative
        return "SouthWest"
    }
}

// step1 - load the data to draw the lines from
// todo: this function to draw the lines based on the lat/lng for each marker
function addSwoopy(startingData,directionOffset){
    let offSet = [0,0]
    if (directionOffset == "SouthWest"){
        // draw a line from the marker to the LTT
        // add the for SouthWest
        offSet = [10,10]
        }
    // change the offset based on the direction
    let shiftedLTTlat = LTT.lat + offSet[0]
    let shiftedLTTlng = LTT.lng + offSet[1]
    
    // addTo Layer so you can remove it layter
    L.swoopyArrow([startingData.lat,startingData.lng], [shiftedLTTlat,shiftedLTTlng], {
            weight: 1,
            iconAnchor: [20, 10],
            iconSize: [20, 16]
          }).addTo(map);
    console.log('drawing swoopies')
}

function addTable(){
    let myTable = 
    `
    <table>
        <tr>
            <th>Reason For Leaving</th>
            <th>Percentage of Respondents</th>
        </tr>

        <tr>
            <td>High Living Costs</td>
        </tr>
        <tr><td>High Housing Costs</td></tr>
        <tr><td>Loneliness</td></tr>
        <tr>
            <td>Lack of access to Japanese businesses</td>
        </tr> 
        <tr><td>Public Transit Difficulties</td></tr> 
        <tr><td>Not Suitable Housing Type</td></tr> 
            <tr> <td>Disability</td></tr>
        <tr><td>Other</td></tr> 
    </table>
    `

    // new addTable(document.getElementById('table-container').innerHTML = myTable);
}

function populateTable(data){

}


addTable()
loadData(dataUrl)

const Torrance = L.swoopyArrow([33.8291867, -118.3169714], [34.04, -118.27], {
    weight: 1,
    iconAnchor: [20, 10],
    iconSize: [20, 16]
  }).addTo(map);

const Glendale = L.swoopyArrow([34.1980641, -118.2351192], [34.08, -118.23], {
    weight: 1,
    iconAnchor: [20, 10],
    iconSize: [20, 16]
  }).addTo(map);

const EastLA = L.swoopyArrow([34.0440239, -118.1854042], [34.05, -118.23], {
    weight: 1,
    iconAnchor: [20, 10],
    iconSize: [20, 16]
  }).addTo(map);

const Westwood = L.swoopyArrow([34.0631451, -118.4367551], [34.05, -118.27], {
    weight: 1,
    iconAnchor: [20, 10],
    iconSize: [20, 16]
  }).addTo(map);

// let swoopyForZoomLevel10{

// }

//
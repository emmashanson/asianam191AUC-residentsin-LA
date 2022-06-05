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

let highlivingcosts2 = 0;
let highhousingcosts2 = 0;
let loneliness2 = 0;
let lackaccess2 = 0;
let publictransit2 = 0;
let housingtype2 = 0;
let disability2 = 0;
let other2 = 0;
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
    if (reasonforleaving.includes("High housing costs")){
        highhousingcosts += 1;
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
  
    
    let reasonformoving = surveydata["Which, if any, of the following factors affected your decision to move to LTT/Miyako Gardens?"]
    if (reasonformoving.includes("Lower cost of living")){
        highlivingcosts2 += 1;  
    }
    if (reasonformoving.includes("Lower housing costs")){
        highhousingcosts2 += 1;
    }
    if (reasonformoving.includes("Cultural connection / sense of community")){
        loneliness2 += 1;
    }
    if (reasonformoving.includes("Access to Japanese groceries, Japanese services etc.")){
        lackaccess2 += 1;
    }
    if (reasonformoving.includes( "Access to public transit / walkable community")){
            publictransit2 += 1;
    }     
    if (reasonformoving.includes( "Housing type more suitable (1-2 bedroom apartment)")){
            housingtype2 += 1;
    }      
    if (reasonformoving.includes( "Better able to cope with disabilitie(s)")){
            disability2 += 1;
    }      
    if (reasonformoving.includes( "Other:")){
            other2 += 1;
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

    let contentsForThisRow = `<tr><td> High cost of living</td><td><div> <div class="barchart" ${findpercentage(highlivingcosts)}></div>${findpercentage(highlivingcosts)}</div></td></tr>`
    contentsForThisRow += "<tr><td> High housing costs</td><td>"+findpercentage(highhousingcosts)+"</td></tr>"
    contentsForThisRow += "<tr><td> Loneliness</td><td>"+findpercentage(loneliness)+"</td></tr>"
    contentsForThisRow += "<tr><td> Lack of access to Japanese groceries, Japanese services, etc.</td><td>"+findpercentage(lackaccess)+"</td></tr>"
    contentsForThisRow += "<tr><td> Difficulty accessing public transit / neighborhood not walkable</td><td>"+findpercentage(publictransit)+"</td></tr>"
    contentsForThisRow += "<tr><td> Housing type no longer suitable (i.e. house too big, no elevator, etc</td><td>"+findpercentage(housingtype)+"</td></tr>"
    contentsForThisRow += "<tr><td> Disability (physical or mental)</td><td>"+findpercentage(disability)+"</td></tr>"
    contentsForThisRow += "<tr><td> Other</td><td>"+findpercentage(other)+"</td></tr>"

    dataTable.innerHTML += contentsForThisRow

    let tableHeader2 = document.getElementById('tableColumnHeader2')
    let dataTable2 = document.getElementById('dataTable2')
    tableHeader2.innerHTML = "What were your factors for moving to Little Tokyo Towers/Miyako Gardens?"

    let contentsForThisRow2 = "<tr><td> Lower cost of living</td><td>"+findpercentage(highlivingcosts2)+"</td></tr>"
    contentsForThisRow2 += "<tr><td> Lower housing costs</td><td>"+findpercentage(highhousingcosts2)+"</td></tr>"
    contentsForThisRow2 += "<tr><td> Cultural connection / sense of community</td><td>"+findpercentage(loneliness2)+"</td></tr>"
    contentsForThisRow2 += "<tr><td> Access to Japanese groceries, Japanese services etc.</td><td>"+findpercentage(lackaccess2)+"</td></tr>"
    contentsForThisRow2 += "<tr><td> Access to public transit / walkable community</td><td>"+findpercentage(publictransit2)+"</td></tr>"
    contentsForThisRow2 += "<tr><td> Housing type more suitable (1-2 bedroom apartment)</td><td>"+findpercentage(housingtype2)+"</td></tr>"
    contentsForThisRow2 += "<tr><td> Better able to cope with disabilitie(s)</td><td>"+findpercentage(disability2)+"</td></tr>"
    contentsForThisRow2 += "<tr><td> Other</td><td>"+findpercentage(other2)+"</td></tr>"

    dataTable2.innerHTML += contentsForThisRow2

    console.log(`total count high living costs: ${highlivingcosts}`)
    console.log(`total % high living costs: ${findpercentage(highlivingcosts)}%`)
    console.log(`total % other costs: ${findpercentage(other)}%`) 
    console.log(`total % disability costs: ${findpercentage(disability)}%`)
}

function findpercentage(questiontotal){
    console.log(`this percentage = ${questiontotal/surveytotal * 100}%`)
    return questiontotal/surveytotal * 100 + "%"
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

// it'
// let swoopyForZoomLevel10{

// }

//
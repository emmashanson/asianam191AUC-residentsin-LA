// declare variables
let mapOptions = {'center': [34.0709,-118.444],'zoom':10}

// use the variables
const map = L.map('the_map',{minZoom:10,maxZoom:10}).setView(mapOptions.center, mapOptions.zoom);


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

let tempData = []

CartoDB_Positron.addTo(map);

const LTT = {
    lat: 34.047863935864214,
    lng: -118.24065320000001,
    title:"Little Tokyo Towers and Miyako Gardens", 
    iconUrl:""};

// create a function to add markers
function addMarker(lat,lng,title,message,targetlayer){
    console.log(targetlayer)
    targetlayer.addLayer(L.circleMarker([lat,lng],{
            radius: 5,
            weight: 2,
            opacity: 1000,
            fillOpacity: 100,
        }).bindPopup(`<h2>${title}</h2> <h3>${message}</h3>`))
    return message
}

// 🐧🐧🐧🐧🐧🐧🐧do this for each question you want to filter with🐧🐧🐧🐧🐧🐧🐧🐧🐧🐧🐧
// let lowercostoflivingLayer = L.layerGroup();

// 
// 🐧🐧🐧🐧🐧🐧🐧🐧🐧

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
function filterMap(filter,questionNumber){
    // console.log("hello kristen: " + filter)
    let theQuestionFilter

    if (questionNumber == 1){
        // 🐧🐧🐧🐧🐧🐧🐧do this for each question you want to filter with🐧🐧🐧🐧🐧🐧🐧🐧🐧🐧🐧
        switch(filter){
            case "highcostliving":
                //console.log("highcostliving was clicked")
                theQuestionFilter = "High cost of living";
                break;
            case "highcosthousing":
                theQuestionFilter = "High housing costs";
                break;
            case "lonely":
                theQuestionFilter = "Loneliness";
                break;
            case "noaccess":
                theQuestionFilter = "Lack of access to Japanese groceries, Japanese services, etc.";
                break;
            case "difficulttransit":
                theQuestionFilter = "Difficulty accessing public transit / neighborhood not walkable";
                break;
            case "nosuitablehousing":
                theQuestionFilter = "Housing type no longer suitable (i.e. house too big, no elevator, etc)";
                break;
            case "disabilities":
                theQuestionFilter = "Disability (physical or mental)"
                break;
            case "oth":
                theQuestionFilter = "Other:"
                break;
        }
        // 🐧🐧🐧🐧🐧🐧🐧do this for each question you want to filter with🐧🐧🐧🐧🐧🐧🐧🐧🐧🐧🐧
    }
    if (questionNumber == 2){
        // 🐧🐧🐧🐧🐧🐧🐧do this for each second question you want to filter with🐧🐧🐧🐧🐧🐧🐧🐧🐧🐧🐧
        switch(filter){
            case "lowcostliving":
                //console.log("highcostliving was clicked")
                theQuestionFilter = "Lower cost of living";
                break;
            case "lowcosthousing":
                theQuestionFilter = "Lower housing costs";
                break;
            case "notlonely":
                theQuestionFilter = "Cultural connection / sense of community";
                break;
            case "goodaccess":
                theQuestionFilter = "Access to Japanese groceries, Japanese services etc.";
                break;
            case "goodtransit":
                theQuestionFilter = "Access to public transit / walkable community";
                break;
            case "suitablehousing":
                theQuestionFilter = "Housing type more suitable (1-2 bedroom apartment)";
                break;
            case "disabilitysupport":
                theQuestionFilter = "Better able to cope with disabilitie(s)"
                break;
            case "othe":
                theQuestionFilter = "Other:"
                break;
        }
    }

    filterMapData(theQuestionFilter,questionNumber)
}
let currentData = []

function filterMapData(textToFilterOut,questionNumber){
    // clear the templayer before adding it to map
    tempLayer.clearLayers();

    // console.log("hello kristen: 🐧🐧🐧🐧🐧🐧🐧🐧" + textToFilterOut)

    let theDataQuestion
    if (questionNumber == 1){
        theDataQuestion = 'Which, if any, of the following factors affected your decision to leave your previous residence?'
    }
    if (questionNumber == 2){
        // EXACT TEXT FOR QUESTION TO FILTER
        theDataQuestion = 'Which, if any, of the following factors affected your decision to move to LTT/Miyako Gardens?'
    }

    // loop through the data and add the markers to the templayer
    allData.forEach(data => {

        console.log('allData data')
        console.log(data)
        if (data[theDataQuestion].includes(textToFilterOut)){
            addMarker(data.lat,data.lng,data.title,data.message,tempLayer)

            // tempData list
            //bug: data is not being added to temp data
            tempData.push(data)
            console.log('adding data to temp data!!!!!!!!!!!!!!!')
            console.log(data)
        }
    })
    console.log("🐧🐧🐧🐧")
    console.log(currentData)
    // add tempLayer to map
    tempLayer.addTo(map)

}

function clearMap(){
    // map.removeLayer(LTT)
    // map.remove()
    console.log('hold up, will do this later')
}

function showChart1(){
    document.getElementById("dataTable2").style.display = "none";
    document.getElementById("dataTable").style.display = "block";
}

function showChart2(){
    document.getElementById("dataTable").style.display = "none";
    document.getElementById("dataTable2").style.display = "block";
}

function addFactorDatatotable(){

    let tableHeader = document.getElementById('tableColumnHeader')
    let dataTable = document.getElementById('dataTable')

    tableHeader.innerHTML = "What were your factors for leaving your previous residence?"
    let testBarChart = `<div class="chartcontainer"><div class="charttotal"></div><div class="barchart" style="width:${findpercentage(highlivingcosts)}"> hello</div></div>`
    // dataTable.innerHTML += testBarChart
    // 🐧🐧🐧🐧🐧🐧🐧 add the filterMap function for each row with🐧🐧🐧🐧🐧🐧🐧🐧🐧🐧🐧
    // <tr onclick="filterMap('highcostliving',1)>
    let contentsForThisRow = `<tr onclick="filterMap('highcostliving',1)" class="niceRow"><td> High cost of living</td><td><div class="overallchart"> <div class="chartText">${findpercentage(highlivingcosts)}</div><div class="barchart" style="width:${findpercentage(highlivingcosts)}"></div></div></td></tr>`
    contentsForThisRow += `<tr onclick="filterMap('highcosthousing',1)" class="niceRow"><td> High housing costs</td><td><div class="overallchart"><div class="chartText">${findpercentage(highhousingcosts)}</div><div class="barchart" style="width:${findpercentage(highhousingcosts)}"></div></div></td></tr>`
    contentsForThisRow += `<tr onclick="filterMap('lonely',1)" class="niceRow"><td> Loneliness</td><td> <div class="overallchart"><div class="chartText">${findpercentage(loneliness)}</div><div class="barchart" style="width:${findpercentage(loneliness)}"></div></div></td></tr>`
    contentsForThisRow += `<tr onclick="filterMap('noaccess',1)" class="niceRow"> <td> Lack of access to Japanese groceries, Japanese services, etc.</td><td><div class="overallchart"><div class="chartText">${findpercentage(lackaccess)}</div><div class="barchart" style="width:${findpercentage(lackaccess)}"></div></div></td></tr>`
    contentsForThisRow += `<tr onclick="filterMap('difficulttransit',1)" class="niceRow"><td> Difficulty accessing public transit / neighborhood not walkable</td><td><div class="overallchart"><div class="chartText">${findpercentage(publictransit)}</div><div class="barchart" style="width:${findpercentage(publictransit)}"></div></div></td></tr>`
    contentsForThisRow += `<tr onclick="filterMap('nosuitablehousing',1)" class="niceRow"><td> Housing type no longer suitable (i.e. house too big, no elevator, etc</td><td><div class="overallchart"><div class="chartText">${findpercentage(housingtype)}</div><div class="barchart" style="width:${findpercentage(housingtype)}"></div></div></td></tr>`
    contentsForThisRow += `<tr onclick="filterMap('disabilities',1)" class="niceRow"><td> Disability (physical or mental)</td><td><div class="overallchart"> <div class="chartText">${findpercentage(disability)}</div><div class="barchart" style="width:${findpercentage(disability)}"></div></div></td></tr>`
    contentsForThisRow += `<tr onclick="filterMap('oth',1)" class="niceRow"><td> Other</td><td><div class="overallchart"> <div class="chartText">${findpercentage(other)}</div><div class="barchart" style="width:${findpercentage(other)}"></div></div></td></tr>`

    dataTable.innerHTML += contentsForThisRow

    let tableHeader2 = document.getElementById('tableColumnHeader2')
    let dataTable2 = document.getElementById('dataTable2')
    tableHeader2.innerHTML = "What were your factors for moving to Little Tokyo Towers/Miyako Gardens?"

    let contentsForThisRow2 = `<tr onclick="filterMap('lowcostliving',2)" class="niceRow"><td> Lower cost of living</td><td><div class="overallchart"> <div class="chartText">${findpercentage(highlivingcosts2)}</div><div class="barchart" style="width:${findpercentage(highlivingcosts2)}"></div></div></td></tr>`
    contentsForThisRow2 += `<tr onclick="filterMap('lowcosthousing',2)" class="niceRow"><td> Lower housing costs</td><td><div class="overallchart"><div class="chartText">${findpercentage(highhousingcosts2)}</div><div class="barchart" style="width:${findpercentage(highhousingcosts2)}"></div></div></td></tr>`
    contentsForThisRow2 += `<tr onclick="filterMap('notlonely',2)" class="niceRow"><td> Cultural connection / sense of community</td><td> <div class="overallchart"><div class="chartText">${findpercentage(loneliness2)}</div><div class="barchart" style="width:${findpercentage(loneliness2)}"></div></div></td></tr>`
    contentsForThisRow2 += `<tr onclick="filterMap('goodaccess',2)" class="niceRow"> <td> Access to Japanese groceries, Japanese services etc.</td><td><div class="overallchart"><div class="chartText">${findpercentage(lackaccess2)}</div><div class="barchart" style="width:${findpercentage(lackaccess2)}"></div></div></td></tr>`
    contentsForThisRow2 += `<tr onclick="filterMap('goodtransit',2)" class="niceRow"><td> Access to public transit / walkable community</td><td><div class="overallchart"><div class="chartText">${findpercentage(publictransit2)}</div><div class="barchart" style="width:${findpercentage(publictransit2)}"></div></div></td></tr>`
    contentsForThisRow2 += `<tr onclick="filterMap('suitablehousing',2)" class="niceRow"><td> Housing type more suitable (1-2 bedroom apartment)</td><td><div class="overallchart"><div class="chartText">${findpercentage(housingtype2)}</div><div class="barchart" style="width:${findpercentage(housingtype2)}"></div></div></td></tr>`
    contentsForThisRow2 += `<tr onclick="filterMap('disabilitysupport',2)" class="niceRow"><td> Better able to cope with disabilitie(s)</td><td><div class="overallchart"> <div class="chartText">${findpercentage(disability2)}</div><div class="barchart" style="width:${findpercentage(disability2)}"></div></div></td></tr>`
    contentsForThisRow2 += `<tr onclick="filterMap('othe',2)" class="niceRow"><td> Other</td><td><div class="overallchart"> <div class="chartText">${findpercentage(other2)}</div><div class="barchart" style="width:${findpercentage(other2)}"></div></div></td></tr>`

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

let tempLayer = L.layerGroup()
let allData = []

function processData(results){
    console.log(results)
    placeLTTMG()
    results.data.forEach(data => {
        console.log(data)
        addEverythingToMap(data)
        incrementsurveydata(data)
    })
    addFactorDatatotable()

    // allLayers = L.featureGroup([lowercostoflivingLayer,lowerhousingcostsLayer,lonelinessLayer,lackaccessLayer,publictransitLayer,housingtypeLayer,disabilityLayer,otherLayer,lowercostoflivingLayer2,lowerhousingcostsLayer2,lonelinessLayer2,lackaccessLayer2,publictransitLayer2,housingtypeLayer2,disabilityLayer2,otherLayer2]);
    //tempLayer is the points
    tempLayer.addTo(map)

    swoopyLayer.addTo(map)
}

function addEverythingToMap(data){
    
    addMarker(data.lat,data.lng, data["location"], data["leavefeel"],tempLayer)
    allData.push(data)
    // look up online
    let latLng = [data.lat,data.lng] 
    let thisDataLineDirection = calculateLTTOffsets(latLng)
    // will return as northwest, southwest, northeast, southeast
    addSwoopy(data,thisDataLineDirection)
}

function calculateLTTOffsets(latLng){
// array of latlngs latlng = [34,-118]

    let differenceBetweenLat = LTT.lat - latLng[0]
    let differenceBetweenLng = LTT.lng - latLng[1]

    // is difference between lat and lng negative or positive?
    if (differenceBetweenLat > 0 && differenceBetweenLng > 0){
        // both negative
        return "SouthWest"
    }
    if (differenceBetweenLat > 0 && differenceBetweenLng < 0){
        //neg, pos
        return "NorthWest"
    }
    if (differenceBetweenLat < 0 && differenceBetweenLng < 0){
        //neg, neg
        return "NorthEast"
    }
    if (differenceBetweenLat < 0 && differenceBetweenLng > 0){
        //pos, neg
        return "SouthEast"
    }
}

let swoopyLayer = L.layerGroup()

// for the zoom to clear the swoopies so that you can re-add the new swoopies

function refreshSwoopies(){
    console.log('refresh swoopies')
    swoopyLayer.clearLayers()
    tempData.forEach(data => {
        console.log('tempdatas data:')
        console.log(data)
        let latLng = [data.lat,data.lng] 
        let thisDataLineDirection = calculateLTTOffsets(latLng)
        addSwoopy(data,thisDataLineDirection)
    })
    swoopyLayer.addTo(map)
}

// step1 - load the data to draw the lines from
// todo: this function to draw the lines based on the lat/lng for each marker
function addSwoopy(startingData,directionOffset){

    let offSet = [0,0]

    switch(directionOffset){
        case "SouthWest":
            offSet = [-.025, -.025]
            break;
        case "NorthWest":
            offSet = [-.025, .025]
            break;
        case "NorthEast":
            offSet = [.025, .025]
            break;
        case "SouthEast":
            offSet = [.025, -.025]
            break;
    }

    // change the offset based on the direction
    let shiftedLTTlat = LTT.lat + offSet[0]
    let shiftedLTTlng = LTT.lng + offSet[1]
    
    // addTo Layer so you can remove it later
    swoopyLayer.addLayer(L.swoopyArrow([startingData.lat,startingData.lng], [shiftedLTTlat,shiftedLTTlng], {
            weight: 1,
            iconAnchor: [20, 10],
            iconSize: [20, 16]
          }))
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

/////////////////// zooooom stuff ///////////////////////
function changeSwoopyBasedonZoom(){
    refreshSwoopies()
} 

map.on('zoomend',function(e){
      changeSwoopyBasedonZoom()
  });
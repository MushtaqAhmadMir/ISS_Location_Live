//import {toLatLngBounds} from './LatLngBounds';
//Making a map and tiles
var mymap = L.map('mapid').setView([0, 0], 1);

const attribution = `&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors`;
tileUrl = `https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png`;
const tiles= L.tileLayer(tileUrl,{attribution});
tiles.addTo(mymap);

//making a marker with a custom icon
const issIcon = L.icon({
    iconUrl: 'Iss.png',
    iconSize: [50, 30],
    iconAnchor: [25, 16], 
});

let marker = L.marker([0, 0],{icon:issIcon }).addTo(mymap);
let api_url =`https://api.wheretheiss.at/v1/satellites/25544`;

let firstTime = true;
async function getIss()
{
    const response = await fetch(api_url);
    const data = await response.json();
    const {latitude, longitude,velocity,timestamp,altitude,visibility} = data;
    marker.setLatLng([latitude, longitude]);
     if(firstTime)
    {
    mymap.setView([latitude,longitude],2);
     firstTime = false;
     }
     var time = new Date(timestamp);
     //console.log(d);
    document.getElementById('lat').textContent = latitude;
    document.getElementById('lon').textContent = longitude;
     document.getElementById('timestamp').textContent = time;
    document.getElementById('velocity').textContent = velocity;
    document.getElementById('altitude').textContent = altitude;
    document.getElementById('visibility').textContent = visibility;

}
getIss();
setInterval(getIss, 1000); 


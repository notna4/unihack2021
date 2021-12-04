mapboxgl.accessToken = 'pk.eyJ1IjoicnViaWM0IiwiYSI6ImNrY3Vla3R1ZjF0YnYyeXQ2c243eWVpeHEifQ.Hgj0BjhuuOAowR_pE97V_Q';

const satStyle = 'mapbox://styles/rubic4/ckwql40zd202w15o358fdep6y';
const darkStyle = 'mapbox://styles/rubic4/ckrkr81ox0l1x17o1i8jsfmnu';
const lightStyle = 'mapbox://styles/rubic4/ckrkrcp3q9jrp17nyfgo2gzto';

var map = new mapboxgl.Map({
    container: 'map',
    style: satStyle,
    //center: [-122.486052, 37.830348],
    //center: [-75.789, 41.874],
    center: [21.226788, 45.75],
    minZoom: 11,
    maxZoom: 15,
    zoom: 12,
});

map.on('style.load', function() {
    map.on('click', function(e) {
    let coordinates = e.lngLat;
    console.log(coordinates);
    let theLat = coordinates.lat;
    let theLon = coordinates.lng;
    let linkToNames = "https://nominatim.openstreetmap.org/reverse.php?lat=" + theLat + "&" + "lon=" + theLon + "&format=jsonv2";
    console.log("AICI " + linkToNames);
    //LAAT = theLat;
    //LOON = theLon;

    let linkNearbyTheatres = "https://overpass-api.de/api/interpreter?&data=[out:json];(node[%22amenity%22](around:1000," + theLat + "," + theLon + "););out%2050;";
    console.log("AICI 2 " + linkNearbyTheatres);
    $.getJSON(linkNearbyTheatres, function(data) {
        // JSON result in `data` variable
        console.log(data);
        /*   new mapboxgl.Popup()
        .setLngLat(coordinates)
        .setHTML(data.display_name)
        .addTo(map);  */
        //displayMarkers(data);
    });

    

    });
});



const Places = {
    'places': [
        {
            'name': 'Gara de Nord',
            'coord': [45.75079435, 21.206330433175708],
            'photos': [
                './Places/GaraDeNord/gara1.png',
                './Places/GaraDeNord/gara2.jpg',
                './Places/GaraDeNord/gara3.jpg',
                './Places/GaraDeNord/gara4.jpg'
            ]
        },
        {
            'name': 'Monumentul Fidelității',
            'coord': [45.7558024, 21.22722421173622],
        },
    ]
}
console.log(Places);
function displayPlaces() {
    let len = Places.places.length;

    for(let i = 0; i < len; i++) {
        const el = document.createElement('div');
        el.className = 'marker';
        el.textContent = Places.places[i].name;

        //mapboxgl.Marker(el).setLngLat()
        // make a marker for each feature and add to the map
        new mapboxgl.Marker(el).setLngLat([Places.places[i].coord[1], Places.places[i].coord[0]]).addTo(map);
    }
}

function displayMarkers(data) {
    console.log(data.elements);
    let len = data.elements.length;

    for (let feature = 0; feature < len; feature++) {
        // create a HTML element for each feature
        const el = document.createElement('div');
        el.className = 'marker';
        el.textContent = data.elements[feature].tags.amenity;

        //mapboxgl.Marker(el).setLngLat()
        // make a marker for each feature and add to the map
        new mapboxgl.Marker(el).setLngLat([data.elements[feature].lon, data.elements[feature].lat]).addTo(map);
    }
}

OpacityControl();

document.getElementById("slider").oninput = function() {
    OpacityControl()
};

function OpacityControl() {
    let value = document.getElementById("slider").value;
    //console.log(value - '0');
    map.on('load', () => {
        map.addSource('radar', {
            'type': 'image',
            'url': './map_xix.png',
            'coordinates': [
                [21.17130757542776, 45.778422851406276],
                [21.33160743990564, 45.778422851406276],
                [21.333009123221416, 45.72006181346862],
                [21.17105899121748, 45.72087324476604],
            ]
        });
        map.addLayer({
            id: 'radar-layer',
            'type': 'raster',
            'source': 'radar'/*
            'paint' : {
                'raster-opacity': document.getElementById("slider").value - '0'
            } */
        });

        const slider = document.getElementById('slider');

        slider.addEventListener('input', (e) => {
            // Adjust the layers opacity. layer here is arbitrary - this could
            // be another layer name found in your style or a custom layer
            // added on the fly using `addSource`.
            map.setPaintProperty(
                'radar-layer',
                'raster-opacity',
                e.target.value - '0'
            );

        });
    });
}

document.getElementById("showPlaces").onclick = function() {

    var div = document.getElementById('showPlaces');
    
    if(div.textContent == "Show Places") {
        div.textContent = "Don't Show Places";
        displayPlaces();
    }
    else {
        div.textContent = "Show Places";
        stopDisplayPlaces();
    }
    /*
    var div = document.createElement('div');
    div.id = 'places';
    document.body.appendChild(div);

    let len = Places.places.length;


    for(let i = 0; i < len; i++) {
        let lenn = Places.places[i].photos.length;
        console.log(lenn);

        for(let j = 0 ; j < lenn; j++) {
            var place = document.createElement('div');
            place.id = 'thePlace';

            place.style.backgroundImage = "url('" + Places.places[i].photos[j] + "')";
            

            div.appendChild(place);
        }
    }   
    */
}

function stopDisplayPlaces() {
   var places = document.getElementsByClassName('marker mapboxgl-marker mapboxgl-marker-anchor-center');
   //console.log(places.length);
    let len = places.length;

   while(len) {
       places[0].remove();
   }
}
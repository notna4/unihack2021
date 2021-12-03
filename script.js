mapboxgl.accessToken = 'pk.eyJ1IjoicnViaWM0IiwiYSI6ImNrY3Vla3R1ZjF0YnYyeXQ2c243eWVpeHEifQ.Hgj0BjhuuOAowR_pE97V_Q';
var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/rubic4/ckwql40zd202w15o358fdep6y',
    //center: [-122.486052, 37.830348],
    //center: [-75.789, 41.874],
    center: [21.226788, 45.75],
    maxZoom: 17,
    zoom: 12,
});

map.on('style.load', function() {
    map.on('click', function(e) {
    let coordinates = e.lngLat;
    console.log(coordinates);
    let theLat = coordinates.lat;
    let theLon = coordinates.lng;
    //let linkToNames = "https://nominatim.openstreetmap.org/reverse.php?lat=" + theLat + "&" + "lon=" + theLon + "&format=jsonv2";
    // console.log(linkToNames);
    //LAAT = theLat;
    //LOON = theLon;

    let linkNearbyTheatres = "https://overpass-api.de/api/interpreter?&data=[out:json];(node[%22amenity%22=%22theatre%22](around:1000," + theLat + "," + theLon + "););out%2050;%3E;";

    $.getJSON(linkNearbyTheatres, function(data) {
        // JSON result in `data` variable
        console.log(data);
        /*   new mapboxgl.Popup()
        .setLngLat(coordinates)
        .setHTML(data.display_name)
        .addTo(map);  */
        displayMarkers(data);
    });

    

    });
});

function displayMarkers(data) {
    console.log(data.elements);
    let len = data.elements.length;

    // get the HTML element for displaying the data found
    const dis = document.getElementById('left');
    // display how many places have been found
    if(len > 1) {
        dis.textContent = len + " places have been found.";
    }
    else if(len == 1) {
        dis.textContent = len + " place has been found.";
    }
    else {
        dis.textContent = "No places have been found.";
    }

    for (let feature = 0; feature < len; feature++) {
        // create a HTML element for each feature
        const el = document.createElement('div');
        el.className = 'marker';

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
    console.log(value - '0');
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


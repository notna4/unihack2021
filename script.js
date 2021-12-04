mapboxgl.accessToken = 'pk.eyJ1IjoicnViaWM0IiwiYSI6ImNrY3Vla3R1ZjF0YnYyeXQ2c243eWVpeHEifQ.Hgj0BjhuuOAowR_pE97V_Q';

const satStyle = 'mapbox://styles/rubic4/ckwql40zd202w15o358fdep6y';

var map = new mapboxgl.Map({
    container: 'map',
    style: satStyle,
    center: [21.226788, 45.75],
    minZoom: 11,
    maxZoom: 17,
    zoom: 12,
});

map.on('style.load', function() {
    map.on('click', function(e) {
    let coordinates = e.lngLat;
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
            'name': 'Coloana Fidelității',
            'coord': [45.7558024, 21.22722421173622],
            'photos': [
                './Places/ColoanaFidelitatii/col1.jpg',
                './Places/ColoanaFidelitatii/col2.jpg',
                './Places/ColoanaFidelitatii/col3.jpg',
                './Places/ColoanaFidelitatii/col4.jpg',
            ]
        },
        {
            'name': 'Complexul Notre Dame',
            'coord': [45.74373644548811, 21.212472807018088],
            'photos': [
                './Places/NotreDame/notre1.jpg',
                './Places/NotreDame/notre2.jpg',
                './Places/NotreDame/notre3.jpg',
                './Places/NotreDame/notre4.jpg',
                './Places/NotreDame/notre5.jpg',
                './Places/NotreDame/notre6.jpg',
                './Places/NotreDame/notre7.jpg',
            ]
        },
        {
            'name': 'Piața Traian',
            'coord': [45.75774148220813, 21.249637551961456],
            'photos': [
                './Places/PiataTraian/traian1.jpg',
                './Places/PiataTraian/traian2.jpg',
                './Places/PiataTraian/traian3.jpg',
                './Places/PiataTraian/traian4.jpg',
                './Places/PiataTraian/traian5.jpg',
            ]
        },
        {
            'name': 'Sinagoga din Fabric',
            'coord': [45.75639342279996, 21.24519748603157],
            'photos': [
                './Places/SinagogaFabric/sinagoga1.jpg',
                './Places/SinagogaFabric/sinagoga2.jpg',
                './Places/SinagogaFabric/sinagoga3.jpg',
                './Places/SinagogaFabric/sinagoga4.jpg',
                './Places/SinagogaFabric/sinagoga5.jpg',
            ]
        },
        {
            'name': 'Biserica Romano-Catolică Millenium',
            'coord': [45.75673016680713, 21.247728719814546],
            'photos': [
                './Places/BisericaMillenium/millenium1.jpg',
                './Places/BisericaMillenium/millenium2.jpg',
                './Places/BisericaMillenium/millenium3.jpg',
                './Places/BisericaMillenium/millenium4.jpg',
                './Places/BisericaMillenium/millenium5.jpg',
                './Places/BisericaMillenium/millenium6.jpg',
            ]
        },
        {
            'name': 'Parcul Regina Maria',
            'coord': [45.755787827094196, 21.24214869969819],
            'photos': [
                './Places/ParculReginaMaria/regina1.jpg',
                './Places/ParculReginaMaria/regina2.jpg',
                './Places/ParculReginaMaria/regina3.jpg',
                './Places/ParculReginaMaria/regina4.jpg',
                './Places/ParculReginaMaria/regina5.jpg',
                './Places/ParculReginaMaria/regina6.jpg',
            ]
        },
        {
            'name': 'Piața Iosefin',
            'coord': [45.7439125944619, 21.20773864006196],
            'photos': [
                './Places/PiataIosefin/iosefin1.jpg',
                './Places/PiataIosefin/iosefin2.jpg',
                './Places/PiataIosefin/iosefin3.jpg',
                './Places/PiataIosefin/iosefin4.jpg',
                './Places/PiataIosefin/iosefin5.jpg',
            ]
        },
        {
            'name': 'Biserica Reformată din Elisabetin',
            'coord': [45.74831390151391, 21.21878101327573],
            'photos': [
                './Places/BisericaReformataElisabetin/elisabetin1.jpg',
                './Places/BisericaReformataElisabetin/elisabetin2.jpg',
                './Places/BisericaReformataElisabetin/elisabetin3.jpg',
            ]
        },
        {
            'name': 'Piața Mocioni',
            'coord': [45.74585200917858, 21.215565061750453],
            'photos': [
                './Places/PiataMocioni/mocioni1.jpg',
            ]
        },
        {
            'name': 'Moara Elisabeta din Iosefin',
            'coord': [45.74842043176773, 21.211845406191713],
            'photos': [
                './Places/Moara/moara1.jpg',
                './Places/Moara/moara2.jpg',
                './Places/Moara/moara3.jpg',
            ]
        },
        {
            'name': 'Mehala/Franzstadt',
            'coord': [45.76496815671456, 21.20589983539],
            'photos': [
                './Places/Mehala/mehala1.jpg',
                './Places/Mehala/mehala2.jpg',
                './Places/Mehala/mehala3.jpg',
                './Places/Mehala/mehala4.jpg',
                './Places/Mehala/mehala5.jpg',
                './Places/Mehala/mehala6.jpg',
            ]
        },
    ]
}

function displayPlaces() {
    let len = Places.places.length;

    for(let i = 0; i < len; i++) {
        const el = document.createElement('div');
        el.className = 'marker';
        el.id = 'mark' + i;
        el.textContent = Places.places[i].name;

        el.onclick = function(){images(i)}

        // make a marker for each feature and add to the map
        new mapboxgl.Marker(el).setLngLat([Places.places[i].coord[1], Places.places[i].coord[0]]).addTo(map);
    }
}

function images(pos) {
    var div = document.createElement('div');
    div.id = 'places';
    document.body.appendChild(div);

    //make close button
    let close = document.createElement('div');
    close.onclick = function() {
        div.remove();
    }
    close.id = 'close';
    close.textContent = 'Close';

    div.appendChild(close);

    let len = Places.places[pos].photos.length;

    for(let j = 0 ; j < len; j++) {
        var place = document.createElement('div');
        place.id = 'thePlace';

        place.style.backgroundImage = "url('" + Places.places[pos].photos[j] + "')";
        

        div.appendChild(place);
    }
}

function displayMarkers(data) {
    let len = data.elements.length;

    for (let feature = 0; feature < len; feature++) {
        // create a HTML element for each feature
        const el = document.createElement('div');
        el.className = 'marker';
        el.textContent = data.elements[feature].tags.amenity;

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
            'source': 'radar'
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
    map.on('load', () => {
        map.addSource('radar2', {
            'type': 'image',
            'url': './map2_xix.png',
            'coordinates': [
                [21.157799781632434, 45.83651653358308],
                [21.31777856448676, 45.836755036163055],
                [21.31982032554842, 45.77849420334243],
                [21.157754969165296, 45.77850249460869],
            ]
        });
        map.addLayer({
            id: 'radar-layer2',
            'type': 'raster',
            'source': 'radar2'
        });

        

        const slider = document.getElementById('slider');

        slider.addEventListener('input', (e) => {
            // Adjust the layers opacity. layer here is arbitrary - this could
            // be another layer name found in your style or a custom layer
            // added on the fly using `addSource`.
            map.setPaintProperty(
                'radar-layer2',
                'raster-opacity',
                e.target.value - '0'
            );

        });
    });
}

document.getElementById("showPlaces").onclick = function() {

    var div = document.getElementById('showPlaces');
    
    if(div.textContent == "Explore") {
        div.textContent = "Back";
        displayPlaces();
    }
    else {
        div.textContent = "Explore";
        stopDisplayPlaces();
    }
}

function stopDisplayPlaces() {
   var places = document.getElementsByClassName('marker mapboxgl-marker mapboxgl-marker-anchor-center');
    let len = places.length;

   while(len) {
       places[0].remove();
   }
}




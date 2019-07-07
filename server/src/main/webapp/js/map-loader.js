function createMap() {
    const map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: 40.430905, lng: -100.814640 },
        zoom: 3
    });

    fetch('/map').then((response) => {
        return response.json();
    }).then((sightings) => {
        const ufoIconURL = 'images/icons/ufo.png'
        sightings.forEach((item) => {
            const description = item.description;
            const position = { lat: item.lat, lng: item.lng };
            addLandmark(map, position, ufoIconURL, description);
        })
    }).catch((reason) => {
        alert(reason)
    })
}

function addLandmark(map, position, icon, description) {
    const marker = new google.maps.Marker({
        position, map, icon
    })
    const infoWindow = new google.maps.InfoWindow({
        content: description
    })
    marker.addListener('click', () => {
        infoWindow.open(map, marker)
    })
}
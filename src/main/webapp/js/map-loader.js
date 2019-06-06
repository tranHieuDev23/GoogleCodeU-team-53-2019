function createMap() {
    const map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: 37.422, lng: -122.084 },
        zoom: 16
    });

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
            var pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            }
            addLandmark(map, pos, "Your location", "This is where you are now.")
            map.setCenter(pos)
        }, (error) => {
            handleError(true, map)
        })
    } else {
        handleError(false, map)
    }
}

function addLandmark(map, position, title, description) {
    const marker = new google.maps.Marker({
        position, map, title
    })
    const infoWindow = new google.maps.InfoWindow({
        content: description
    })
    marker.addListener('click', () => {
        infoWindow.open(map, marker)
    })
}

function handleError(hasGeolocation, map) {
    const infoWindow = new google.maps.InfoWindow({
        content: (hasGeolocation
            ? 'Error: The Geolocation service failed!'
            : 'Error: Your browser does not support Geolocation!')
    })
    infoWindow.setPosition(map.getCenter())
    infoWindow.open(map)
}
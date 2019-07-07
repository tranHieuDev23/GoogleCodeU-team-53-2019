const messageIconURL = 'images/icons/chat.png';
const editIconURL = 'images/icons/chat-typing.png';
let map, editMarker;

function getCurrentPosition(callback) {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
            var pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };
            callback(pos);
        });
    }
}

function loadMessages() {
    fetch('/geomessages').then((response) => {
        return response.json();
    }).then((messages) => {
        messages.forEach(message => {
            createGeoMessageMarker(message, messageIconURL);
        });
    }).catch((error) => {
        console.error(error);
    });
}

function createGeoMessageMarker(message, icon) {
    const position = {
        lat: +message.latitude,
        lng: +message.longitude
    }
    const marker = new google.maps.Marker({
        position, map, icon
    })
    const infoWindow = new google.maps.InfoWindow({
        content: message.text + '<p><i>From ' + message.user + '</i></p>'
    })
    marker.addListener('click', () => {
        infoWindow.open(map, marker)
    })
}

function createEditMarker(position, icon) {
    if (editMarker)
        editMarker.setMap(null);
    editMarker = new google.maps.Marker({
        position, map, icon
    });
    return editMarker;
}

function postMessage(user, position, content) {
    const params = new URLSearchParams();
    params.append('user', user);
    params.append('latitude', position.lat);
    params.append('longitude', position.lng);
    params.append('text', content);

    fetch('/geomessages', {
        method: 'POST',
        body: params
    }).then(() => {
        message = {
            user: user,
            latitude: position.lat,
            longitude: position.lng,
            text: content
        };
        createGeoMessageMarker(message, messageIconURL);
        if (editMarker)
            editMarker.setMap(null);
    });
}

function enableMessageInputIfLoggedIn() {
    fetch('/login-status').then((response) => {
        return response.json();
    }).then((loginStatus) => {
        if (loginStatus.isLoggedIn) {
            map.addListener('click', (event) => {
                const position = {
                    lat: event.latLng.lat(),
                    lng: event.latLng.lng()
                }
                createEditMarker(position, editIconURL);
            })

            const messageForm = document.getElementById('message-form');
            const messageInput = document.getElementById('message-input');
            const messageSubmit = document.getElementById('message-submit');
            messageForm.classList.remove('hidden');
            ClassicEditor.create(messageInput)
                .then((editor) => {
                    messageSubmit.onclick = () => {
                        if (!editMarker)
                            return;
                        const text = editor.getData();
                        if (text == '')
                            return;
                        const position = {
                            lat: editMarker.position.lat(),
                            lng: editMarker.position.lng()
                        };
                        postMessage(loginStatus.username, position, text);
                        editMarker.setMap(null);
                        editMarker = null;
                    };
                });
        }
    });
}

function buildUI() {
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 3
    });
    loadMessages();
    getCurrentPosition((position) => {
        map.setCenter(position);
    });
    enableMessageInputIfLoggedIn();
}

function createEditMarkerAtCurrentLocation() {
    getCurrentPosition((position) => {
        createEditMarker(position, editIconURL);
        map.setCenter(position);
    });
}
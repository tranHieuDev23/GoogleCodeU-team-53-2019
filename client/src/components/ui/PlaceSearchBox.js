export const addSearchBox = (google, map, onPlaceSelected) => {
    const input = document.createElement('input');
    input.id = 'pac-input';
    input.classList.add('controls');
    input.setAttribute('type', 'text');
    input.setAttribute('placeholder', 'Search location');

    const searchBox = new google.maps.places.SearchBox(input);
    map.controls[google.maps.ControlPosition.TOP_CENTER].push(input);

    map.addListener('bounds_changed', () => {
      searchBox.setBounds(map.getBounds());
    });

    searchBox.addListener('places_changed', () => {
        const places = searchBox.getPlaces();
        for (let i = 0; i < places.length; i ++) {
            let place = places[i];
            if (!place.geometry) 
                continue;
            onPlaceSelected(place);
            break;
        }
    });
};
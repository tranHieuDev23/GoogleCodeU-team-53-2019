export const getCurrentLocation = () => {
    return new Promise((resolve, reject) => {
        if (!navigator.geolocation) {
            reject('Your browser does not support Geolocation!');
            return;
        }
        navigator.geolocation.getCurrentPosition(resolve, (error) => {
            reject('Geolocation failed due to: ' + error);
        });
    });
}

export const getPlaceId = (google, location) => {
    const geocoder = new google.maps.Geocoder();
    return new Promise((resolve, reject) => {
        geocoder.geocode({ 'location': location }, (results, status) => {
            if (status !== google.maps.GeocoderStatus.OK)
                reject('Geocoder failed due to: ' + status);
            else if (!results[1])
                reject('No results found');
            else
                resolve(results[1].place_id);
        });
    });
}

export const getPlaceName = (google, placeId) => {
    const placeService = new google.maps.places.PlacesService(document.createElement('div'));
    const request = {
        placeId: placeId,
        fields: ['formatted_address']
    };
    return new Promise((resolve, reject) => {
        placeService.getDetails(request, (place, status) => {
            if (status !== google.maps.places.PlacesServiceStatus.OK)
                reject('Place Service failed due to: ' + status);
            else
                resolve(place.formatted_address);
        });
    });
}
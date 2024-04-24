import React, { useState, useMemo } from 'react';
import { GoogleMap } from '@react-google-maps/api';
import useGoogleMapsLoader from './../services/googleService';

const ShowAddress = () => {
    const [address, setAddress] = useState(null);
    const libraries = useMemo(() => ['places'], []);
    const testCoordinates = { lat: 49.999029, lng: 36.248372 };
    const { isLoaded } = useGoogleMapsLoader(libraries);

    const geocodeLatLng = (geocoder, latlng) => {
        geocoder.geocode({ location: latlng }, (results, status) => {
            if (status === 'OK') {
                if (results[0]) {
                    setAddress(results[0].formatted_address);
                } else {
                    console.error('No results found');
                }
            } else {
                console.error('Geocoder failed due to: ' + status);
            }
        });
    };

    const onLoad = (map) => {
        const geocoder = new window.google.maps.Geocoder();
        const latlng = new window.google.maps.LatLng(
            testCoordinates.lat,
            testCoordinates.lng,
        );
        geocodeLatLng(geocoder, latlng);
    };

    return (
        <div>
            {isLoaded ? (
                <GoogleMap
                    id="example-map"
                    mapContainerStyle={{ width: '500px', height: '500px' }}
                    center={{
                        lat: testCoordinates.lat,
                        lng: testCoordinates.lng,
                    }}
                    zoom={15}
                    onLoad={onLoad}
                />
            ) : (
                <p>Loading map...</p>
            )}
            {address && <p>Address: {address}</p>}
        </div>
    );
};

export default ShowAddress;

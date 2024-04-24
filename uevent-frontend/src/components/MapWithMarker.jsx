import React, { useMemo } from 'react';
import { GoogleMap, Marker } from '@react-google-maps/api';

const MapWithMarker = () => {
    const position = { lat: 49.999029, lng: 36.248372 };
    const libraries = useMemo(() => ['places'], []);
    const { isLoaded } = useGoogleMapsLoader(libraries);

    const mapContainerStyle = {
        width: '100%',
        height: '100%',
    };

    const center = position ? position : { lat: 50, lng: 50 };

    if (!isLoaded) {
        return null;
    }

    return (
        <GoogleMap
            mapContainerStyle={mapContainerStyle}
            center={center}
            zoom={10}
        >
            {position && <Marker position={position} />}
        </GoogleMap>
    );
};

export default MapWithMarker;

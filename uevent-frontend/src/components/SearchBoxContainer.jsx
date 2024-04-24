import React, { useState, useMemo } from 'react';
import { StandaloneSearchBox, useJsApiLoader } from '@react-google-maps/api';

import '../styles/GoogleMap.css';

const SearchBoxContainer = ({ setLatitude, setLongitude }) => {
    const [searchBox, setSearchBox] = useState(null);
    const libraries = useMemo(() => ['places'], []);
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: `${process.env.REACT_APP_GOOGLE_API}`,
        libraries: libraries,
    });

    const handlePlacesChanged = () => {
        if (searchBox != null) {
            const places = searchBox.getPlaces();
            console.dir(places[0].formatted_address);
            if (places && places.length > 0) {
                const { lat, lng } = places[0].geometry.location;
                console.log(lat(), lng());
                setLatitude(lat());
                setLongitude(lng());
            }
        }
    };

    if (!isLoaded) {
        return null;
    }

    return (
        <StandaloneSearchBox
            onLoad={(ref) => setSearchBox(ref)}
            onPlacesChanged={handlePlacesChanged}
            onInputChange={(event) => {
                const value = event.target.value;
                setSearchBox((prevSearchBox) => {
                    prevSearchBox.input.value = value;
                    return prevSearchBox;
                });
            }}
        >
            <input
                type="text"
                placeholder="Search for a place..."
                className="form-control bg-dark text-white"
            />
        </StandaloneSearchBox>
    );
};

export default SearchBoxContainer;

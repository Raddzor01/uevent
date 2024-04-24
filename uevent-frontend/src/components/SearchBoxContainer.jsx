import React, { useState, useMemo } from 'react';
import { StandaloneSearchBox } from '@react-google-maps/api';
import useGoogleMapsLoader from './../services/googleService';
import '../styles/GoogleMap.css';

const SearchBoxContainer = ({ setLatitude, setLongitude }) => {
    const [searchBox, setSearchBox] = useState(null);
    const libraries = useMemo(() => ['places'], []);
    const { isLoaded } = useGoogleMapsLoader(libraries);

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

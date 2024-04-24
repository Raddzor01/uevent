import React, { useState } from 'react';
import {
    // GoogleMap,
    LoadScript,
    StandaloneSearchBox,
} from '@react-google-maps/api';

import styles from '../styles/CompanyMap.module.css';

const libraries = ['places'];

const MapContainer = ({ setLatitude, setLongitude }) => {
    const [searchBox, setSearchBox] = useState(null);
    const [searchValue, setSearchValue] = useState('');
    // const mapStyles = {
    //     height: '100vh',
    //     width: '100%',
    // };
    // const defaultCenter = {
    //     lat: 49.999029,
    //     lng: 36.248372,
    // };

    const handleSearchBoxChange = (event) => {
        setSearchValue(event.target.value);
    };

    const handlePlacesChanged = () => {
        const places = searchBox.getPlaces();
        if (places && places.length > 0) {
            const { lat, lng } = places[0].geometry.location;
            setLatitude(lat());
            setLongitude(lng());
        }
    };

    return (
        <LoadScript
            googleMapsApiKey={`${process.env.REACT_APP_GOOGLE_API}`}
            libraries={libraries}
        >
            <StandaloneSearchBox
                onLoad={(ref) => setSearchBox(ref)}
                onPlacesChanged={handlePlacesChanged}
            >
                <input
                    type="text"
                    placeholder="Search for a place..."
                    className={`${styles.input}`}
                    value={searchValue}
                    onChange={handleSearchBoxChange}
                />
            </StandaloneSearchBox>
            {/* <GoogleMap
                mapContainerStyle={mapStyles}
                zoom={13}
                center={defaultCenter}
            /> */}
        </LoadScript>
    );
};

export default MapContainer;

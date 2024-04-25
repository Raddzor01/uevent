import React, { useState, useEffect, useMemo } from 'react';
import { useGoogleMapsLoader } from './../services/googleService';

import styles from '../styles/EventPage.module.css';

const AddressDisplay = ({ lat, lng }) => {
    const [address, setAddress] = useState(null);
    const libraries = useMemo(() => ['places'], []);
    const { isLoaded } = useGoogleMapsLoader(libraries);

    useEffect(() => {
        if (isLoaded) {
            const geocoder = new window.google.maps.Geocoder();
            const latlng = new window.google.maps.LatLng(lat, lng);

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
        }
    }, [isLoaded, lat, lng]);

    return (
        <div>
            {isLoaded ? (
                <span className={styles.infoText}>
                    {address || 'Loading address...'}
                </span>
            ) : (
                <div>Loading map...</div>
            )}
        </div>
    );
};

export default AddressDisplay;

import { useJsApiLoader } from '@react-google-maps/api';

export const useGoogleMapsLoader = (libraries) => {
    return useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: `${process.env.REACT_APP_GOOGLE_API}`,
        libraries: libraries,
    });
};

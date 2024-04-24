import { useJsApiLoader } from '@react-google-maps/api';

const useGoogleMapsLoader = (libraries) => {
    return useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: `${process.env.REACT_APP_GOOGLE_API}`,
        libraries: libraries,
    });
};

export default useGoogleMapsLoader;

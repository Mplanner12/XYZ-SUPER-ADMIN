import { useEffect, useState } from 'react';

interface GeolocationState {
	latitude: number | null;
	longitude: number | null;
  address?: string | null;
	error: string | null;
}

const getAddressFromCoordinates = async (latitude: number, longitude: number): Promise<string> => {
  await new Promise(resolve => setTimeout(resolve, 1000));
  return `Address for ${latitude}, ${longitude}`;
};

const useGeolocation = () => {
  
	const [coordinates, setCoordinates] = useState<GeolocationState>({
		latitude: null,
		longitude: null,
    address: null,
		error: null,
	});

	useEffect(() => {
		if (!navigator.geolocation) {
			setCoordinates((prevState) => ({
				...prevState,
				error: 'Geolocation is not supported by your browser',
			}));
			return;
		}

		navigator.geolocation.getCurrentPosition(
			async (position) => {
        const {latitude, longitude} = position.coords;
        try {
          const address = await getAddressFromCoordinates(latitude, longitude);
          setCoordinates({
            latitude,
            longitude,
            address,
            error: null,
          });
        } catch   (error) {
          setCoordinates({
            latitude,
            longitude,
            address: null,
            error: 'Failed to get address',
          });
        }
				// setCoordinates({
				// 	latitude: position.coords.latitude,
				// 	longitude: position.coords.longitude,
				// 	error: null,
				// });
			},
			(error) => {
				setCoordinates((prevState) => ({ ...prevState, error: error.message }));
			}
		);
	}, []);

	return coordinates;
};

export default useGeolocation;

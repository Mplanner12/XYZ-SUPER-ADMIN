import { useEffect, useState } from 'react';

export function useAgreement() {
	const [hasAgreed, setHasAgreed] = useState(false);

	useEffect(() => {
		// Check if running in browser environment
		if (typeof window !== 'undefined') {
			const storedAgreement = localStorage.getItem('hasAgreed');
			setHasAgreed(storedAgreement === 'true');
		}
	}, []);

	const setAgreement = (value : any) => {
		setHasAgreed(value);
		localStorage.setItem('hasAgreed', value.toString());
	};

	return [hasAgreed, setAgreement];
}

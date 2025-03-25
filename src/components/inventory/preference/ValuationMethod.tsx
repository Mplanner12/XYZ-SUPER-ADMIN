import { ChevronLeft } from 'lucide-react';
import React from 'react';


interface ValuationProps {
	handleTabChange: (tab: string) => void;
}

const ValuationMethod: React.FC<ValuationProps> = ({ handleTabChange }) => {
	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const formData = new FormData(event.target as HTMLFormElement);
		console.log(formData);
	};

	return (
		<div className="flex flex-col gap-4 sm:mt-8 mt-5 text-sm">
			<form onSubmit={handleSubmit}>
				<h2
					className="text-xl text-foundation-black-black-400 font-normal flex items-center gap-2 cursor-pointer hover:text-foundation-purple-purple-400"
					onClick={() => handleTabChange('account-settings')}
				>
					<ChevronLeft color="#8133F1" size={20} /> Valuation Method
				</h2>

				<main></main>
				<div className="flex flex-col gap-2 mt-4">
					<div className="flex gap-2">
						<input type="radio" id="fifo" name="valuation" value="fifo" />
						<label htmlFor="fifo">FIFO (First-In, First-Out)</label>
					</div>
					<div className="flex gap-2">
						<input type="radio" id="lifo" name="valuation" value="lifo" />
						<label htmlFor="lifo">LIFO (Last-In, First-Out)</label>
					</div>
					<div className="flex gap-2">
						<input type="radio" id="wag" name="valuation" value="wag" />
						<label htmlFor="wag">WAG (Weighted Average)</label>
					</div>
				</div>
			</form>
		</div>
	);
};

export default ValuationMethod;

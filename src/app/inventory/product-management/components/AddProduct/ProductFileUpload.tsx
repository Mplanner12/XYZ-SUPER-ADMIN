import { CloudArrowUpIcon } from '@heroicons/react/24/outline';
import React, { ChangeEvent, useState } from 'react';

interface ProductFileUploadProps {
	register: any;
	id: string;
}

const ProductFileUpload: React.FC<ProductFileUploadProps> = ({ register, id }) => {
	const [selectedFile, setSelectedFile] = useState<File | null>(null);

	const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files && event.target.files[0];
		setSelectedFile(file || null);
	};

	return (
		<div className="w-full">
			<label
				htmlFor={id}
				className="flex align-middle items-center justify-center w-[70px] h-[70px] font-inter text-sm font-medium leading-6 text-foundation-grey-grey-800 gap-[1px]  py-2 px-3  shadow-sm outline-none border-none bg-foundation-grey-grey-200 placeholder:text-foundation-grey-grey-600 focus:border-foundation-purple-purple-100 focus:bg-foundation-grey-grey-50 sm:text-sm sm:leading-6"
			>
				<CloudArrowUpIcon className="h-6 w-6" />
				<input
					id={id}
					type="file"
					className="hidden"
					onChange={handleFileChange}
					accept="image/*"
					{...register('file')}
				/>
			</label>
			{selectedFile && (
				<div className="mt-2 text-sm text-gray-600">
					Selected file: {selectedFile.name}
				</div>
			)}
		</div>
	);
};

export default ProductFileUpload;

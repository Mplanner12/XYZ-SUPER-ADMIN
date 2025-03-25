import { CloudArrowUpIcon } from '@heroicons/react/24/outline';
import { CheckCircleIcon } from 'lucide-react';
import React, { ChangeEvent, useState } from 'react';
import { Upload, CheckCircle } from 'lucide-react';


interface InputFileUploadProps {
	register?: any;
	id: string;
	onFileChange?: (file: File | null) => void
  label?: string;
	acceptTypes?: string;
	error?: string;
}

const InputFileUpload: React.FC<InputFileUploadProps> = ({ register, id, label="Upload", acceptTypes = '*', onFileChange, error  }) => {
	const [selectedFile, setSelectedFile] = useState<File | null>(null);

	const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    setSelectedFile(file);
    
    if (onFileChange) {
      onFileChange(file);
    }
  };


	return (
		<div className="w-full">
			{label && (
				<span className="w-fit h-fit flex font-inter text-sm font-medium leading-6 text-foundation-grey-grey-800 gap-[1px]">
					{label || "Upload Contract Document"}
				</span>
			)}
			<label
				htmlFor={id}
				className={`flex align-middle mt-0.5 items-center justify-center w-full h-fit font-inter text-sm font-medium leading-6 text-foundation-grey-grey-800 gap-[1px] rounded-md border border-solid py-2.5 px-3  shadow-sm outline-none border-foundation-grey-grey-600 placeholder:text-foundation-grey-grey-600 focus:border-2 focus:border-solid focus:border-foundation-purple-purple-100 focus:bg-foundation-grey-grey-50 sm:text-sm sm:leading-6 ${error ? 'border-red-500' : 'focus-within:ring-2 focus-within:ring-purple-500'}`}
			>
				<CloudArrowUpIcon className="h-5 w-5 mr-2" />
				<span>{selectedFile ? "Change File" : "Upload File"}</span>
				<input
					id={id}
					type="file"
					accept={acceptTypes}
					className=" sr-only"
					name="filename"
					onChange={handleFileChange}
					// {...register(id)}
				/>
			</label>
			{selectedFile && (
				<div className="mt-2 text-[12px] text-gray-600 flex md:w-[210px] w-full">
					<CheckCircleIcon className='h-5 w-5 text-green-500 mr-2'/>
					<span className='truncate'>Selected file: {selectedFile.name}</span>
				</div>
			)}

      {error && (
        <p className="text-sm text-red-500">{error}</p>
      )}
		</div>
	);
};

export default InputFileUpload;

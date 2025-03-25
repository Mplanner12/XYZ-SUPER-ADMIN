import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import ActionButton from '@/components/Buttons/ActionButton';
import CustomInput from '@/components/Frominput/CustomInput';
import { useModal } from '@/util/Modals/ModalsContext';
import { useFormik } from 'formik';
import { X } from 'lucide-react';
import Image from 'next/image';

const ImportOrderExelSheet: React.FC = () => {
  const { closeModal } = useModal();
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [fileData, setFileData] = useState<any[]>([]);  // Store scanned file data
  const [mappedFields, setMappedFields] = useState<any>({});  // Store mapped fields

  const formik = useFormik({
    initialValues: {
      id: "",
      product: "",
      description: "",
      productCategory: "",
      uom: "",
      stockQuantity: "",
      unitPrice: "",
      totalPrice: ""
    },
    onSubmit() {
      if (uploadedFile) {
        // Proceed with further processing (sending to server, etc.)
        console.log("Final Mapped Fields: ", mappedFields);
      } else {
        alert('Please upload a file');
      }
    },
  });

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setUploadedFile(file);
      readFile(file);  // Trigger automatic scanning
    }
  };

  // Read and scan the uploaded file
  const readFile = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e: any) => {
      const data = e.target.result;
      const workbook = XLSX.read(data, { type: 'binary' });
      const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
      const jsonData = XLSX.utils.sheet_to_json(firstSheet, { header: 1 });
      console.log('Scanned Data: ', jsonData);
      setFileData(jsonData);  // Save scanned data
      autoMapFields(jsonData);  // Automatically map fields
    };
    reader.readAsBinaryString(file);
  };

  // Automatically map the scanned data to the form fields
  const autoMapFields = (data: any[]) => {
    const headerRow = data[0];
    const valuesRow = data[1];

    const fieldMappings: any = {};

    const mapping = {
      id: 'ID',
      product: 'Product',
      description: 'Description',
      productCategory: 'Product Category',
      uom: 'UoM',
      stockQuantity: 'Stock Quantity',
      unitPrice: 'Unit Price(USD)',
      totalPrice: 'Total Price(USD)'
    };

    Object.entries(mapping).forEach(([key, value]) => {
      if (headerRow.includes(value)) {
        fieldMappings[key] = valuesRow[headerRow.indexOf(value)];
      }
    });

    setMappedFields(fieldMappings);
    formik.setValues(fieldMappings);
  };

  return (
    <div className="fixed top-0 left-0 z-50 w-full h-full bg-[#434343] bg-opacity-50 flex justify-center items-center">
      <div className="relative w-[80%] h-[80vh] overflow-auto scrollbar-none md:w-[550px]">
        <div className="bg-white p-6 rounded-xl shadow-md relative">
          <button
            onClick={closeModal}
            className="absolute bg-white h-10 top-3 right-3 text-gray-500 hover:text-gray-700 flex justify-center items-center w-10 rounded-full shadow-lg">
            <X className='text-primary-normal' />
          </button>

          <p className='text-xl text-center font-medium mb-3'>Import Order From Excel Sheet</p>
          <div className='flex justify-center gap-2 items-center'>
            <p className='font-semibold'>Upload Order Document </p>
            <p className='text-[#727171]'>(Excel Sheet in CSV & Xlsx)</p>
          </div>

          <div className='justify-center flex items-center my-2'>
          {/* File Upload Section */}
          <label className="flex w-[40%] gap-3 border rounded-md mb-3 border-[#ececec] text-[#727171] py-3 items-center justify-center cursor-pointer">
            {uploadedFile ? uploadedFile.name : 'Upload File'}
            <input
              type="file"
              accept=".xlsx, .csv"
              onChange={handleFileUpload}
              className="hidden"
            />
            <Image className="mr-1" src="/arrowhead.png" width={15} height={15} alt="icon" />
          </label>
          </div>


          <div className='flex items-center justify-center my-3'>
          {uploadedFile && (
            <span className='flex w-[40%] gap-3 rounded-md bg-[#FAFAFA] py-3 justify-center items-center'>
              {uploadedFile.name}
              <X className='text-primary-normal cursor-pointer' onClick={() => setUploadedFile(null)} />
            </span>
          )}
          </div>


        <div className="flex flex-col justify-center text-center">
          <p className='text-[18px] font-medium mb-1'>Data Mapping</p>
          <p className='mb-3'>Map your data to XYZ Fields</p>
        </div>

        {/* Mapping Fields */}
        <div className="flex justify-between text-center">
          <p className=' mb-1'>XYZ Field</p>
          <p className='mb-3'>Your Fields</p>
        </div>

        {Object.entries(formik.values).map(([key, value]) => (
          <div key={key} className="flex items-center justify-between mb-1 text-center">
            <p className=' mb-1'>{key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1').trim()}</p>
            <div className='w-[40%]'>
              <CustomInput
                placeholder={key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1').trim()}
                type='text'
                id={key}
                name={key}
                onChange={formik.handleChange}
                value={value}
              />
            </div>
          </div>
        ))}

        <div className='my-5 flex justify-center'>
          <ActionButton text="Import Order Information" customPadding='py-4 px-3 w-[50%]' onClick={formik.handleSubmit} />
        </div>
      </div>
    </div>
    </div>
  );
};

export default ImportOrderExelSheet;